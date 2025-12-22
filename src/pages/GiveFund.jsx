import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import axiosSecure from "../api/axiosSecure";
import { useState } from "react";

const GiveFund = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(10); // default $10
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // amount → cents
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: amount * 100,
      });

      const card = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
        });
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // 🔥 Save fund to DB
        await axiosSecure.post("/funds", {
          amount: amount,
          paymentIntentId: result.paymentIntent.id,
          donorName: "Test Donor", // চাইলে auth থেকে username নিতে পারো
        });

        Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          html: `<b>Amount:</b> $${amount}`,
          confirmButtonColor: "#16a34a",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Give Fund
      </h2>

      {/* Amount input */}
      <label className="block mb-2 font-medium">
        Amount ($)
      </label>
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full mb-4"
      />

      {/* Card input */}
      <div className="border p-3 rounded mb-4">
        <CardElement />
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default GiveFund;

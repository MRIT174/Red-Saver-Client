import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import axiosSecure from "../api/axiosSecure";
import { useState } from "react";

const GiveFund = () => {
  const stripe = useStripe();
  const elements = useElements();
<<<<<<< HEAD
  const [amount, setAmount] = useState(10);
=======
  const [amount, setAmount] = useState(10); // default $10
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
<<<<<<< HEAD
=======
      // amount → cents
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
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
<<<<<<< HEAD
        await axiosSecure.post("/funds", {
          amount: amount,
          paymentIntentId: result.paymentIntent.id,
          donorName: "Test Donor",
=======
        // 🔥 Save fund to DB
        await axiosSecure.post("/funds", {
          amount: amount,
          paymentIntentId: result.paymentIntent.id,
          donorName: "Test Donor", // চাইলে auth থেকে username নিতে পারো
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
        });

        Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          html: `<b>Amount:</b> $${amount}`,
<<<<<<< HEAD
          confirmButtonColor: "#dc2626",
=======
          confirmButtonColor: "#16a34a",
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
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
<<<<<<< HEAD
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-md shadow-xl p-8">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
          Give Fund
        </h2>

        {/* Amount */}
        <label className="block mb-2 text-slate-300 font-medium">
          Amount ($)
        </label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-5 rounded-xl bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />

        {/* Card */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800 p-4">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#ffffff",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#94a3b8",
                  },
                },
              },
            }}
          />
        </div>

        {/* Button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </section>
=======
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
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
  );
};

export default GiveFund;

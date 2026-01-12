import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Target } from "lucide-react";

const AboutUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const missionValues = [
    {
      icon: Heart,
      title: "Our Mission",
      description:
        "To connect donors and recipients, saving lives through the power of community and compassion.",
      gradient: "from-red-600 to-red-500",
    },
    {
      icon: Target,
      title: "Our Vision",
      description:
        "A world where no one dies from lack of blood, powered by technology and human kindness.",
      gradient: "from-blue-600 to-blue-500",
    },
    {
      icon: Users,
      title: "Our Values",
      description:
        "Trust, transparency, and community-driven action to create meaningful impact.",
      gradient: "from-emerald-600 to-emerald-500",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "Medical professional with 15 years of experience in blood donation systems",
      image: "/professional-woman-doctor.png",
    },
    {
      name: "Marcus Chen",
      role: "CTO & Co-Founder",
      bio: "Tech visionary dedicated to building life-saving solutions through innovation",
      image: "/professional-tech-leader.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      bio: "Logistics expert ensuring seamless donor-recipient connections every day",
      image: "/professional-woman-operations.png",
    },
  ];

  const impactStats = [
    { number: "50K+", label: "Lives Saved", icon: "❤️" },
    { number: "100K+", label: "Active Donors", icon: "👥" },
    { number: "15+", label: "Countries", icon: "🌍" },
    { number: "5 Years", label: "Operating", icon: "📅" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-widest text-red-400 uppercase mb-3">
              ✦ Our Story
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Driven by{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Purpose
              </span>
              , Powered by{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                People
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              RedSaver connects blood donors with those in urgent need, saving
              lives through technology and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 max-w-7xl">
          {missionValues.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl p-8"
              >
                <div
                  className={`w-fit p-4 rounded-xl bg-gradient-to-r ${item.gradient}`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mt-6 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6 max-w-7xl">
          {impactStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card/40 border border-border/30 rounded-2xl p-8 text-center"
            >
              <div className="text-4xl">{stat.icon}</div>
              <div className="text-4xl font-bold text-red-400 mt-3">
                {stat.number}
              </div>
              <p className="text-slate-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
    </div>
  );
};

export default AboutUs;

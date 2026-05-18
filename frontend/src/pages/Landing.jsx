import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  PieChart,
  ShieldCheck,
  ArrowRight,
  BarChart3,
  Layers,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-slate-900">
              FinTrack
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it Works</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary px-6">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary px-6 bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Elements (smaller on mobile) */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-indigo-600/5 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-purple-600/5 blur-[60px] lg:blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col items-center"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] sm:text-xs font-semibold mb-6 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                NEW: GENERATE PDF REPORTS
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-slate-900"
              >
                Take Control of Your <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 animate-gradient">
                  Financial Future
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base md:text-lg text-slate-600 mb-8 sm:mb-10 leading-relaxed max-w-xl sm:max-w-2xl"
              >
                The modern way to track expenses, manage budgets, and achieve your financial goals. All in one secure and intuitive platform.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full"
              >
                <Link
                  to="/register"
                  className="w-full sm:w-auto btn btn-primary px-6 sm:px-8 py-3 text-base shadow-lg shadow-indigo-100"
                >
                  Start Tracking Free
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/login"
                  className="w-full sm:w-auto btn btn-outline px-6 sm:px-8 py-3 text-base bg-white shadow-sm border-slate-200"
                >
                  See how it works
                </Link>
              </motion.div>

              {/* Users */}
              <motion.div
                variants={itemVariants}
                className="mt-12 sm:mt-14 flex flex-col items-center gap-3"
              >
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] sm:text-xs font-bold text-slate-600 ring-2 sm:ring-4 ring-slate-100"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white ring-2 sm:ring-4 ring-slate-100">
                    +2k
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-500">
                  <span className="text-slate-900 font-semibold">2,000+</span> users already tracking their growth
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-14 md:py-20 lg:py-24 bg-white border-y border-slate-200"
      >
        <div className="container mx-auto px-4 sm:px-6">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight">
              Everything you need to <br className="hidden sm:block" />
              master your money
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-500">
              FinTrack provides the tools you need to understand where your money goes
              and how to save more effectively.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Smart Analytics",
                description:
                  "Visualize your spending patterns with interactive charts and categories.",
              },
              {
                icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Auto-Categorization",
                description:
                  "Our intelligent system automatically organizes your transactions into clear categories.",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Secure & Private",
                description:
                  "Your financial data is encrypted and secure. We never sell your personal information.",
              },
              {
                icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Mobile First",
                description:
                  "Access your dashboard from anywhere. Our platform is fully responsive and lightning fast.",
              },
              {
                icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Goal Tracking",
                description:
                  "Set savings goals and track your progress with automated insights and reminders.",
              },
              {
                icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "PDF Reports",
                description:
                  "Generate professional financial summaries and PDF reports with just one click.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/5 transition-all group"
              >
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 mb-4 sm:mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-3">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-600/20">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                FinTrack
              </span>
            </div>

            <div className="text-slate-400 text-sm">
              © 2026 FinTrack Inc. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Help</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;

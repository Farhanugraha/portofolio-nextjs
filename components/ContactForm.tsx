"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setToast({ message: "Message sent successfully!", type: "success" });
        e.target.reset();
      } else {
        setToast({
          message: data.error || "Failed to send message.",
          type: "error",
        });
      }
    } catch (error) {
      setToast({ message: "Network error. Please try again.", type: "error" });
    }

    setLoading(false);
    setTimeout(() => {
      setToast({ message: "", type: null });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="mt-20"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.type && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`fixed top-5 right-5 px-4 py-3 rounded-xl shadow-lg 
      text-white text-sm font-semibold transition-all duration-300 z-50
      ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-3xl font-bold text-center mb-6">Contact Me</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 ring-blue-500 outline-none transition"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 ring-blue-500 outline-none transition"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 ring-blue-500 outline-none transition"
        />

        <button
          type="submit"
          disabled={loading}
          className={`relative w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex justify-center ${
            loading && "opacity-70 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </motion.div>

    //  className="border rounded-xl p-4 shadow-sm hover:border-blue-500 transition bg-gray-100
    //                 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
  );
}

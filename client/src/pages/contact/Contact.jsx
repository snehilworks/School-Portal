import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  User,
  MessageCircle,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Auto-reset success message
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-100 to-teal-500 pt-[12vh] pb-[8vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-teal-200 opacity-20 animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-teal-900 mb-4 tracking-tight">
            Connect with Us
          </h1>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto">
            We're here to answer your questions and support your journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-3 text-teal-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 pl-10 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-teal-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 pl-10 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="relative">
                <MessageCircle className="absolute left-3 top-3 text-teal-500" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full p-3 pl-10 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-600 mt-4"
                >
                  <CheckCircle2 />
                  Message sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold text-teal-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-teal-500 w-6 h-6" />
                  <a
                    href="mailto:contact@shivampublicschool.edu.in"
                    className="text-teal-700 hover:underline"
                  >
                    contact@shivampublicschool.edu.in
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="text-teal-500 w-6 h-6" />
                  <span className="text-teal-700">+91 (022) 2678-9012</span>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="text-teal-500 w-6 h-6" />
                  <address className="text-teal-700 not-italic">
                    123 Education Lane, Techno City, State 400001
                  </address>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-teal-50 p-4 rounded-xl">
              <p className="text-teal-800 text-sm">
                Our support team is available Monday-Friday, 9 AM to 5 PM IST
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

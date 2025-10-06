import { useState } from "react";
import emailjs from "@emailjs/browser";

import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    emailjs
      .send(
        "service_lt8104q",
        "template_cg86k6b",
        formData,
        "_5rl8uPKVg6HiD3wK"
      ).then((res) => {
      console.log("Email sent successfully!", res);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // clear form
    })
    .catch((err) => {
      console.log("Failed to send email:", err);
      alert("Failed to send message. Please try again.");
    })
    .finally(() => {
      setLoading(false); // reset loading in both success/fail
    });
      
  };

  return (
    <div className="max-w-[450px] bg-gradient-to-b from-[rgba(40,57,209,0.85)] via-[rgba(68,167,216,0.54)] to-[rgb(64,0,255)] backdrop-blur-md h-[100dvh] overflow-y-auto mx-auto pb-[120px] p-5">
      

      <motion.h1
        className="text-3xl font-bold text-center"
      initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Let's Connect to Developer
      </motion.h1>
      <motion.p
        className="text-center text-white py-5 text-xl"
      initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Reach out by filling out the form below, and I’ll respond promptly
      </motion.p>

     
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 shadow-md"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-4 border border-white/20 rounded-lg shadow-lg bg-white/10 backdrop-blur-md placeholder-gray-500 text-black focus:bg-white/20 focus:outline-none"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true }}
          
        />
        <motion.input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-4 border border-white/20 rounded-lg shadow-lg bg-white/10 backdrop-blur-md placeholder-gray-500 text-black focus:bg-white/20 focus:outline-none"
            initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          viewport={{ once: true }}
        />
        <motion.textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
          className="p-4 border border-white/20 rounded-lg shadow-lg bg-white/10 backdrop-blur-md placeholder-gray-500 text-black focus:bg-white/20 focus:outline-none resize-none"
           initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          viewport={{ once: true }}
        />
        <motion.button
          type="submit"
          disabled={loading}
          className="mx-auto border border-white/20 rounded-xl shadow-lg py-2 px-6 backdrop-blur-md bg-white/10 font-bold cursor-pointer transition duration-400 ease hover:scale-105 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
             initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;

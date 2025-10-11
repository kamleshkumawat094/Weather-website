import { useState } from "react";
import emailjs from "@emailjs/browser";

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
      )
      .then((res) => {
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
      <h1
        className="fade-once text-3xl font-bold text-center"
        style={{ animationDelay: "0s" }}
      >
        Let's Connect to Developer
      </h1>
      <p className="text-center fade-once text-white py-5 text-xl">
        Reach out by filling out the form below, and I’ll respond promptly
      </p>

      <form
        onSubmit={handleSubmit}
        className="form-once flex flex-col gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 shadow-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className=" input-once p-4 border border-white/20 rounded-lg shadow-lg bg-white/10 backdrop-blur-md placeholder-gray-500 text-black focus:bg-white/20 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-once p-4 border border-white/20 rounded-lg shadow-lg bg-white/10 backdrop-blur-md placeholder-gray-500 text-black focus:bg-white/20 focus:outline-none"
          style={{ animationDelay: "0.4s" }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
          className="input-once p-4 border border-white/20 rounded-lg shadow-lg bg-white/10 backdrop-blur-md placeholder-gray-500 text-black focus:bg-white/20 focus:outline-none resize-none"
          style={{ animationDelay: "0.5s" }}
        />
        <button
          type="submit"
          disabled={loading}
          className="input-once mx-auto border border-white/20 rounded-xl shadow-lg py-2 px-6 backdrop-blur-md bg-white/10 font-bold cursor-pointer transition duration-400 ease hover:scale-105 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
          style={{ animationDelay: "0.6s", animationDuration: "0.4s" }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;

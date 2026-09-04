import { useState } from "react";
import API from "../api.js";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
} from "lucide-react";

function Contactpage() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const response = await API.post(
        "/contact/send",
        contact
      );

      setSuccess(
        response.data.message || "Message sent successfully!"
      );

      setContact({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="font-semibold uppercase tracking-wider text-orange-500">
            Get in touch
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Contact Cplus Restaurant
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Have a question, suggestion, or feedback?
            Send us a message and we will get back to you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Contact Information */}
          <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

            <h2 className="text-2xl font-bold">
              Let's talk
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              We would love to hear from you. Contact us
              for any questions about our food or services.
            </p>

            <div className="mt-8 space-y-6">

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 font-medium">
                    omarcabdi0008@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Phone
                  </p>

                  <p className="mt-1 font-medium">
                    +252 61 2 07 13 07
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 font-medium">
                    Mogadishu, Banaadir Digfer
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl bg-white p-7 shadow-xl lg:col-span-2">

            <h2 className="text-2xl font-bold text-slate-900">
              Send us a message
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the form below and send your message.
            </p>

            {/* Success */}
            {success && (
              <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {success}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    required
                  />
                </div>

              </div>

              {/* Phone + Subject */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    placeholder="+252..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={contact.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    required
                  />
                </div>

              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>

                <textarea
                  name="message"
                  value={contact.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={19} />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contactpage;
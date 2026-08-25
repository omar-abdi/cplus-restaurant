import { useState } from "react";
import axios from "axios";

const Adddrink = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post("http://localhost:5000/api/drinks/add", {
        ...formData,
        price: Number(formData.price),
      });

      setMessage("Cabitaanka si guul leh ayaa loo daray!");
      setFormData({ name: "", price: "", description: "", image: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add drink");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-[#C98A3D]">
          Drinks
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[#2B1B14]">
          Ku dar Cabitaan Cusub
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-[#2B1B14]/10 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2B1B14]/60">
            Magaca
          </label>
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#2B1B14]/15 px-4 py-3 text-sm outline-none focus:border-[#C98A3D]"
            placeholder="Tusaale: Mango Juice"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2B1B14]/60">
            Qiimaha ($)
          </label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#2B1B14]/15 px-4 py-3 text-sm outline-none focus:border-[#C98A3D]"
            placeholder="4.99"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2B1B14]/60">
            Sharaxaad
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border border-[#2B1B14]/15 px-4 py-3 text-sm outline-none focus:border-[#C98A3D]"
            placeholder="Sharaxaad gaaban..."
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2B1B14]/60">
            Image URL
          </label>
          <input
            required
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#2B1B14]/15 px-4 py-3 text-sm outline-none focus:border-[#C98A3D]"
            placeholder="https://..."
          />
        </div>

        {message && (
          <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#2B1B14] py-3 text-sm font-semibold text-white transition hover:bg-[#C98A3D] disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Drink"}
        </button>
      </form>
    </div>
  );
};

export default Adddrink;

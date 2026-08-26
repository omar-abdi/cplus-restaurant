import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import storeOrders from "../zustand/orderers";

const GetDrinkById = () => {
  const { id } = useParams();
  const { addToCart } = storeOrders();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDrink = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`http://localhost:5000/api/drinks/get/${id}`);
        setDrink(response.data.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Drink could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    getDrink();
  }, [id]);

  if (loading) return <p className="p-10 text-center text-slate-500">Loading drink...</p>;
  if (error || !drink) return <p className="p-10 text-center text-rose-600">{error || "Drink not found."}</p>;

  return (
    <section className="min-h-screen bg-[#FBF3E7] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/drinks" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B1B14] hover:text-[#C98A3D]"><ArrowLeft size={17} /> Back to drinks</Link>
        <div className="mt-6 grid overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
          <img src={drink.image} alt={drink.name} className="h-80 w-full object-cover md:h-full" />
          <div className="flex flex-col p-7 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A3D]">Freshly served</p>
            <h1 className="mt-3 text-3xl font-bold text-[#2B1B14]">{drink.name}</h1>
            <p className="mt-4 leading-7 text-[#2B1B14]/65">{drink.description || "A refreshing drink prepared for you."}</p>
            <p className="mt-7 text-3xl font-bold text-[#C98A3D]">${drink.price}</p>
            <button type="button" onClick={() => addToCart(drink, "Drinks")} className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#2B1B14] px-6 py-3 font-semibold text-white transition hover:bg-[#C98A3D]"><ShoppingCart size={18} /> Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetDrinkById;

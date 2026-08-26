import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChefHat, Plus, Search, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import storeMeals from "../zustand/meals";
import storeOrders from "../zustand/orderers";

function MealsComponent() {
  const { meals, getMeals, loading, error } = storeMeals();
  const { cartItems, addToCart } = storeOrders();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  const filteredMeals = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return meals;
    return meals.filter((meal) => [meal.name, meal.description].filter(Boolean).some((value) => value.toLowerCase().includes(term)));
  }, [meals, search]);

  return (
    <main className="min-h-screen bg-[#fffaf3] pb-16">
      <section className="relative overflow-hidden bg-[#2b1b14] px-6 py-14 text-white sm:py-20">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl"><div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-200"><ChefHat size={16} /> Freshly made for you</div><h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Find your next favourite meal.</h1><p className="mt-4 max-w-xl text-base leading-7 text-orange-100/80">Explore dishes made with quality ingredients and plenty of flavour. Add your favourites to the cart in one click.</p></div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500"><ShoppingBag size={19} /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-orange-100/70">Available today</p><p className="text-xl font-bold">{meals.length} meals</p></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#eddcc8] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold text-[#2b1b14]">Our menu</h2><p className="mt-1 text-sm text-[#795847]">Choose something delicious today.</p></div><label className="flex w-full items-center gap-2 rounded-xl border border-[#ead9c6] bg-[#fffaf3] px-3 py-2.5 text-[#9e765b] sm:max-w-sm"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search meals..." className="w-full bg-transparent text-sm text-[#2b1b14] outline-none placeholder:text-[#a8846c]" /></label></div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="overflow-hidden rounded-3xl bg-white shadow-sm"><div className="h-60 animate-pulse bg-[#f4e8d9]" /><div className="space-y-3 p-6"><div className="h-5 w-2/3 animate-pulse rounded bg-[#f4e8d9]" /><div className="h-4 animate-pulse rounded bg-[#f4e8d9]" /><div className="h-11 animate-pulse rounded-xl bg-[#f4e8d9]" /></div></div>)}</div>
        ) : error ? (
          <div className="mt-8 rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">Unable to load meals: {error}</div>
        ) : filteredMeals.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-[#dfc6ac] bg-white p-14 text-center"><Search className="mx-auto text-[#c98a3d]" size={28} /><h2 className="mt-4 text-xl font-bold text-[#2b1b14]">No meals found</h2><p className="mt-2 text-sm text-[#795847]">Try another search term.</p></div>
        ) : (
          <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMeals.map((meal) => {
              const mealId = meal._id || meal.id;
              const inCart = cartItems.some((item) => item.product === mealId && item.itemModel === "Prod");
              return (
                <article key={mealId} className="group overflow-hidden rounded-3xl border border-[#efdfcf] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6b3a16]/10">
                  <div className="relative h-60 overflow-hidden bg-[#f4e8d9]"><img src={meal.image} alt={meal.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2b1b14]/50 to-transparent" /><span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#8e551f] shadow-sm"><Star size={13} fill="currentColor" /> Popular choice</span><p className="absolute right-4 top-4 rounded-xl bg-[#2b1b14] px-3 py-2 text-sm font-bold text-white shadow-lg">${Number(meal.price || 0).toFixed(2)}</p></div>
                  <div className="p-5"><h2 className="text-lg font-bold text-[#2b1b14]">{meal.name}</h2><p className="mt-2 min-h-10 text-sm leading-5 text-[#765a49]">{meal.description || "Prepared fresh in our kitchen."}</p><div className="mt-5 grid grid-cols-[1fr_auto] gap-3"><button type="button" onClick={() => addToCart(meal, "Prod")} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${inCart ? "bg-emerald-50 text-emerald-700" : "bg-[#2b1b14] text-white hover:bg-[#c97f30]"}`}><Plus size={18} />{inCart ? "Add another" : "Add to cart"}</button><button type="button" onClick={() => navigate(`/meals/${mealId}`)} aria-label={`View ${meal.name}`} className="inline-flex items-center justify-center rounded-xl border border-[#dfc6ac] px-3 text-[#795847] transition hover:border-[#c98a3d] hover:bg-[#fff4e7] hover:text-[#a85f19]"><ArrowRight size={19} /></button></div></div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default MealsComponent;

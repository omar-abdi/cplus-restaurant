import { ArrowRight, ChefHat, Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";

const foodImages = [
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85",
    alt: "Fresh pizza",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85",
    alt: "Fresh pasta",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=85",
    alt: "Grilled food",
  },
];

function Home() {
  return (
    <main className="overflow-hidden bg-[#fffaf3] text-[#27170f]">
      <section className="relative isolate px-6 pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-gradient-to-br from-[#fbe7ca] via-[#fff8ef] to-[#f5d1a0]/60" />
        <div className="absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#e9a354]/25 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d58e3d]/25 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-[#a85f19] shadow-sm">
              <ChefHat size={16} /> Made with care, served with love
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[1.04] tracking-tight text-[#2b1b14] sm:text-6xl lg:text-7xl">
              Welcome to our <span className="text-[#ca7d2e]">restaurant.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#654838] sm:text-lg">
              Discover freshly prepared meals, vibrant flavours, and your next favourite dish—all made for a great moment at the table.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/meals" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2b1b14] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2b1b14]/20 transition hover:-translate-y-0.5 hover:bg-[#c97f30]">
                Explore our meals <ArrowRight size={18} />
              </Link>
              <div className="flex items-center gap-3 px-2 text-sm text-[#745342]"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#d28a39] shadow-sm"><Clock3 size={18} /></span> Fresh food, every day</div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">{foodImages.map((food) => <img key={food.alt} src={food.src} alt="" className="h-10 w-10 rounded-full border-2 border-[#fffaf3] object-cover" />)}</div>
              <div><div className="flex gap-0.5 text-[#e09935]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill="currentColor" />)}</div><p className="mt-1 text-xs font-medium text-[#795847]">Loved by our customers</p></div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-5 rounded-[3rem] bg-[#eab06a]/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border-[7px] border-white bg-[#e5a259] shadow-2xl shadow-[#6c3f1a]/25">
              <img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=90" alt="A table full of freshly prepared restaurant food" className="h-[31rem] w-full object-cover sm:h-[36rem]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25130b]/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md"><div><p className="text-xs font-semibold uppercase tracking-widest text-orange-100">Today's special</p><p className="mt-1 text-xl font-bold">Fresh flavours, warm moments</p></div><span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#8b4d16]">Chef's pick</span></div>
            </div>
            <img src={foodImages[0].src} alt="Pizza" className="absolute -bottom-8 -left-5 hidden h-32 w-32 rounded-3xl border-4 border-[#fffaf3] object-cover shadow-xl sm:block" />
          </div>
        </div>
      </section>

      <section className="border-y border-[#ead9c6] bg-white px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-6 text-center sm:grid-cols-3"><div><p className="text-2xl font-black text-[#2b1b14]">Fresh daily</p><p className="mt-1 text-sm text-[#765a49]">Prepared when you order</p></div><div><p className="text-2xl font-black text-[#2b1b14]">Quality ingredients</p><p className="mt-1 text-sm text-[#765a49]">Flavour you can trust</p></div><div><p className="text-2xl font-black text-[#2b1b14]">Made for you</p><p className="mt-1 text-sm text-[#765a49]">A menu for every craving</p></div></div>
      </section>
    </main>
  );
}

export default Home;

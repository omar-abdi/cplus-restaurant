
import {
  Clock3,
  MapPin,
  Phone,
  Mail,
  Utensils,
  Heart,
  BadgeCheck,
  Star,
} from "lucide-react";

const Details = () => {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-400">
              <Utensils size={16} />
              Cplus Restaurant
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Taste the
              <span className="text-orange-500"> difference.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Welcome to Cplus Restaurant, where delicious food,
              excellent taste, and warm hospitality come together.
              We are proud to serve our customers with quality meals
              every day.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
                <Clock3 size={18} className="text-orange-400" />
                Open 24 Hours
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
                <MapPin size={18} className="text-orange-400" />
                Taleex, Muqdisho
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-orange-500/10 blur-xl" />

           <img
  src="/images/logo.png"
  alt="Cplus Restaurant"
  className="relative h-[420px] w-full rounded-3xl object-cover shadow-xl"
/>

            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <Star size={20} fill="currentColor" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Quality Food
                </p>

                <p className="text-xs text-slate-500">
                  Made with care
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              About Us
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Good food, great taste,
              <span className="text-orange-500"> every day.</span>
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Cplus Restaurant is a restaurant located in Taleex,
              Muqdisho. Our goal is to provide delicious meals with
              great taste while giving every customer a comfortable
              and welcoming experience.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We are open 24 hours, so you can enjoy your favorite
              meals whenever you need them.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <Utensils size={20} />
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Delicious Food
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Fresh and tasty meals prepared with care.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <Heart size={20} />
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Great Hospitality
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Friendly service and a welcoming atmosphere.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Why customers choose Cplus
            </h2>

            <p className="mt-4 text-slate-500">
              We focus on the things that matter most to our customers.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {/* Food */}
            <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50/40 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-200 transition group-hover:scale-105">
                <Utensils size={25} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Delicious Food
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                We prepare tasty meals with great attention to
                flavor and quality.
              </p>
            </div>

            {/* Service */}
            <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50/40 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-200 transition group-hover:scale-105">
                <BadgeCheck size={25} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Excellent Service
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Our customers deserve friendly, respectful, and
                welcoming service.
              </p>
            </div>

            {/* Price */}
            <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50/40 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-200 transition group-hover:scale-105">
                <Star size={25} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Fair Prices
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Enjoy quality food at reasonable prices that give
                you great value.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= RESTAURANT INFO ================= */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        <div className="overflow-hidden rounded-3xl bg-slate-950 shadow-xl">

          <div className="grid md:grid-cols-3">

            {/* Opening */}
            <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                <Clock3 size={20} />
              </div>

              <p className="mt-5 text-sm font-medium text-slate-400">
                Opening Hours
              </p>

              <h3 className="mt-1 text-xl font-bold text-white">
                Open 24 Hours
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Every day
              </p>
            </div>

            {/* Location */}
            <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                <MapPin size={20} />
              </div>

              <p className="mt-5 text-sm font-medium text-slate-400">
                Location
              </p>

              <h3 className="mt-1 text-xl font-bold text-white">
                 Muqdisho Banaadir Digfer
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Somalia
              </p>
            </div>

            {/* Contact */}
            <div className="p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                <Phone size={20} />
              </div>

              <p className="mt-5 text-sm font-medium text-slate-400">
                Contact
              </p>

              {/* CHANGE PHONE HERE */}
              <h3 className="mt-1 text-xl font-bold text-white">
                +252 6124800687
              </h3>

              {/* CHANGE EMAIL HERE */}
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <Mail size={14} />
                rayanabdi747@gmail.com
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 pb-16 lg:px-8">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-12 text-center shadow-xl sm:px-10">

          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Ready to enjoy great food?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-orange-50">
            Explore our menu and discover delicious meals prepared
            especially for you.
          </p>

          <a
            href="/meals"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-orange-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            <Utensils size={18} />
            Explore Our Menu
          </a>

        </div>

      </section>

    </main>
  );
};

export default Details;

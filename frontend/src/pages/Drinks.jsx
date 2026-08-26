import { useEffect, useState } from 'react'
import storeDrinks from "../zustand/drinks"
import { ShoppingCart, Heart, Star, Search, X } from 'lucide-react'
import storeOrders from '../zustand/orderers'
import { useNavigate } from 'react-router-dom'

function Drinks() {
  const { drinks, getDrinks } = storeDrinks()
  const { cartItems, addToCart } = storeOrders()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getDrinks()
  }, [])

  // Filter drinks based on search term
  const filteredDrinks = drinks ? drinks.filter((drink) =>
    drink.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2B1B14] tracking-tight">
            Drinks Collection
          </h1>
          <p className="text-sm text-[#2B1B14]/60 mt-1">
            Choose your favorite refreshing drink
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2B1B14]/40" />
          <input
            type="text"
            placeholder="Search drink by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-[#2B1B14]/10 text-sm font-medium text-[#2B1B14] placeholder-[#2B1B14]/40 shadow-sm transition-all focus:border-[#C98A3D] focus:outline-none focus:ring-2 focus:ring-[#C98A3D]/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B1B14]/40 hover:text-[#2B1B14] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Drinks Grid */}
      {filteredDrinks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrinks.map((drink) => (
            <div
              key={drink._id || drink.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-slate-100"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Wishlist icon */}
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition hover:bg-white hover:scale-110"
                >
                  <Heart className="h-4 w-4 text-[#2B1B14]" />
                </button>

                {/* Rating badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-[#2B1B14] shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-[#C98A3D] text-[#C98A3D]" />
                  4.8
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-[#2B1B14]">
                    {drink.name}
                  </h2>
                  <span className="whitespace-nowrap font-mono text-base font-bold text-[#C98A3D]">
                    ${drink.price}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-[#2B1B14]/60">
                  {drink.description}
                </p>

                {/* Buttons */}
                <div className="mt-5 space-y-2.5">
                  <button
                    onClick={() => addToCart(drink, "Drinks")}
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2B1B14] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#C98A3D] hover:shadow-lg active:scale-[0.98]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/drinks/${drink._id || drink.id}`)}
                    className="flex w-full items-center justify-center rounded-2xl border border-[#2B1B14]/20 py-2.5 text-sm font-semibold text-[#2B1B14] transition-all hover:border-[#C98A3D] hover:bg-[#C98A3D] hover:text-white"
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-lg font-medium text-[#2B1B14]/60">
            No drinks found matching "{searchTerm}"
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 bg-[#2B1B14] text-white rounded-xl text-sm font-semibold hover:bg-[#C98A3D] transition"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  )
}

export default Drinks
import { useEffect } from 'react'
import storeDrinks from "../zustand/drinks"
import { ShoppingCart, Heart, Star } from 'lucide-react'
import storeOrders from '../zustand/orderers'
import { useNavigate } from 'react-router-dom'
function Drinks() {
  const { drinks, getDrinks } = storeDrinks()
  const { cartItems, addToCart } = storeOrders()
  const navigate = useNavigate()

  useEffect(() => {
    getDrinks()
  }, [])

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[#2B1B14] mb-8 tracking-tight">
        Drinks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drinks && drinks.map((drink) => (
          <div
            key={drink._id || drink.id}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={drink.image}
                alt={drink.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Wishlist icon, top-right of image */}
              <button
                type="button"
                aria-label="Add to wishlist"
                className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition hover:bg-white hover:scale-110"
              >
                <Heart className="h-4 w-4 text-[#2B1B14]" />
              </button>

              {/* Small rating badge, bottom-left of image */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-[#2B1B14] shadow-sm">
                <Star className="h-3 w-3 fill-[#C98A3D] text-[#C98A3D]" />
                4.8
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-[#2B1B14]">
                  {drink.name}
                </h2>
                <span className="whitespace-nowrap font-mono text-base font-medium text-[#C98A3D]">
                  price ${drink.price}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-[#2B1B14]/60">
                {drink.description}
              </p>

              {/* Add to cart button */}
              <button onClick={() => addToCart(drink ,"Drinks")} type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2B1B14] py-2.5 text-sm font-medium text-white transition hover:bg-[#C98A3D]"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => navigate(`/drinks/${drink._id || drink.id}`)}
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#2B1B14] py-2.5 text-sm font-medium text-[#2B1B14] transition hover:border-[#C98A3D] hover:bg-[#C98A3D] hover:text-white"
              >
                View drink..
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Drinks

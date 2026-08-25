
import { useEffect } from 'react'
import storeMeals from "../zustand/meals"
function MealsComponent() {
  const { meals, getMeals } = storeMeals()

  useEffect(() => {
    getMeals()
  }, []) // Empty array si uu hal mar oo keliya u ordo marba marka component-ga uu render ka baxo

  return (
    <section className="bg-[#FBF3E7] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[5px] text-[#C98A3D]">
            Menu-gayaga
          </p>
          <h1 className="mt-3 text-4xl font-light text-[#2B1B14] md:text-5xl">
            Meals
          </h1>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {meals && meals.map((meal) => (
            <div
              key={meal._id || meal.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-[#2B1B14]">
                    {meal.name}
                  </h2>
                  <span className="whitespace-nowrap font-mono text-base font-medium text-[#C98A3D]">
                    ${meal.price}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-[#2B1B14]/60">
                  {meal.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default MealsComponent
import { create } from "zustand";
import axios from "axios";

const storeMeals = create((set) => ({
  meals: [],
  loading: false,
  error: null,

  getMeals: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
     const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/food/product`
);

      // Log tan si aad console-ka uga aragto waxa uu API-gu soo celinayo
      console.log("Backend Response:", res.data);

      // Hadii Backend-ku soo celiyo { products: [...] } ama { meals: [...] }
      // U beddel `res.data.products` ama property-ga saxda ah oo array-ga ah:
      const mealsData = Array.isArray(res.data) 
        ? res.data 
        : res.data.products || res.data.meals || res.data.data || [];

      set({
        meals: mealsData,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
        meals: [], // Ka hortag in uu undefined ama null noqdo
      });
    }
  },
  //get by product id frontend 
 
}));

export default storeMeals;
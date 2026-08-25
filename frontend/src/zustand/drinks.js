import { create } from "zustand";
import axios from "axios";

const storeDrinks = create((set) => ({
  drinks: [],
  loading: false,
  error: null,

  getDrinks: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const res = await axios.get("http://localhost:5000/api/drinks/add");

      // Log tan si aad console-ka uga aragto waxa uu API-gu soo celinayo
      console.log("Backend Response:", res.data);

      // Hadii Backend-ku soo celiyo { products: [...] } ama { meals: [...] }
      // U beddel `res.data.products` ama property-ga saxda ah oo array-ga ah:
      const drinkData = Array.isArray(res.data) 
        ? res.data 
        : res.data.products || res.data.meals || res.data.data || [];

      set({
        meals: drinkData,
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
}));

export default storeMeals;
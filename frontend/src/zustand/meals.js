import { create } from "zustand";
import axios from "axios";

const meals = create((set) => ({
  meals: [],
  loading: false,
  error: null,

  getMeals: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const res = await axios.get("http://localhost:5000/api/product");

      set({
        meals: res.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.message,
      });
    }
  },
}));

export default meals;
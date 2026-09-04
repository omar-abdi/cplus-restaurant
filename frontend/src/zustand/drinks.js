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
     const res = await axios.get(
  "http://localhost:5000/api/drinks/get"
);

      console.log("Backend Response:", res.data);

      // Backend-ku wuxuu soo celinayaa { success: true, message: "...", data: [...] }
      // Sidaas darteed res.data.data ayaa ah array-ga dhabta ah
      const drinkData = Array.isArray(res.data) 
        ? res.data 
        : res.data.data || res.data.products || res.data.meals || [];

      set({
        drinks: drinkData, // Halkan waxaa ku qornayd 'meals' - oo ah 'drinks'
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
        drinks: [], // Halkan lagu sameeyay 'drinks'
      });
    }
  },
}));

export default storeDrinks;
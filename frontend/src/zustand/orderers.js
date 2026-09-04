import API from "../api.js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const storeOrders = create(
  persist(
    (set, get) => ({
      cartItems: [],
      creatingOrder: false,
      loadingOrders: false,
      orderError: null,
      createdOrder: null,

      addToCart: (meal, itemModel) => {
        const productId = meal._id || meal.id;

        if (!productId || !itemModel) return;

        set((state) => {
          const existingItem = state.cartItems.find(
            (item) =>
              item.product === productId &&
              item.itemModel === itemModel
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.product === productId &&
                item.itemModel === itemModel
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              {
                product: productId,
                itemModel,
                name: meal.name,
                price: Number(meal.price),
                image: meal.image,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.product !== productId
          ),
        }));
      },

      updateQuantity: (productId, itemModel, quantity) => {
        const nextQuantity = Number(quantity);

        if (!Number.isInteger(nextQuantity) || nextQuantity < 1) return;

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.product === productId && item.itemModel === itemModel
              ? { ...item, quantity: nextQuantity }
              : item
          ),
        }));
      },

      clearCart: () =>
        set({
          cartItems: [],
          createdOrder: null,
          orderError: null,
        }),

      createOrder: async () => {
        const { cartItems } = get();

        if (cartItems.length === 0) {
          set({
            orderError: "Your cart is empty",
          });

          return null;
        }

        set({
          creatingOrder: true,
          orderError: null,
        });

        try {
          const response = await API.post(
            "/order/createorder",
            {
              items: cartItems.map(
                ({ product, itemModel, quantity }) => ({
                  product,
                  itemModel,
                  quantity,
                })
              ),
            },
            {
              withCredentials: true,
            }
          );

          set({
            creatingOrder: false,
            createdOrder: response.data.order,
            cartItems: [],
          });

          return response.data.order;
        } catch (error) {
          set({
            creatingOrder: false,
            orderError:
              error.response?.data?.message ||
              "Failed to create order",
          });

          return null;
        }
      },

      getOrders: async (userId) => {
        set({ loadingOrders: true, orderError: null });

        try {
          const response = await API.get(`/order/user/${userId}`, {
            withCredentials: true,
          });

          set({ loadingOrders: false });
          return response.data.orders || [];
        } catch (error) {
          set({
            loadingOrders: false,
            orderError:
              error.response?.data?.message || "Failed to load orders",
          });
          return [];
        }
      },
    }),
    {
      name: "restaurant-cart",
    }
  )
);

export default storeOrders;

import axios from 'axios'
import { create } from 'zustand'

const API_URL = 'http://localhost:5000/api/order'

const storeOrders = create((set, get) => ({
	cartItems: [],
	creatingOrder: false,
	orderError: null,
	createdOrder: null,

	addToCart: (meal) => {
		const productId = meal._id || meal.id

		if (!productId) return

		set((state) => {
			const existingItem = state.cartItems.find((item) => item.product === productId)

			if (existingItem) {
				return {
					cartItems: state.cartItems.map((item) => item.product === productId
						? { ...item, quantity: item.quantity + 1 }
						: item),
				}
			}

			return {
				cartItems: [...state.cartItems, {
					product: productId,
					name: meal.name,
					price: Number(meal.price),
					image: meal.image,
					quantity: 1,
				}],
			}
		})
	},

	removeFromCart: (productId) => {
		set((state) => ({
			cartItems: state.cartItems.filter((item) => item.product !== productId),
		}))
	},

	clearCart: () => set({ cartItems: [], createdOrder: null, orderError: null }),

	createOrder: async () => {
		const { cartItems } = get()

		if (cartItems.length === 0) {
			set({ orderError: 'Your cart is empty' })
			return null
		}

		set({ creatingOrder: true, orderError: null })

		try {
			const response = await axios.post(
				`${API_URL}/createorder`,
				{ items: cartItems.map(({ product, quantity }) => ({ product, quantity })) },
				{ withCredentials: true },
			)

			set({ creatingOrder: false, createdOrder: response.data.order })
			return response.data.order
		} catch (error) {
			set({
				creatingOrder: false,
				orderError: error.response?.data?.message || 'Failed to create order',
			})
			return null
		}
	},
}))

export default storeOrders

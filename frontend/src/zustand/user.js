import {create} from "zustand"
 import API from "../api.js"

const storeUser = create((set) => ({
	user: JSON.parse(localStorage.getItem('user'))|| null,
	loading: false,
	error: null,

	Signup: async (formData) => {
		set({loading: true, error: null})

		try {
			const res = await API.post("/user/signup", formData)
			set({
                user: res.data,
                loading: false})
			localStorage.setItem('user', JSON.stringify(res.data))
			return true

		} catch (error) {
			set({loading: false, error: error.response?.data?.message || error.message})
			return false
		}
	},
Login: async (email, password) => {
		set({loading: true, error: null})
		try {
			const res = await API.post("/user/login", {email, password})
			set({
                user: res.data.data,
                loading: false})
			localStorage.setItem('user', JSON.stringify(res.data.data))
			return true
		} catch (error) {
			set({loading: false, error: error.response?.data?.message || error.message})
			return false
		}
	},
	logout: () => {
		set({ user: null, loading: false, error: null })
		localStorage.removeItem('user')
	},

	getAllUsers: async () => {
		set({ loading: true, error: null })

		try {
			const res = await API.get("/user/all")

			set({ loading: false })
			return res.data.users
		} catch (error) {
			set({
				loading: false,
				error: error.response?.data?.message || error.message,
			})
			return []
		}
	},
}))


export default storeUser



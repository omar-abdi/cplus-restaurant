import {create} from "zustand"
 import axios from "axios"

const storeUser = create((set) => ({
	user: JSON.parse(localStorage.getItem('user'))|| null,
	loading: false,
	error: null,

	Signup: async (formData) => {
		set({loading: true, error: null})

		try {
			const res = await axios.post("http://localhost:5000/api/user/signup", formData)
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
			const res = await axios.post("http://localhost:5000/api/user/login", {email, password}, { withCredentials: true })
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
			const res = await axios.get("http://localhost:5000/api/user/all", {
				withCredentials: true,
			})

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



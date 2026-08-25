import {create} from "zustand"
 import axios from "axios"

const useUser = create((set) => ({
	user: JSON.parse(localStorage.getItem('user'))|| null,
	loading: false,
	error: null,

	Signup: async ( name ,email, password ,phone ,address) => {
		set({loading: true, error: null})

		try {
			const res = await axios.post('http://localhost:5000/api/user/signup', {email, password , name , phone , address})
			set({
                user: res.data.user, 
                loading: false})
            //local stoare

		} catch (error) {
			set({loading: false, error: error.response?.data?.message || error.message})
		}
	},
Login: async (email, password) => {
		set({loading: true, error: null})
		try {
			const res = await axios.post('http://localhost:5000/api/user/login', {email, password})
			set({
                user: res.data.user, 
                loading: false})
            //local stoare
            localStorage.setItem('user', JSON.stringify(res.data.user))
		} catch (error) {
			set({loading: false, error: error.response?.data?.message || error.message})
		}
	},
	logout: () => {
		set({user: null, loading: false})
	},
}))


export default useUser



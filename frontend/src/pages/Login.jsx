import { useState } from 'react'
import { Mail, Lock, LogIn, Eye, EyeOff, Utensils } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import storeUser from '../zustand/user'

function Login() {
  const navigate = useNavigate()
  const { Login, loading, error } = storeUser()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      return
    }

    const success = await Login(formData.email, formData.password)

    if (success) {
      setFormData({ email: '', password: '' })
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
        
        {/* Dhanka Bidix: Welcome Section */}
        <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900 p-8 lg:p-12 text-white flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-slate-900/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-semibold tracking-wider uppercase">
              <Utensils className="w-4 h-4 text-teal-300" />
              <span>Delicious Experience</span>
            </div>
          </div>

          <div className="relative z-10 my-auto py-12">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
              Welcome to <br />
              <span className="text-teal-300">Our Restaurant</span>
            </h1>
            <p className="text-teal-100/80 text-sm lg:text-base leading-relaxed max-w-sm">
              Discover amazing dishes, manage your orders, and enjoy an extraordinary dining experience with us.
            </p>
          </div>

          <div className="relative z-10 text-xs text-teal-200/60">
            © {new Date().getFullYear()} Our Restaurant. All rights reserved.
          </div>
        </div>

        {/* Dhanka Midig: Login Form Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
          
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 mb-4 border border-teal-500/20">
              <LogIn className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome</h2>
            <p className="text-xs text-slate-500 mt-1">Please login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700 rounded-r-xl">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-lg shadow-teal-600/25 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                "Soo Gal"
              )}
            </button>

            <div className="text-center pt-2">
              <Link to="/signup" className="text-sm font-semibold text-slate-600 transition hover:text-teal-600">
                Don't have an account? <span className="text-teal-600 font-bold underline">Sign up</span>
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
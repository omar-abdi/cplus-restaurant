import { useState } from 'react'
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate(  )
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if(!formData.email || !formData.password){ 
        setError("Please fill in all fields")
        return
     }
       if (success) {
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          address: '',
        })
navigate("/")

      }      


   
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 mb-4 border border-teal-500/20">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome </h2>
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
        </form>

      </div>
    </div>
  )
}

export default Login
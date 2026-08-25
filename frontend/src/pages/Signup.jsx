import { useState } from 'react'
import { Link } from 'react-router-dom'
import storeUser from '../zustand/user'


function Signup() {
  const { Signup, loading, error } = storeUser()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    })
    const handleChange = (e) => {
        setFormData({
             ...formData,
              [e.target.name]: e.target.value 
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
      const success = await Signup(formData)

      if (success) {
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          address: '',
        })
      }
    }
  return (
      <main className="min-h-[calc(100vh-72px)] bg-[#f6f2e9] px-5 py-10 text-[#2b1b14] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl overflow-hidden bg-white shadow-[0_24px_80px_rgba(43,27,20,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#2b1b14] p-8 text-[#fbf3e7] sm:p-12 lg:min-h-[650px]">
            <div className="relative z-10 flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center bg-[#c98a3d] text-xl font-bold">C+</span>
              <span className="font-mono text-[10px] uppercase tracking-[3px] text-[#fbf3e7]/60">Since 2014</span>
            </div>
            <div className="relative z-10 mt-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[4px] text-[#c98a3d]">Welcome to the table</p>
              <h1 className="max-w-md text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">Good meals are better <span className="text-[#e7b56d]">together.</span></h1>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#fbf3e7]/65">Create your account and keep your favorite flavors close. Your next good meal is just a few details away.</p>
            </div>
            <p className="relative z-10 mt-16 font-mono text-[10px] uppercase tracking-[2px] text-[#fbf3e7]/45">Freshly made · thoughtfully served</p>
            <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full border-[32px] border-[#c98a3d]/20" />
          </section>

          <section className="p-7 sm:p-12 lg:p-16">
            <div className="mb-9">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#c98a3d]">Create an account</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Join us for dinner.</h2>
              <p className="mt-3 text-sm text-[#2b1b14]/55">Tell us a little about yourself to get started.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2b1b14]/65">Full name</label>
                  <input id="name" required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-b border-[#2b1b14]/20 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#2b1b14]/25 focus:border-[#c98a3d]" placeholder="Amina Hassan" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2b1b14]/65">Phone</label>
                  <input id="phone" required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-b border-[#2b1b14]/20 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#2b1b14]/25 focus:border-[#c98a3d]" placeholder="+252 61 000 0000" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2b1b14]/65">Email address</label>
                <input id="email" required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b border-[#2b1b14]/20 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#2b1b14]/25 focus:border-[#c98a3d]" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="address" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2b1b14]/65">Delivery address</label>
                <input id="address" required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border-b border-[#2b1b14]/20 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#2b1b14]/25 focus:border-[#c98a3d]" placeholder="Street and city" />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2b1b14]/65">Password</label>
                <input id="password" required minLength="6" type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border-b border-[#2b1b14]/20 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#2b1b14]/25 focus:border-[#c98a3d]" placeholder="At least 6 characters" />
              </div>

              {error && <p role="alert" className="border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              <button disabled={loading} type="submit" className="flex w-full items-center justify-between bg-[#c98a3d] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#a96f2e] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? 'Creating account...' : 'Create my account'}
                <span className="text-xl">→</span>
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#2b1b14]/55">Already have an account? <Link to="/login" className="font-semibold text-[#2b1b14] underline decoration-[#c98a3d] underline-offset-4">Log in</Link></p>
          </section>
        </div>
      </main>
  )
}

export default Signup

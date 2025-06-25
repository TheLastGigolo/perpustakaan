import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../services/api"
import logoUnper from '../assets/logo-unper.png'
// kemudian src={logoUnper}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/auth/login", form)

      // ✅ Ambil token & user dari res.data.data
      const token = res.data.data.token
      const user = res.data.data.user

      // ✅ Simpan ke localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // ✅ Redirect berdasarkan role
      if (user.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/user")
      }

    } catch (err) {
      // ❗ Jika error di sini, pastikan formatnya sesuai backend
      setError(err.response?.data?.message || "Login gagal")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 md:flex-row flex-col">
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-br from-green-600 to-green-800 md:bg-gradient-to-br md:from-green-600 md:to-green-800 bg-green-700 p-6 md:p-10 flex flex-col justify-center text-white relative min-h-[40vh] md:min-h-screen">
        {/* Logo Container */}
        <div className="md:absolute md:top-10 md:left-10 flex flex-col md:flex-row items-center gap-3 mb-8 md:mb-0">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
            <img 
              // src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==" 
              src={logoUnper}
              alt="Logo UNPER" 
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback logo placeholder */}
            <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-xs hidden">
              UNPER
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-center md:text-left">
            <div>Perpustakaan</div>
            <div className="text-yellow-300">UNPER</div>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="md:mt-20 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight" style={{ fontFamily: 'serif' }}>
            Welcome Back!
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-4/5 mx-auto md:mx-0">
            Selamat datang kembali di sistem perpustakaan digital UNPER. 
            Silakan masuk untuk mengakses layanan perpustakaan yang lengkap dan modern.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Login</h2>
          <p className="text-gray-600 text-base mb-8">
            Selamat datang, silakan masuk ke akun Anda.
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 text-sm text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email Anda"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-green-700 focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password Anda"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-green-700 focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex items-center mb-5">
              <input
                type="checkbox"
                className="mr-2"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Ingat saya
              </label>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-green-700 text-white rounded hover:bg-green-800 transition-colors text-base mb-5"
            >
              Masuk
            </button>

            <div className="text-right">
              <a href="#" className="text-gray-600 text-sm hover:underline">
                Lupa Password?
              </a>
            </div>
          </form>
        </div>
      </div>


    </div>
  )
}
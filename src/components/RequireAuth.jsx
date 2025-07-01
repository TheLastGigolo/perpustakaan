import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function RequireAuth({ children, requiredRole = null }) {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const userRole = localStorage.getItem("userRole") // Asumsi role disimpan di localStorage

  useEffect(() => {
    // Jika tidak ada token, redirect ke login
    if (!token) {
      navigate("/")
      return
    }

    // Jika tidak ada role yang dibutuhkan, hanya cek token
    if (!requiredRole) {
      return
    }

    // Jika ada role yang dibutuhkan tapi user tidak memiliki role yang sesuai
    if (userRole !== requiredRole) {
      // Redirect berdasarkan role user
      if (userRole === "admin") {
        navigate("/admin")
      } else if (userRole === "anggota") {
        navigate("/user")
      } else {
        // Jika role tidak valid, logout dan redirect ke login
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        navigate("/")
      }
      return
    }
  }, [token, userRole, requiredRole, navigate])

  // Jika tidak ada token
  if (!token) return null

  // Jika ada role yang dibutuhkan tapi tidak sesuai
  if (requiredRole && userRole !== requiredRole) return null

  return children
}
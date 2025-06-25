import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function RequireAuth({ children }) {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token, navigate])

  if (!token) return null // atau loading indicator

  return children
}


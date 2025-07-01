export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    window.location.href = "/" // pakai reload penuh agar bersih
  }
  
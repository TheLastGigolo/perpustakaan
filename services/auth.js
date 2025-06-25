export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/" // pakai reload penuh agar bersih
  }
  
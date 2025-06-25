import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import BookPage from './pages/BookPage'
import AnggotaPage from './pages/AnggotaPage'
import PeminjamanPage from './pages/PeminjamanPage'
import LaporanPage from './pages/LaporanPage'
import UserDashboard from './pages/UserDashboard'
import RequireAuth from './components/RequireAuth'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        <Route path="/user" element={<RequireAuth><UserDashboard /></RequireAuth>} />
        <Route path="/admin/books" element={<RequireAuth><BookPage /></RequireAuth>} />
        <Route path="/admin/member" element={<RequireAuth><AnggotaPage /></RequireAuth>} />
        <Route path="/admin/borrowing" element={<RequireAuth><PeminjamanPage /></RequireAuth>} />
        <Route path="/admin/report" element={<RequireAuth><LaporanPage /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  )
}

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import BookPage from './pages/BookPage'
import AnggotaPage from './pages/AnggotaPage'
import PeminjamanPage from './pages/PeminjamanPage'
import LaporanPage from './pages/LaporanPage'
import UserDashboard from './pages/UserDashboard'
import UserBooks from './pages/AllBooks'
import UserReservasi from './pages/ReservasiBooks'
import UserSupports from './pages/Layanan&Bantuan'
import BookDetail from './pages/BookDetail'

import RequireAuth from './components/RequireAuth'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        
        {/* Admin Routes - hanya bisa diakses oleh admin */}
        <Route 
          path="/admin" 
          element={
            <RequireAuth requiredRole="admin">
              <AdminDashboard />
            </RequireAuth>
          } 
        />
        <Route 
          path="/admin/books" 
          element={
            <RequireAuth requiredRole="admin">
              <BookPage />
            </RequireAuth>
          } 
        />
        <Route 
          path="/admin/member" 
          element={
            <RequireAuth requiredRole="admin">
              <AnggotaPage />
            </RequireAuth>
          } 
        />
        <Route 
          path="/admin/borrowing" 
          element={
            <RequireAuth requiredRole="admin">
              <PeminjamanPage />
            </RequireAuth>
          } 
        />
        <Route 
          path="/admin/report" 
          element={
            <RequireAuth requiredRole="admin">
              <LaporanPage />
            </RequireAuth>
          } 
        />
        
        {/* User Routes - hanya bisa diakses oleh user */}
        <Route 
          path="/user" 
          element={
            <RequireAuth requiredRole="anggota">
              <UserDashboard />
            </RequireAuth>
          } 
        />
        
        <Route 
          path="/user/Books" 
          element={
            <RequireAuth requiredRole="anggota">
              <UserBooks />
            </RequireAuth>
          } 
        />
        
        <Route 
          path="/user/reservations" 
          element={
            <RequireAuth requiredRole="anggota">
              <UserReservasi />
            </RequireAuth>
          } 
        />

        <Route 
          path="/user/FAQ" 
          element={
            <RequireAuth requiredRole="anggota">
              <UserSupports />
            </RequireAuth>
          } 
        />
        
        <Route 
          path="/user/Books/:id" 
          element={
            <RequireAuth requiredRole="anggota">
              <BookDetail />
            </RequireAuth>
          } 
        />
        
          
        


        {/* Catch all route - redirect ke dashboard sesuai role */}
        <Route 
          path="*" 
          element={
            <RequireAuth>
              <RedirectToDashboard />
            </RequireAuth>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

// Component untuk redirect ke dashboard sesuai role
function RedirectToDashboard() {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
  
  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin")
    } else if (userRole === "anggota") {
      navigate("/user")
    } else {
      navigate("/")
    }
  }, [navigate, userRole])
  
  return null
}
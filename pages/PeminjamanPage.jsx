import { useEffect, useState } from "react"
import axios from "../services/api"
import { logout } from "../services/auth"
import { Link, useLocation } from "react-router-dom"

// Custom SVG Icons (reusing from AdminDashboard)
const BarChart3 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12v4m4-8v8m4-4v4" />
  </svg>
)

const BookOpen = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const LogOut = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
)

const FileText = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const Menu = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronLeft = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const Edit = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const Trash2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

export default function PeminjamanPage() {
  const location = useLocation()
  const currentPath = location.pathname
  const [borrowings, setBorrowings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedBorrowing, setSelectedBorrowing] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [borrowingsPerPage] = useState(10)

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get("/admin/borrowings", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // Ensure we're getting an array from the response
        setBorrowings(res.data?.data || [])
      } catch (error) {
        console.error("Error fetching borrowings:", error)
        // Fallback to mock data if API fails
        setBorrowings([
          {
            id: 1,
            book_title: "Pemrograman JavaScript Modern",
            member_name: "John Doe",
            borrow_date: "2024-05-15",
            due_date: "2024-05-29",
            status: "Dipinjam"
          },
          {
            id: 2,
            book_title: "React untuk Pemula",
            member_name: "Jane Smith",
            borrow_date: "2024-05-20",
            due_date: "2024-06-03",
            status: "Dipinjam"
          },
          {
            id: 3,
            book_title: "Clean Code",
            member_name: "Bob Johnson",
            borrow_date: "2024-04-10",
            due_date: "2024-04-24",
            status: "Dikembalikan"
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }
    fetchBorrowings()
  }, [])

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false)
        setMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filter borrowings based on search term
  const filteredBorrowings = borrowings.filter(borrowing =>
    borrowing.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    borrowing.member_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const indexOfLastBorrowing = currentPage * borrowingsPerPage
  const indexOfFirstBorrowing = indexOfLastBorrowing - borrowingsPerPage
  const currentBorrowings = filteredBorrowings.slice(indexOfFirstBorrowing, indexOfLastBorrowing)
  const totalPages = Math.ceil(filteredBorrowings.length / borrowingsPerPage)

  const handleDeleteBorrowing = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data peminjaman ini?')) {
      try {
        const token = localStorage.getItem("token")
        await axios.delete(`/admin/borrowings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBorrowings(borrowings.filter(borrowing => borrowing.id !== id))
      } catch (error) {
        console.error("Error deleting borrowing:", error)
        // For demo purposes, remove from local state
        setBorrowings(borrowings.filter(borrowing => borrowing.id !== id))
      }
    }
  }

  const openDetailModal = (borrowing) => {
    setSelectedBorrowing(borrowing)
    setShowDetailModal(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat data peminjaman...</p>
        </div>
      </div>
    )
  }

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin", active: currentPath === "/admin" },
    { icon: BookOpen, label: "Data Buku", path: "/admin/books", active: currentPath === "/admin/books" },
    { icon: Users, label: "Data Anggota", path: "/admin/member", active: currentPath === "/admin/member" },
    { icon: Download, label: "Data Peminjaman", path: "/admin/borrowing", active: currentPath === "/admin/borrowing" },
    { icon: FileText, label: "Laporan", path: "/admin/report", active: currentPath === "/admin/report" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-emerald-700 shadow-lg z-50">
        <div className="px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-emerald-600 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              {/* Desktop Sidebar Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 text-white hover:bg-emerald-600 rounded-lg transition-colors"
              >
                {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 lg:w-6 lg:h-6 text-emerald-700" />
              </div>
              <span className="text-white font-bold text-sm lg:text-lg hidden sm:block">
                Universitas Perjuangan - SIP
              </span>
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-2 text-white hover:bg-emerald-600 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block text-sm">Admin</span>
              </button>
              
              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">Administrator</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      window.location.href = '/login'
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-800">SIP - Admin</span>
              </div>
            </div>
            <nav className="p-4">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors mb-1 ${
                    item.active ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
<aside className={`hidden lg:block fixed left-0 top-16 lg:top-20 ${sidebarCollapsed ? 'w-20' : 'w-64'} h-full bg-white shadow-lg border-r border-gray-200 z-40 transition-all duration-300`}>
  <div className="p-4 lg:p-6">
    {/* Profile Section */}
    {!sidebarCollapsed && (
      <div className="text-center mb-8">
        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </div>
        <h3 className="font-semibold text-gray-800 mb-1 text-sm lg:text-base">Miku Nakano</h3>
        <span className="inline-block bg-green-100 text-green-700 px-2 lg:px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
          Administrator
        </span>
      </div>
    )}

    {sidebarCollapsed && (
      <div className="text-center mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    )}

    {/* Navigation */}
    <nav>
      <ul className="space-y-2">
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path
          return (
            <li key={index}>
              <Link 
                to={item.path}
                className={`
                  flex items-center
                  ${sidebarCollapsed ? "justify-center px-3" : "space-x-3 px-4"}
                  py-3 rounded-lg font-medium transition-colors
                  ${isActive 
                    ? "text-gray-700 bg-emerald-50 border-r-4 border-emerald-500" 
                    : "text-gray-600 hover:bg-gray-50"}
                `}
                title={sidebarCollapsed ? item.label : ""}
              >
                <item.icon className={`w-6 h-6 ${isActive ? "text-emerald-600" : ""}`} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  </div>
</aside>

      {/* Main Content */}
      <main className={`lg:ml-64 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : ''}`}>
        <div className="pt-16 lg:pt-20 p-4 lg:p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Data Peminjaman</h1>
            <p className="text-gray-600">Kelola data peminjaman perpustakaan</p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari peminjaman..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Borrowings Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul Buku
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Peminjam
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Pinjam
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Pengembalian
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentBorrowings.map((borrowing) => (
                    <tr key={borrowing.id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{borrowing.book_title}</div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {borrowing.member_name}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(borrowing.borrow_date).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(borrowing.due_date).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          borrowing.status === 'Dipinjam' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {borrowing.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openDetailModal(borrowing)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link
                            to={`/admin/borrowings/edit/${borrowing.id}`}
                            className="text-emerald-600 hover:text-emerald-900 p-1"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteBorrowing(borrowing.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {currentBorrowings.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data peminjaman ditemukan</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Belum ada data peminjaman yang tercatat'}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Selanjutnya
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Menampilkan <span className="font-medium">{indexOfFirstBorrowing + 1}</span> sampai{' '}
                      <span className="font-medium">{Math.min(indexOfLastBorrowing, filteredBorrowings.length)}</span> dari{' '}
                      <span className="font-medium">{filteredBorrowings.length}</span> hasil
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === index + 1
                              ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail Borrowing Modal */}
      {showDetailModal && selectedBorrowing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-lg bg-white rounded-md shadow-lg">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Detail Peminjaman
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedBorrowing.book_title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{selectedBorrowing.member_name}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        Tanggal Pinjam: {new Date(selectedBorrowing.borrow_date).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        Tanggal Kembali: {new Date(selectedBorrowing.due_date).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className={`p-3 rounded-lg text-center ${
                    selectedBorrowing.status === 'Dipinjam' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                  }`}>
                    <div className="text-2xl font-bold">{selectedBorrowing.status}</div>
                    <div className="text-sm">Status Peminjaman</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    setSelectedBorrowing(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
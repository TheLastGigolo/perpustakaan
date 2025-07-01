import { useEffect, useState } from "react"
import axios from "../services/api"
import { logout } from "../services/auth"
import { Link, useLocation, useNavigate } from "react-router-dom"

// Custom SVG Icons
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

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949.684V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

export default function PeminjamanPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const [borrowings, setBorrowings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedBorrowing, setSelectedBorrowing] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [borrowingsPerPage] = useState(10)
  const [totalBorrowings, setTotalBorrowings] = useState(0)
  const [statusFilter, setStatusFilter] = useState('')

  // Add form modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [books, setBooks] = useState([])
  const [members, setMembers] = useState([])
  const [formData, setFormData] = useState({
    book_id: '',
    member_id: '',
    borrow_date: '',
    due_date: ''
  })
  const [formLoading, setFormLoading] = useState(false)

  const handleProfileClick = (e) => {
    e.preventDefault()
    setShowProfileDropdown(false)
    navigate('/admin/profile')
  }

  const handleMobileNavigation = (path) => {
    setMobileMenuOpen(false)
    navigate(path)
  }

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const token = localStorage.getItem("token")
        const params = {
          page: currentPage,
          limit: borrowingsPerPage,
          search: searchTerm,
          status: statusFilter
        }
        
        const res = await axios.get("/borrowings", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params
        })
        
        const responseData = res.data?.data
        if (responseData) {
          setBorrowings(responseData.borrowings || [])
          setTotalBorrowings(responseData.total || 0)
        } else {
          setBorrowings([])
          setTotalBorrowings(0)
        }
      } catch (error) {
        console.error("Error fetching borrowings:", error)
        setBorrowings([])
        setTotalBorrowings(0)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBorrowings()
  }, [currentPage, searchTerm, statusFilter])

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

  // Fetch books and members when add modal is opened
  useEffect(() => {
    if (showAddModal) {
      fetchBooksAndMembers()
    }
  }, [showAddModal])

  const fetchBooksAndMembers = async () => {
    try {
      const token = localStorage.getItem("token")
      
      // Fetch books
      const booksRes = await axios.get("/admin/books", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 1000 } // Get all books
      })
      
      // Fetch members
      const membersRes = await axios.get("/admin/members", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 1000 } // Get all members
      })
      
      // Update state with the data
      setBooks(booksRes.data?.message?.books || [])
      setMembers(membersRes.data?.message?.members || [])
    } catch (error) {
      console.error("Error fetching books and members:", error)
      alert('Gagal memuat data buku dan anggota')
    }
  }

  const filteredBorrowings = borrowings.filter(borrowing =>
    borrowing.book_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    borrowing.member_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentBorrowings = filteredBorrowings
  const totalPages = Math.ceil(totalBorrowings / borrowingsPerPage)

  const handleDeleteBorrowing = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data peminjaman ini?')) {
      setIsDeleting(id);
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/borrowings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Optimistic update - langsung hapus dari state tanpa perlu refresh
        setBorrowings(prev => prev.filter(b => b.id !== id));
        setTotalBorrowings(prev => prev - 1);
        alert('Peminjaman berhasil dihapus');
      } catch (error) {
        console.error("Error deleting borrowing:", error);
        const errorMessage = error.response?.data?.message || 'Gagal menghapus peminjaman';
        alert(errorMessage);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(`/borrowings/${id}/status`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setBorrowings(borrowings.map(borrowing => 
        borrowing.id === id ? {...borrowing, status: newStatus} : borrowing
      ))
    } catch (error) {
      console.error("Error updating borrowing status:", error)
      alert('Gagal memperbarui status peminjaman')
    }
  }

  const openDetailModal = (borrowing) => {
    setSelectedBorrowing(borrowing)
    setShowDetailModal(true)
  }

  const openAddModal = () => {
    setShowAddModal(true)
    // Set default dates
    const today = new Date()
    const weekLater = new Date(today)
    weekLater.setDate(today.getDate() + 7)
    
    setFormData({
      book_id: '',
      member_id: '',
      borrow_date: today.toISOString().split('T')[0],
      due_date: weekLater.toISOString().split('T')[0]
    })
  }

  const closeAddModal = () => {
    setShowAddModal(false)
    setFormData({
      book_id: '',
      member_id: '',
      borrow_date: '',
      due_date: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitBorrowing = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/borrowings", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      // Refresh borrowings list
      const params = {
        page: currentPage,
        limit: borrowingsPerPage,
        search: searchTerm,
        status: statusFilter
      }
      
      const res = await axios.get("/borrowings", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      })
      
      const responseData = res.data?.data
      if (responseData) {
        setBorrowings(responseData.borrowings || [])
        setTotalBorrowings(responseData.total || 0)
      }
      
      closeAddModal()
      alert('Peminjaman berhasil ditambahkan!')
    } catch (error) {
      console.error("Error creating borrowing:", error)
      const errorMessage = error.response?.data?.message || 'Gagal menambahkan peminjaman'
      alert(errorMessage)
    } finally {
      setFormLoading(false)
    }
  }

  const formatStatus = (status) => {
    switch(status) {
      case 'antri': return 'Antri'
      case 'dipinjam': return 'Dipinjam'
      case 'dikembalikan': return 'Dikembalikan'
      case 'dibatalkan': return 'Dibatalkan'
      default: return status
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    try {
      return new Date(dateString).toLocaleDateString('id-ID')
    } catch (error) {
      return '-'
    }
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
    { icon: BarChart3, label: "Dashboard", path: "/admin" },
    { icon: BookOpen, label: "Data Buku", path: "/admin/books" },
    { icon: Users, label: "Data Anggota", path: "/admin/member" },
    { icon: Download, label: "Data Peminjaman", path: "/admin/borrowing" },
    { icon: FileText, label: "Laporan", path: "/admin/report" },
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
              <span className="text-white font-bold text-sm lg:text-lg sm:hidden">
                UNPER - SIP
              </span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-800 rounded-lg px-2 lg:px-3 py-2 transition-colors"
              >
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                </div>
              </button>
              
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <a href="#" onClick={handleProfileClick} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                      navigate('/login');
                    }} 
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 lg:pt-20">
        {/* Desktop Sidebar */}
        <div className={`hidden lg:block fixed left-0 top-16 lg:top-20 ${sidebarCollapsed ? 'w-20' : 'w-64'} h-full bg-white shadow-lg border-r border-gray-200 z-40 transition-all duration-300`}>
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
        </div>

        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed inset-0 z-40 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg pt-20">
            <div className="p-6">
              {/* Profile Section */}
              <div className="text-center mb-8">
                <div 
                  className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer"
                  onClick={() => handleMobileNavigation('/admin/profile')}
                >
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="font-semibold text-gray-800 mb-1 cursor-pointer hover:text-emerald-600"
                  onClick={() => handleMobileNavigation('/admin/profile')}
                >
                  Miku Nakano
                </h3>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  Administrator
                </span>
              </div>

              {/* Navigation */}
              <nav>
                <ul className="space-y-2">
                  {navigationItems.map((item, index) => {
                    const isActive = location.pathname === item.path
                    return (
                      <li key={index}>
                        <Link 
                          to={item.path}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            isActive 
                              ? 'text-gray-700 bg-emerald-50 border-r-4 border-emerald-500' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                                                    <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : ""}`} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} transition-all duration-300`}>
          <div className="p-4 lg:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Data Peminjaman</h1>
                <p className="text-gray-600">Kelola data peminjaman buku perpustakaan</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={openAddModal}
                  className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tambah Peminjaman</span>
                </button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari berdasarkan judul buku atau nama anggota..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>
                <div className="w-full md:w-48">
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value)
                      setCurrentPage(1)
                    }}
                  >
                    <option value="">Semua Status</option>
                    <option value="antri">Antri</option>
                    <option value="dipinjam">Dipinjam</option>
                    <option value="dikembalikan">Dikembalikan</option>
                    <option value="dibatalkan">Dibatalkan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Borrowing Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {currentBorrowings.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
                    <BookOpen className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Tidak ada data peminjaman</h3>
                  <p className="text-gray-500">Tidak ditemukan data peminjaman yang sesuai dengan kriteria Anda</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Judul Buku
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Anggota
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tanggal Pinjam
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tenggat Kembali
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentBorrowings.map((borrowing, index) => (
                          <tr key={borrowing.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {(currentPage - 1) * borrowingsPerPage + index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{borrowing.book_title || '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{borrowing.member_name || '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(borrowing.borrow_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(borrowing.due_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                borrowing.status === 'dipinjam' ? 'bg-blue-100 text-blue-800' :
                                borrowing.status === 'dikembalikan' ? 'bg-green-100 text-green-800' :
                                borrowing.status === 'dibatalkan' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {formatStatus(borrowing.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => openDetailModal(borrowing)}
                                  className="text-emerald-600 hover:text-emerald-900"
                                  title="Detail"
                                >
                                  <Eye className="w-5 h-5" />
                                </button>
                                {borrowing.status === 'antri' && (
                                  <>
                                    <button
                                      onClick={() => handleStatusUpdate(borrowing.id, 'dipinjam')}
                                      className="text-blue-600 hover:text-blue-900"
                                      title="Setujui"
                                    >
                                      <TrendingUp className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={() => handleStatusUpdate(borrowing.id, 'dibatalkan')}
                                      className="text-red-600 hover:text-red-900"
                                      title="Tolak"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </>
                                )}
                                {borrowing.status === 'dipinjam' && (
                                  <button
                                    onClick={() => handleStatusUpdate(borrowing.id, 'dikembalikan')}
                                    className="text-green-600 hover:text-green-900"
                                    title="Kembalikan"
                                  >
                                    <Download className="w-5 h-5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteBorrowing(borrowing.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                          currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                          currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Menampilkan <span className="font-medium">{(currentPage - 1) * borrowingsPerPage + 1}</span> sampai{' '}
                          <span className="font-medium">{Math.min(currentPage * borrowingsPerPage, totalBorrowings)}</span> dari{' '}
                          <span className="font-medium">{totalBorrowings}</span> hasil
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                currentPage === page 
                                  ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600' 
                                  : 'bg-white text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedBorrowing && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowDetailModal(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Detail Peminjaman
                    </h3>
                    <div className="mt-2 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Judul Buku</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedBorrowing.book_title || '-'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Nama Anggota</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedBorrowing.member_name || '-'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Tanggal Pinjam</h4>
                        <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBorrowing.borrow_date)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Tenggat Kembali</h4>
                        <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBorrowing.due_date)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Tanggal Kembali</h4>
                        <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBorrowing.return_date) || '-'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Status</h4>
                        <p className="mt-1 text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedBorrowing.status === 'dipinjam' ? 'bg-blue-100 text-blue-800' :
                            selectedBorrowing.status === 'dikembalikan' ? 'bg-green-100 text-green-800' :
                            selectedBorrowing.status === 'dibatalkan' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {formatStatus(selectedBorrowing.status)}
                          </span>
                        </p>
                      </div>
                      {selectedBorrowing.notes && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Catatan</h4>
                          <p className="mt-1 text-sm text-gray-900">{selectedBorrowing.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDetailModal(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Borrowing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeAddModal}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Tambah Peminjaman Baru
                    </h3>
                    <form onSubmit={handleSubmitBorrowing}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="book_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Buku
                          </label>
                          <select
                            id="book_id"
                            name="book_id"
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            value={formData.book_id}
                            onChange={handleInputChange}
                          >
                            <option value="">Pilih Buku</option>
                            {books.map(book => (
                              <option key={book.id} value={book.id}>
                                {book.title} - {book.author} (Stok: {book.stock})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="member_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Anggota
                          </label>
                          <select
                            id="member_id"
                            name="member_id"
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            value={formData.member_id}
                            onChange={handleInputChange}
                          >
                            <option value="">Pilih Anggota</option>
                            {members.map(member => (
                              <option key={member.id} value={member.id}>
                                {member.name} - {member.email}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="borrow_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Tanggal Pinjam
                          </label>
                          <input
                            type="date"
                            id="borrow_date"
                            name="borrow_date"
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            value={formData.borrow_date}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Tenggat Kembali
                          </label>
                          <input
                            type="date"
                            id="due_date"
                            name="due_date"
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            value={formData.due_date}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          disabled={formLoading}
                          className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:col-start-2 sm:text-sm ${
                            formLoading ? 'opacity-75 cursor-not-allowed' : ''
                          }`}
                        >
                          {formLoading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                        <button
                          type="button"
                          onClick={closeAddModal}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
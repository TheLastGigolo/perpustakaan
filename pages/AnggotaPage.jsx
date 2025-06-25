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

export default function AnggotaPage() {
  const location = useLocation()
  const currentPath = location.pathname
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [membersPerPage] = useState(10)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    join_date: ''
  })

  // Form validation
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const token = localStorage.getItem("token")
        
        if (!token) {
          throw new Error("Token tidak ditemukan")
        }

        const res = await axios.get("/admin/members", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        setMembers(res.data?.data || [])
      } catch (error) {
        console.error("Error fetching members:", error)
        setError("Gagal memuat data anggota")
        
        // Fallback data for development/testing
        setMembers([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@email.com",
            phone: "081234567890",
            address: "Jl. Contoh No. 123, Jakarta",
            join_date: "2024-01-15",
            borrowed_books: 3,
            status: "active"
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@email.com",
            phone: "081234567891",
            address: "Jl. Sample No. 456, Bandung",
            join_date: "2024-02-20",
            borrowed_books: 1,
            status: "active"
          },
          {
            id: 3,
            name: "Bob Johnson",
            email: "bob.johnson@email.com",
            phone: "081234567892",
            address: "Jl. Example No. 789, Surabaya",
            join_date: "2024-03-10",
            borrowed_books: 0,
            status: "inactive"
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }
    fetchMembers()
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

  // Validate form
  const validateForm = (data) => {
    const errors = {}
    
    if (!data.name.trim()) {
      errors.name = "Nama wajib diisi"
    }
    
    if (!data.email.trim()) {
      errors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Format email tidak valid"
    }
    
    if (!data.phone.trim()) {
      errors.phone = "Nomor telepon wajib diisi"
    } else if (!/^[0-9+\-\s]+$/.test(data.phone)) {
      errors.phone = "Nomor telepon hanya boleh berisi angka, +, -, dan spasi"
    }
    
    if (!data.address.trim()) {
      errors.address = "Alamat wajib diisi"
    }
    
    if (!data.join_date) {
      errors.join_date = "Tanggal bergabung wajib diisi"
    }
    
    return errors
  }

  // Filter members based on search term - FIXED: Added missing closing parenthesis
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  )
  
  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage
  const indexOfFirstMember = indexOfLastMember - membersPerPage
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember)
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage)

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleAddMember = async (e) => {
    e.preventDefault()
    
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    setFormErrors({})
    
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post("/admin/members", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setMembers([...members, res.data.data])
      setShowAddModal(false)
      resetForm()
      
      // Show success message (you can implement toast notification here)
      alert("Anggota berhasil ditambahkan")
    } catch (error) {
      console.error("Error adding member:", error)
      
      // Fallback for development/testing
      const newMember = {
        id: Date.now(),
        ...formData,
        borrowed_books: 0,
        status: 'active'
      }
      setMembers([...members, newMember])
      setShowAddModal(false)
      resetForm()
      alert("Anggota berhasil ditambahkan (mode offline)")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditMember = async (e) => {
    e.preventDefault()
    
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    setFormErrors({})
    
    try {
      const token = localStorage.getItem("token")
      const res = await axios.put(`/admin/members/${selectedMember.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setMembers(members.map(member => 
        member.id === selectedMember.id ? res.data.data : member
      ))
      setShowEditModal(false)
      resetForm()
      
      alert("Anggota berhasil diperbarui")
    } catch (error) {
      console.error("Error updating member:", error)
      
      // Fallback for development/testing
      setMembers(members.map(member => 
        member.id === selectedMember.id ? { ...member, ...formData } : member
      ))
      setShowEditModal(false)
      resetForm()
      alert("Anggota berhasil diperbarui (mode offline)")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      return
    }
    
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`/admin/members/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setMembers(members.filter(member => member.id !== id))
      alert("Anggota berhasil dihapus")
    } catch (error) {
      console.error("Error deleting member:", error)
      
      // Fallback for development/testing
      setMembers(members.filter(member => member.id !== id))
      alert("Anggota berhasil dihapus (mode offline)")
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', address: '', join_date: '' })
    setFormErrors({})
    setSelectedMember(null)
  }

  const openEditModal = (member) => {
    setSelectedMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      join_date: member.join_date
    })
    setFormErrors({})
    setShowEditModal(true)
  }

  const openDetailModal = (member) => {
    setSelectedMember(member)
    setShowDetailModal(true)
  }

  const closeAllModals = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setShowDetailModal(false)
    resetForm()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat data anggota...</p>
        </div>
      </div>
    )
  }

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin", active: currentPath === "/admin" },
    { icon: BookOpen, label: "Data Buku", path: "/admin/books", active: currentPath === "/admin/books" },
    { icon: Users, label: "Data Anggota", path: "/admin/members", active: currentPath === "/admin/members" },
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
                  <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
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
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Miku Nakano</h3>
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
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : ''}`} />
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
      <div className={`flex-1 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} transition-all duration-300 p-4 lg:p-8`}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Data Anggota</h1>
            <p className="text-gray-600 text-sm lg:text-base">Kelola data anggota perpustakaan</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Anggota</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari anggota..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-red-500">
              {error}
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Tidak ada data anggota yang ditemukan
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Telepon
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bergabung
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.borrowed_books} buku dipinjam</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            member.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {member.status === 'active' ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(member.join_date).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openDetailModal(member)}
                              className="text-emerald-600 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-50"
                              title="Detail"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(member)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
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
              {filteredMembers.length > membersPerPage && (
                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Menampilkan <span className="font-medium">{indexOfFirstMember + 1}</span> -{' '}
                        <span className="font-medium">{Math.min(indexOfLastMember, filteredMembers.length)}</span> dari{' '}
                        <span className="font-medium">{filteredMembers.length}</span> anggota
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>

    {/* Add Member Modal */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tambah Anggota Baru</h3>
              <button
                onClick={closeAllModals}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddMember}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="join_date" className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Bergabung <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="join_date"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.join_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.join_date}
                    onChange={(e) => setFormData({...formData, join_date: e.target.value})}
                  />
                  {formErrors.join_date && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.join_date}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan...
                    </>
                  ) : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}

    {/* Edit Member Modal */}
    {showEditModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Data Anggota</h3>
              <button
                onClick={closeAllModals}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditMember}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="edit-email"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="edit-phone"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-address" className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="edit-address"
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-join_date" className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Bergabung <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="edit-join_date"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.join_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.join_date}
                    onChange={(e) => setFormData({...formData, join_date: e.target.value})}
                  />
                  {formErrors.join_date && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.join_date}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan...
                    </>
                  ) : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}

    {/* Member Detail Modal */}
    {showDetailModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Detail Anggota</h3>
              <button
                onClick={closeAllModals}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {selectedMember && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{selectedMember.name}</h4>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedMember.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedMember.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dl className="space-y-4">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedMember.email}
                      </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Telepon</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedMember.phone}
                      </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedMember.address}
                      </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Bergabung</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(selectedMember.join_date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Buku Dipinjam</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedMember.borrowed_books}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={closeAllModals}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}

    {/* Click outside handler for dropdown */}
    {showProfileDropdown && (
      <div
        className="fixed inset-0 z-30"
        onClick={() => setShowProfileDropdown(false)}
      />
    )}
  </div>
)
}
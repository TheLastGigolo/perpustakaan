import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { logout } from "../services/auth"

// Import all icons from AdminDashboard
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

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export default function LaporanPage() {
  const location = useLocation()
  const currentPath = location.pathname
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [currentFilter, setCurrentFilter] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")

  const reportData = [
    {
      id: 1,
      bookTitle: "Menjadi Teknisi Komputer Profesional",
      borrowerName: "Rafly Rachman",
      borrowDate: "2022-10-26",
      returnDate: "2022-10-29",
      status: "returned",
      isLate: true
    },
    {
      id: 2,
      bookTitle: "Pemrograman Web Modern",
      borrowerName: "Ahmad Fauzi",
      borrowDate: "2023-05-15",
      returnDate: "2023-05-18",
      status: "returned",
      isLate: false
    },
    {
      id: 3,
      bookTitle: "Database Management Systems",
      borrowerName: "Siti Nurhaliza",
      borrowDate: "2023-06-01",
      returnDate: null,
      status: "borrowed",
      isLate: false
    }
  ]

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

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID")
  }

  const getStatusBadge = (status, isLate) => {
    if (status === "borrowed") {
      return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Belum Kembali</span>
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {isLate && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Terlambat
          </span>
        )}
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Sudah Kembali
        </span>
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

  const filterOptions = [
    { label: "Hari Ini", value: "today" },
    { label: "Minggu Ini", value: "week" },
    { label: "Bulan Ini", value: "month" },
    { label: "Semua", value: "all" }
  ]

  const filteredReports = reportData.filter(report => {
    const matchesSearch = report.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.borrowerName.toLowerCase().includes(searchQuery.toLowerCase())
    
    // For now, just return all that match search since we don't have date filtering logic
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar - Same as AdminDashboard */}
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
                      e.preventDefault()
                      logout()
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
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Data Laporan</h1>
            <p className="text-gray-600 text-sm lg:text-base">Halaman ini menampilkan daftar laporan peminjaman buku</p>
          </div>

          {/* Filter and Search Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 min-w-[120px]"
                type="button"
              >
                Filter: {currentFilter}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              
              {showFilterDropdown && (
                <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg w-48 border border-gray-200">
                  <ul className="p-2 space-y-1 text-sm text-gray-700">
                    {filterOptions.map((option) => (
                      <li key={option.value}>
                        <button
                          onClick={() => {
                            setCurrentFilter(option.label)
                            setShowFilterDropdown(false)
                          }}
                          className="flex items-center w-full p-2 rounded hover:bg-gray-100 text-left"
                        >
                          <input 
                            type="radio" 
                            name="filter" 
                            checked={currentFilter === option.label}
                            onChange={() => {}}
                            className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 mr-2" 
                          />
                          <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5"
                placeholder="Cari laporan..."
              />
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">No</th>
                    <th scope="col" className="px-6 py-3">Judul Buku</th>
                    <th scope="col" className="px-6 py-3">Nama Peminjam</th>
                    <th scope="col" className="px-6 py-3">Tanggal Pinjam</th>
                    <th scope="col" className="px-6 py-3">Tanggal Pengembalian</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{report.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{report.bookTitle}</td>
                        <td className="px-6 py-4">{report.borrowerName}</td>
                        <td className="px-6 py-4 font-semibold">{formatDate(report.borrowDate)}</td>
                        <td className="px-6 py-4">{formatDate(report.returnDate)}</td>
                        <td className="px-6 py-4">
                          {getStatusBadge(report.status, report.isLate)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <FileText className="w-12 h-12 text-gray-400 mb-3" />
                          <p>Tidak ada data laporan yang ditemukan</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside handlers for dropdowns */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
      
      {showFilterDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowFilterDropdown(false)}
        />
      )}
    </div>
  )
}
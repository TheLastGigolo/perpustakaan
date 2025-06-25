import { useEffect, useState } from "react"
import axios from "../services/api"
import {logout} from "../services/auth"
import { Link, useLocation } from "react-router-dom"
import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

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

const PieChart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

export default function AdminDashboard() {
  const location = useLocation()
  const currentPath = location.pathname
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        // Temporary: Using fetch instead of axios to avoid import error
        const res = await axios.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setData(res.data.data)
        
        // Original axios code (uncomment when ../services/api is fixed):
        // const res = await axios.get("/admin/dashboard", {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // })
        // setData(res.data.data)
      } catch (error) {
        console.error("Error fetching data:", error)
        // Mock data for demo
        setData({
          total_members: 150,
          total_books: 1250,
          borrowed_books: 89,
          queued_borrows: 12,
          popular_books: [
            { id: 1, title: "Pemrograman Web Modern", author: "John Doe", score: 95 },
            { id: 2, title: "Algoritma dan Struktur Data", author: "Jane Smith", score: 87 },
            { id: 3, title: "Database Management Systems", author: "Robert Johnson", score: 82 }
          ]
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  const availableBooks = data.total_books - data.borrowed_books - data.queued_borrows

  const pieData = {
    labels: ["Buku Dipinjam", "Buku Antri", "Buku Tersedia"],
    datasets: [{
      label: "Distribusi Buku",
      data: [data.borrowed_books, data.queued_borrows, availableBooks],
      backgroundColor: [
        "#f59e0b", // amber-500
        "#ef4444", // red-500  
        "#10b981"  // emerald-500
      ],
      borderColor: [
        "#d97706", // amber-600
        "#dc2626", // red-600
        "#059669"  // emerald-600
      ],
      borderWidth: 2,
      hoverBackgroundColor: [
        "#fbbf24", // amber-400
        "#f87171", // red-400
        "#34d399"  // emerald-400
      ],
      hoverBorderWidth: 3
    }]
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.2,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            weight: '500'
          },
          color: '#374151'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#6b7280',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} buku (${percentage}%)`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2
      }
    },
    interaction: {
      intersect: false
    }
  }

  const StatCard = ({ title, value, icon: Icon, color, bgColor, hoverColor }) => (
    <div className={`${bgColor} rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">{title}</p>
          <p className={`text-xl lg:text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`p-2 lg:p-3 rounded-lg ${hoverColor}`}>
          <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${color}`} />
        </div>
      </div>
    </div>
  )

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin", active: currentPath === "/admin" },
    { icon: BookOpen, label: "Data Buku", path: "/admin/books", active: currentPath === "/admin/books" },
    { icon: Users, label: "Data Anggota", path: "/admin/member", active: currentPath === "/admin/member" },
    { icon: Download, label: "Data Peminjaman", path: "/admin/borrowing", active: currentPath === "/admin/borrowing" },
    { icon: FileText, label: "Laporan",path: "/admin/report", active: currentPath === "/admin/report" },
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
                  <a href="#"  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
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
                  {navigationItems.map((item, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                          item.active 
                            ? 'text-gray-700 bg-emerald-50 border-r-4 border-emerald-500' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className={`w-5 h-5 ${item.active ? 'text-emerald-600' : ''}`} />
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} transition-all duration-300 p-4 lg:p-8`}>
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600 text-sm lg:text-base">Selamat datang di sistem informasi perpustakaan</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
            <StatCard
              title="Data Anggota"
              value={data?.total_members || 0}
              icon={Users}
              color="text-blue-600"
              bgColor="bg-white"
              hoverColor="bg-blue-50"
            />
            <StatCard
              title="Data Buku"
              value={data?.total_books || 0}
              icon={BookOpen}
              color="text-emerald-600"
              bgColor="bg-white"
              hoverColor="bg-emerald-50"
            />
            <StatCard
              title="Buku Dipinjam"
              value={data?.borrowed_books || 0}
              icon={Download}
              color="text-amber-600"
              bgColor="bg-white"
              hoverColor="bg-amber-50"
            />
            <StatCard
              title="Antrian"
              value={data?.queued_borrows || 0}
              icon={Clock}
              color="text-red-600"
              bgColor="bg-white"
              hoverColor="bg-red-50"
            />
          </div>

          {/* Charts and Popular Books Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {/* Pie Chart Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <PieChart className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Distribusi Buku</h2>
                  <p className="text-sm text-gray-600">Status peminjaman buku</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full max-w-sm mx-auto">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>

              {/* Summary Stats */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm font-medium text-gray-800">{data?.borrowed_books || 0}</p>
                    <p className="text-xs text-gray-600">Dipinjam</p>
                  </div>
                  <div>
                    <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm font-medium text-gray-800">{data?.queued_borrows || 0}</p>
                    <p className="text-xs text-gray-600">Antri</p>
                  </div>
                  <div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm font-medium text-gray-800">{availableBooks}</p>
                    <p className="text-xs text-gray-600">Tersedia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Books Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Buku Populer</h2>
                  <p className="text-sm text-gray-600">Berdasarkan tingkat peminjaman</p>
                </div>
              </div>
              
              {data?.popular_books && data.popular_books.length > 0 ? (
                <div className="space-y-4">
                  {data.popular_books.map((book, index) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm lg:text-lg">#{index + 1}</span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm lg:text-base truncate">{book.title}</h3>
                          <p className="text-gray-600 text-xs lg:text-sm truncate">oleh {book.author}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-600 text-sm lg:text-base">{book.score}</span>
                        </div>
                        <p className="text-xs text-gray-500">skor</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Belum ada data buku populer</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
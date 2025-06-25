import { useEffect, useState } from "react"
import axios from "../services/api"
import {logout} from "../services/auth"
import { Link, useLocation } from "react-router-dom"

// Icons (same as AdminDashboard)
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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const Edit = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const Trash = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const Upload = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
)

export default function BookPage() {
  const location = useLocation()
  const currentPath = location.pathname
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  // Form state - aligned with backend API structure
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    publisher: "",
    publication_year: "",
    stock: "",
    cover_url: "",
    categories: []
  })

  useEffect(() => {
    fetchBooks()
    fetchFilterOptions()
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

  const fetchBooks = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token")
      
      const params = {}
      if (searchTerm) params.search = searchTerm
      if (filterCategory) params.category = filterCategory
      
      const response = await axios.get("/api/books", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      })
      
      if (response.data.success) {
        setBooks(response.data.data.books || [])
      } else {
        setError("Failed to fetch books")
      }
    } catch (error) {
      console.error("Error fetching books:", error)
      setError("Error fetching books: " + (error.response?.data?.message || error.message))
    } finally {
      setIsLoading(false)
    }
  }

  const fetchFilterOptions = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("/api/books/filters", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        setCategories(response.data.data.filters.categories || [])
      }
    } catch (error) {
      console.error("Error fetching filter options:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "categories") {
      // Handle multiple categories
      const selectedCategories = Array.from(e.target.selectedOptions, option => option.value)
      setFormData(prev => ({ ...prev, [name]: selectedCategories }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddBook = async (e) => {
    e.preventDefault()
    try {
      setError("")
      setSuccess("")
      
      const token = localStorage.getItem("token")
      
      // Prepare data for API
      const bookData = {
        ...formData,
        publication_year: parseInt(formData.publication_year),
        stock: parseInt(formData.stock),
        categories: formData.categories.join(',') // Convert array to comma-separated string
      }
      
      const response = await axios.post("/api/books", bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.data.success) {
        setSuccess("Book added successfully!")
        setShowAddModal(false)
        setFormData({
          title: "",
          author: "",
          description: "",
          isbn: "",
          publisher: "",
          publication_year: "",
          stock: "",
          cover_url: "",
          categories: []
        })
        fetchBooks()
      } else {
        setError("Failed to add book: " + response.data.message)
      }
    } catch (error) {
      console.error("Error adding book:", error)
      setError("Error adding book: " + (error.response?.data?.message || error.message))
    }
  }

  const handleEditBook = async (e) => {
    e.preventDefault()
    try {
      setError("")
      setSuccess("")
      
      const token = localStorage.getItem("token")
      
      // Prepare data for API
      const bookData = {
        ...formData,
        publication_year: parseInt(formData.publication_year),
        stock: parseInt(formData.stock),
        categories: formData.categories.join(',') // Convert array to comma-separated string
      }
      
      const response = await axios.put(`/api/books/${selectedBook.id}`, bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.data.success) {
        setSuccess("Book updated successfully!")
        setShowEditModal(false)
        setSelectedBook(null)
        fetchBooks()
      } else {
        setError("Failed to update book: " + response.data.message)
      }
    } catch (error) {
      console.error("Error updating book:", error)
      setError("Error updating book: " + (error.response?.data?.message || error.message))
    }
  }

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setError("")
        setSuccess("")
        
        const token = localStorage.getItem("token")
        const response = await axios.delete(`/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data.success) {
          setSuccess("Book deleted successfully!")
          fetchBooks()
        } else {
          setError("Failed to delete book: " + response.data.message)
        }
      } catch (error) {
        console.error("Error deleting book:", error)
        setError("Error deleting book: " + (error.response?.data?.message || error.message))
      }
    }
  }

  const openEditModal = (book) => {
    setSelectedBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description || "",
      isbn: book.isbn,
      publisher: book.publisher,
      publication_year: book.publication_year.toString(),
      stock: book.stock.toString(),
      cover_url: book.cover_url || "",
      categories: book.categories || []
    })
    setShowEditModal(true)
  }

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin", active: currentPath === "/admin" },
    { icon: BookOpen, label: "Data Buku", path: "/admin/books", active: currentPath === "/admin/books" },
    { icon: Users, label: "Data Anggota", path: "/admin/member", active: currentPath === "/admin/member" },
    { icon: Download, label: "Data Peminjaman", path: "/admin/borrowing", active: currentPath === "/admin/borrowing" },
    { icon: FileText, label: "Laporan", path: "/admin/report", active: currentPath === "/admin/report" },
  ]

  // Effect to search books when searchTerm or filterCategory changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks()
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, filterCategory])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading books...</p>
        </div>
      </div>
    )
  }

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
                  {navigationItems.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                          location.pathname === item.path
                            ? 'text-gray-700 bg-emerald-50 border-r-4 border-emerald-500' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-emerald-600' : ''}`} />
                        <span>{item.label}</span>
                      </Link>
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Data Buku</h1>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Add Book Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Book</span>
            </button>

            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Search Box */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for books"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          {/* Books Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
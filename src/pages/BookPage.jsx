import { useEffect, useState, useCallback } from "react";
import axios from "../services/api";
import { logout } from "../services/auth";
import { Link, useLocation } from "react-router-dom";
import { debounce } from "lodash";

// Icons
const BarChart3 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12v4m4-8v8m4-4v4" />
  </svg>
);

const BookOpen = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LogOut = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const FileText = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Menu = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeft = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Edit = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Trash = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Upload = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

// Komponen Checkbox Group untuk Kategori
const CategoryCheckboxGroup = ({ 
  categories, 
  selectedCategories, 
  onCategoryChange,
  error
}) => {
  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newCategories.join(', '));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-1">
        {categories.map((category) => (
          <label 
            key={category} 
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
              selectedCategories.includes(category)
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
              className="hidden"
            />
            {category}
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default function BookPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterOptions, setFilterOptions] = useState({ categories: [] });
  const [pagination, setPagination] = useState({
    total: 0,
    total_pages: 0,
    current_page: 1,
    per_page: 10,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    publisher: "",
    publication_year: "",
    pages: "",
    stock: "",
    cover_url: "",
    categories: "",
    is_active: true,
  });

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  // Debounce search term
  const debouncedFetchBooks = useCallback(
    debounce(() => fetchBooks(), 500),
    []
  );

  useEffect(() => {
    fetchBooks();
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    debouncedFetchBooks();
    return () => debouncedFetchBooks.cancel();
  }, [searchTerm, filterCategory, pagination.current_page]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("/admin/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: pagination.current_page,
          limit: pagination.per_page,
          ...(searchTerm && { search: searchTerm }),
          ...(filterCategory && { category: filterCategory }),
        },
      });

      if (response.data?.message?.books) {
        setBooks(response.data.message.books);
        setPagination({
          total: response.data.message.pagination?.total || 0,
          total_pages: response.data.message.pagination?.total_pages || 1,
          current_page: response.data.message.pagination?.current_page || 1,
          per_page: response.data.message.pagination?.per_page || 10,
        });
      } else {
        throw new Error(response.data?.message || "Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(
        error.response?.data?.message || error.message || "Failed to fetch books"
      );
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/admin/books/filters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.filters) {
        setFilterOptions(response.data.filters);
      } else {
        throw new Error("Invalid filter options format");
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
      setFilterOptions({
        categories: ["Teknologi", "Pendidikan", "Fiksi", "Non-Fiksi", "Sejarah", "Sains"],
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Judul buku wajib diisi";
    if (!formData.author.trim()) errors.author = "Penulis wajib diisi";
    if (!formData.isbn.trim()) errors.isbn = "ISBN wajib diisi";
    if (!formData.publisher.trim()) errors.publisher = "Penerbit wajib diisi";
    if (!formData.publication_year) errors.publication_year = "Tahun terbit wajib diisi";
    if (formData.stock === "" || formData.stock < 0) errors.stock = "Stok tidak valid";
    
    // Validasi untuk file upload (hanya pada form tambah)
    if (showAddModal && !coverFile && !coverPreview) {
      errors.cover_file = "Cover buku wajib diisi";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "cover_file") {
      if (files && files[0]) {
        const file = files[0];
        if (!file.type.match("image.*")) {
          setFormErrors({ ...formErrors, cover_file: "File harus berupa gambar" });
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          setFormErrors({ ...formErrors, cover_file: "Ukuran file maksimal 2MB" });
          return;
        }
        
        setCoverFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setFormErrors({ ...formErrors, cover_file: null });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (formErrors[name]) {
        setFormErrors({ ...formErrors, [name]: null });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      isbn: "",
      publisher: "",
      publication_year: "",
      pages: "",
      stock: "",
      cover_url: "",
      categories: "",
      is_active: true,
    });
    setCoverFile(null);
    setCoverPreview("");
    setFormErrors({});
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");
  
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('author', formData.author.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('isbn', formData.isbn.trim());
      formDataToSend.append('publisher', formData.publisher.trim());
      formDataToSend.append('publication_year', formData.publication_year);
      formDataToSend.append('pages', formData.pages || '');
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('categories', formData.categories);
      formDataToSend.append('is_active', formData.is_active);
      
      if (coverFile) {
        formDataToSend.append('cover_file', coverFile);
      }
  
      const response = await axios.post("/admin/books", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data?.book || response.data?.message) {
        setSuccess("Buku berhasil ditambahkan!");
        setShowAddModal(false);
        resetForm();
        fetchBooks();
      } else {
        throw new Error(response.data?.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      setError(error.response?.data?.message || error.message || "Gagal menambahkan buku");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBook = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('author', formData.author.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('isbn', formData.isbn.trim());
      formDataToSend.append('publisher', formData.publisher.trim());
      formDataToSend.append('publication_year', formData.publication_year);
      formDataToSend.append('pages', formData.pages || '');
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('categories', formData.categories);
      formDataToSend.append('is_active', formData.is_active);
      
      if (coverFile) {
        formDataToSend.append('cover_file', coverFile);
      } else if (!coverPreview && formData.cover_url) {
        formDataToSend.append('cover_url', formData.cover_url);
      }

      const response = await axios.put(`/admin/books/${selectedBook.id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.book || response.data?.message) {
        setSuccess("Buku berhasil diperbarui!");
        setShowEditModal(false);
        setSelectedBook(null);
        resetForm();
        fetchBooks();
      } else {
        throw new Error(response.data?.message || "Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      setError(error.response?.data?.message || "Gagal memperbarui buku");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        setIsSubmitting(true);
        setError("");
        setSuccess("");
        const token = localStorage.getItem("token");

        const response = await axios.delete(`/admin/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.message) {
          setSuccess("Buku berhasil dihapus!");
          fetchBooks();
        } else {
          throw new Error(response.data?.message || "Failed to delete book");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        setError(error.response?.data?.message || "Gagal menghapus buku");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      description: book.description || "",
      isbn: book.isbn || "",
      publisher: book.publisher || "",
      publication_year: book.publication_year || "",
      pages: book.pages || "",
      stock: book.stock || "",
      cover_url: book.cover_url || "",
      categories: Array.isArray(book.categories) ? book.categories.join(', ') : (book.categories || ""),
      is_active: book.is_active !== undefined ? book.is_active : true,
    });
    setCoverFile(null);
    setCoverPreview(book.cover_url || "");
    setShowEditModal(true);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current_page: newPage }));
  };

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin" },
    { icon: BookOpen, label: "Data Buku", path: "/admin/books" },
    { icon: Users, label: "Data Anggota", path: "/admin/member" },
    { icon: Download, label: "Data Peminjaman", path: "/admin/borrowing" },
    { icon: FileText, label: "Laporan", path: "/admin/report" },
  ];

  if (isLoading && books.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat data buku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Error/Success Messages */}
      {error && (
        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 flex items-center">
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-4 text-red-700 hover:text-red-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      {success && (
        <div className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 flex items-center">
          <span>{success}</span>
          <button
            onClick={() => setSuccess("")}
            className="ml-4 text-green-700 hover:text-green-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

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
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Desktop Sidebar Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 text-white hover:bg-emerald-600 rounded-lg transition-colors"
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
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
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
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
          <div className={`${sidebarCollapsed ? 'p-2' : 'p-4 lg:p-6'}`}>
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
              <div className="text-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
              </div>
            )}

            {/* Navigation */}
            <nav>
              <ul className="space-y-1">
                {navigationItems.map((item, index) => {
                  const isActive = location.pathname === item.path
                  return (
                    <li key={index}>
                      <Link 
                        to={item.path}
                        className={`
                          flex items-center relative group
                          ${sidebarCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3"}
                          rounded-lg font-medium transition-all duration-200
                          ${isActive 
                            ? "text-emerald-700 bg-emerald-50 border-r-4 border-emerald-500" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                        `}
                      >
                        <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-emerald-600" : ""}`} />
                        {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                        
                        {/* Tooltip for collapsed sidebar */}
                        {sidebarCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                            {item.label}
                            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        )}
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
                <h3 className="font-semibold text-gray-800 mb-1">
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
                              ? 'text-emerald-700 bg-emerald-50 border-r-4 border-emerald-500' 
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
        <div
          className={`flex-1 ${
            sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
          } transition-all duration-300`}
        >
          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Data Buku
              </h1>
              <p className="text-gray-600">
                Kelola data buku perpustakaan
              </p>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Cari buku..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Semua Kategori</option>
                    {filterOptions.categories?.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Add Button */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Buku
                </button>
              </div>
            </div>

            {/* Books Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="p-8 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Buku
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penulis
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ISBN
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penerbit
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tahun
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stok
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {books.length > 0 ? (
                          books.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    {book.cover_url ? (
                                      <img
                                        className="h-10 w-10 rounded object-cover"
                                        src={book.cover_url}
                                        alt={book.title}
                                        onError={(e) => {
                                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23f3f4f6"/><text x="20" y="20" font-family="Arial" font-size="12" fill="%236b7280" text-anchor="middle" dy="0.3em">📚</text></svg>';
                                        }}
                                      />
                                    ) : (
                                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                                        <BookOpen className="h-5 w-5 text-gray-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {book.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {book.categories || 'No category'}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {book.author}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {book.isbn}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {book.publisher}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {book.publication_year}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  book.stock > 0 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {book.stock}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  book.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {book.is_active ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => openEditModal(book)}
                                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                                    title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBook(book.id)}
                                    className="text-red-600 hover:text-red-900 p-1 rounded"
                                    title="Delete"
                                  >
                                    <Trash className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                              {isLoading ? 'Loading...' : 'No books found'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  {pagination.total_pages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <button
                          onClick={() => handlePageChange(pagination.current_page - 1)}
                          disabled={pagination.current_page === 1}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => handlePageChange(pagination.current_page + 1)}
                          disabled={pagination.current_page === pagination.total_pages}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing{' '}
                            <span className="font-medium">
                              {(pagination.current_page - 1) * pagination.per_page + 1}
                            </span>{' '}
                            to{' '}
                            <span className="font-medium">
                              {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                            </span>{' '}
                            of{' '}
                            <span className="font-medium">{pagination.total}</span> results
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                              onClick={() => handlePageChange(pagination.current_page - 1)}
                              disabled={pagination.current_page === 1}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  page === pagination.current_page
                                    ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                            <button
                              onClick={() => handlePageChange(pagination.current_page + 1)}
                              disabled={pagination.current_page === pagination.total_pages}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ChevronRight className="h-5 w-5" />
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
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Tambah Buku Baru</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddBook} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Form fields */}
                  {Object.entries({
                    title: "Judul Buku *",
                    author: "Penulis *",
                    isbn: "ISBN *",
                    publisher: "Penerbit *",
                    publication_year: "Tahun Terbit *",
                    pages: "Jumlah Halaman",
                    stock: "Stok *",
                  }).map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                      </label>
                      <input
                        type={name === 'publication_year' || name === 'pages' || name === 'stock' ? 'number' : 'text'}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${
                          formErrors[name] ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                        required={label.endsWith('*')}
                        min={name === 'publication_year' ? 1000 : name === 'pages' || name === 'stock' ? 0 : undefined}
                        max={name === 'publication_year' ? new Date().getFullYear() : undefined}
                      />
                      {formErrors[name] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors[name]}</p>
                      )}
                    </div>
                  ))}
                  
                  {/* Kategori dengan Checkbox Group */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <CategoryCheckboxGroup
                      categories={filterOptions.categories || []}
                      selectedCategories={formData.categories ? formData.categories.split(', ') : []}
                      onCategoryChange={(value) => setFormData(prev => ({ ...prev, categories: value }))}
                      error={formErrors.categories}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Buku *
                  </label>
                  <input
                    type="file"
                    name="cover_file"
                    onChange={handleInputChange}
                    accept="image/*"
                    className={`w-full px-3 py-2 border ${
                      formErrors.cover_file ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    required
                  />
                  {formErrors.cover_file && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.cover_file}</p>
                  )}
                  {coverPreview && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Preview:</p>
                      <img 
                        src={coverPreview}
                        alt="Cover preview"
                        className="h-20 object-contain mt-1"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Aktif
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Memproses...' : 'Tambah Buku'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Edit Buku</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedBook(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleEditBook} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Form fields */}
                  {Object.entries({
                    title: "Judul Buku *",
                    author: "Penulis *",
                    isbn: "ISBN *",
                    publisher: "Penerbit *",
                    publication_year: "Tahun Terbit *",
                    pages: "Jumlah Halaman",
                    stock: "Stok *",
                  }).map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                      </label>
                      <input
                        type={name === 'publication_year' || name === 'pages' || name === 'stock' ? 'number' : 'text'}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${
                          formErrors[name] ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                        required={label.endsWith('*')}
                        min={name === 'publication_year' ? 1000 : name === 'pages' || name === 'stock' ? 0 : undefined}
                        max={name === 'publication_year' ? new Date().getFullYear() : undefined}
                      />
                      {formErrors[name] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors[name]}</p>
                      )}
                    </div>
                  ))}
                  
                  {/* Kategori dengan Checkbox Group */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <CategoryCheckboxGroup
                      categories={filterOptions.categories || []}
                      selectedCategories={formData.categories ? formData.categories.split(', ') : []}
                      onCategoryChange={(value) => setFormData(prev => ({ ...prev, categories: value }))}
                      error={formErrors.categories}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Buku
                  </label>
                  <div className="flex items-center gap-3">
                    {coverPreview ? (
                      <img 
                        src={coverPreview}
                        alt="Current cover"
                        className="h-20 w-14 object-cover rounded"
                      />
                    ) : (
                      <div className="h-20 w-14 bg-gray-200 rounded flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        name="cover_file"
                        onChange={handleInputChange}
                        accept="image/*"
                        className={`w-full px-3 py-2 border ${
                          formErrors.cover_file ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                      />
                      {formErrors.cover_file && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.cover_file}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Kosongkan jika tidak ingin mengubah cover
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Aktif
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedBook(null);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Memproses...' : 'Update Buku'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
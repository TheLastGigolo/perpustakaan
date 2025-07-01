// src/pages/LaporanPage.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";
import { logout } from "../services/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Loader = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Refresh = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export default function LaporanPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  // UI State
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showReportTypeDropdown, setShowReportTypeDropdown] = useState(false);
  
  // Data State
  const [reportData, setReportData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [reportSummary, setReportSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filter State
  const [currentFilter, setCurrentFilter] = useState("Semua");
  const [currentReportType, setCurrentReportType] = useState("borrowings");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: ""
  });

  // Navigation items
  const navigationItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin", active: currentPath === "/admin" },
    { icon: BookOpen, label: "Data Buku", path: "/admin/books", active: currentPath === "/admin/books" },
    { icon: Users, label: "Data Anggota", path: "/admin/member", active: currentPath === "/admin/member" },
    { icon: Download, label: "Data Peminjaman", path: "/admin/borrowing", active: currentPath === "/admin/borrowing" },
    { icon: FileText, label: "Laporan", path: "/admin/report", active: currentPath === "/admin/report" },
  ];

  const filterOptions = [
    { label: "Semua", value: "all" },
    { label: "Hari Ini", value: "today" },
    { label: "Minggu Ini", value: "week" },
    { label: "Bulan Ini", value: "month" }
  ];

  const reportTypeOptions = [
    { label: "Data Peminjaman", value: "borrowings", endpoint: "/reports/borrowings" },
    { label: "Buku Populer", value: "popular-books", endpoint: "/reports/popular-books" },
    { label: "Anggota Aktif", value: "active-members", endpoint: "/reports/active-members" },
    { label: "Keterlambatan", value: "overdue", endpoint: "/reports/overdue" },
    { label: "Stok Buku", value: "stock", endpoint: "/reports/stock" },
    { label: "Laporan Bulanan", value: "monthly", endpoint: "/reports/monthly" }
  ];

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/reports/dashboard');
      if (response.data?.success) {
        setDashboardStats(response.data.data || {});
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);

      const selectedReportType = reportTypeOptions.find(opt => opt.value === currentReportType);
      if (!selectedReportType) {
        throw new Error('Tipe laporan tidak valid');
      }

      // Build query parameters
      const params = new URLSearchParams();
      
      if (dateRange.start_date) params.append('start_date', dateRange.start_date);
      if (dateRange.end_date) params.append('end_date', dateRange.end_date);
      
      // Add specific filters based on report type
      switch (currentReportType) {
        case 'borrowings':
          if (currentFilter !== "Semua") {
            const statusMap = {
              "Antri": "antri",
              "Dipinjam": "dipinjam", 
              "Dikembalikan": "dikembalikan",
              "Dibatalkan": "dibatalkan"
            };
            if (statusMap[currentFilter]) {
              params.append('status', statusMap[currentFilter]);
            }
          }
          break;
        case 'popular-books':
        case 'active-members':
          params.append('limit', '20'); // Show more results
          break;
        case 'stock':
          params.append('low_stock_threshold', '5');
          break;
        case 'monthly':
          if (!dateRange.start_date) {
            const now = new Date();
            params.append('year', now.getFullYear().toString());
            params.append('month', (now.getMonth() + 1).toString());
          }
          break;
      }

      const queryString = params.toString();
      const url = `${selectedReportType.endpoint}${queryString ? '?' + queryString : ''}`;
      
      console.log('Fetching report from:', url); // Debug log
      
      const response = await axios.get(url);
      
      if (response.data?.success) {
        const data = response.data.data || response.data;
        
        // Handle different response formats
        if (data.borrowings) {
          setReportData(data.borrowings);
          setReportSummary(data.summary || {});
        } else if (data.popular_books) {
          setReportData(data.popular_books);
        } else if (data.active_members) {
          setReportData(data.active_members);
        } else if (data.overdue_borrowings) {
          setReportData(data.overdue_borrowings);
          setReportSummary(data.summary || {});
        } else if (data.books) {
          setReportData(data.books);
          setReportSummary(data.summary || {});
        } else if (data.daily_borrowings) {
          // Monthly report
          setReportData(data.daily_borrowings);
          setReportSummary({
            popular_books: data.popular_books || [],
            active_members: data.active_members || [],
            overdue_stats: data.overdue_stats || {}
          });
        } else if (Array.isArray(data)) {
          setReportData(data);
        } else {
          setReportData([]);
        }
        
      } else {
        throw new Error(response.data?.message || 'Failed to fetch reports');
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      
      let errorMsg = 'Gagal mengambil data laporan';
      if (err.response) {
        if (err.response.status === 401) {
          errorMsg = 'Sesi telah berakhir, silakan login kembali';
          setTimeout(() => {
            logout();
            navigate('/login');
          }, 2000);
        } else if (err.response.status === 403) {
          errorMsg = 'Anda tidak memiliki akses ke laporan ini';
        } else if (err.response.data?.message) {
          errorMsg = err.response.data.message;
        }
      }
      
      setError(errorMsg);
      setReportData([]);
      setReportSummary({});
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (filterLabel) => {
    setCurrentFilter(filterLabel);
    setShowFilterDropdown(false);
    
    // Set date range based on filter
    const today = new Date();
    const newDateRange = { start_date: "", end_date: "" };
    
    switch (filterLabel) {
      case "Hari Ini":
        newDateRange.start_date = today.toISOString().split('T')[0];
        newDateRange.end_date = today.toISOString().split('T')[0];
        break;
      case "Minggu Ini":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        newDateRange.start_date = weekStart.toISOString().split('T')[0];
        newDateRange.end_date = today.toISOString().split('T')[0];
        break;
      case "Bulan Ini":
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        newDateRange.start_date = monthStart.toISOString().split('T')[0];
        newDateRange.end_date = today.toISOString().split('T')[0];
        break;
      default:
        // "Semua" - no date range
        break;
    }
    
    setDateRange(newDateRange);
  };

  // Handle report type change
  const handleReportTypeChange = (reportType) => {
    setCurrentReportType(reportType);
    setShowReportTypeDropdown(false);
    setReportData([]);
    setReportSummary({});
    setError(null);
    
    // Reset filters when changing report type
    setCurrentFilter("Semua");
    setSearchQuery("");
    setDateRange({ start_date: "", end_date: "" });
  };

  // Handle date range change
  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
    setCurrentFilter("Semua"); // Reset filter when custom date is selected
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return "-";
    }
  };

  // Format number for display
  const formatNumber = (num) => {
    if (typeof num !== 'number') return '0';
    return num.toLocaleString('id-ID');
  };

  // Get status badge with color
  const getStatusBadge = (status, lateStatus) => {
    const statusMap = {
      'antri': { color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', text: 'Antri' },
      'dipinjam': { color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', text: 'Dipinjam' },
      'dikembalikan': { color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800', text: 'Dikembalikan' },
      'dibatalkan': { color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800', text: 'Dibatalkan' }
    };

    const statusInfo = statusMap[status] || { bgColor: 'bg-gray-100', textColor: 'text-gray-800', text: status };

    return (
      <div className="flex flex-wrap gap-1">
        <span className={`${statusInfo.bgColor} ${statusInfo.textColor} text-xs font-medium px-2.5 py-0.5 rounded`}>
          {statusInfo.text}
        </span>
        {lateStatus?.includes('Terlambat') && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Terlambat
          </span>
        )}
      </div>
    );
  };

  // Get table columns based on report type
  const getTableColumns = () => {
    switch (currentReportType) {
      case 'borrowings':
        return [
          { key: 'no', label: 'No', render: (_, index) => index + 1 },
          { key: 'member_code', label: 'Kode Anggota' },
          { key: 'member_name', label: 'Nama Anggota' },
          { key: 'book_title', label: 'Judul Buku' },
          { key: 'borrow_date', label: 'Tanggal Pinjam', render: (value) => formatDate(value) },
          { key: 'due_date', label: 'Jatuh Tempo', render: (value) => formatDate(value) },
          { key: 'return_date', label: 'Tanggal Kembali', render: (value) => value ? formatDate(value) : '-' },
          { key: 'status', label: 'Status', render: (value, _, row) => getStatusBadge(value, row.late_status) }
        ];
      case 'popular-books':
        return [
          { key: 'no', label: 'No', render: (_, index) => index + 1 },
          { key: 'title', label: 'Judul Buku' },
          { key: 'author', label: 'Pengarang' },
          { key: 'total_borrowed', label: 'Total Dipinjam', render: (value) => formatNumber(value) },
          { key: 'currently_borrowed', label: 'Sedang Dipinjam', render: (value) => formatNumber(value) },
          { key: 'stock', label: 'Stok', render: (value) => formatNumber(value) },
          { key: 'categories', label: 'Kategori' }
        ];
      case 'active-members':
        return [
          { key: 'no', label: 'No', render: (_, index) => index + 1 },
          { key: 'member_code', label: 'Kode Anggota' },
          { key: 'member_name', label: 'Nama Anggota' },
          { key: 'faculty', label: 'Fakultas' },
          { key: 'total_borrowings', label: 'Total Pinjam', render: (value) => formatNumber(value) },
          { key: 'active_borrowings', label: 'Sedang Pinjam', render: (value) => formatNumber(value) },
          { key: 'last_borrow_date', label: 'Pinjam Terakhir', render: (value) => formatDate(value) }
        ];
      case 'overdue':
        return [
          { key: 'no', label: 'No', render: (_, index) => index + 1 },
          { key: 'member_code', label: 'Kode Anggota' },
          { key: 'member_name', label: 'Nama Anggota' },
          { key: 'book_title', label: 'Judul Buku' },
          { key: 'due_date', label: 'Jatuh Tempo', render: (value) => formatDate(value) },
          { key: 'days_overdue', label: 'Hari Terlambat', render: (value) => `${value} hari` },
          { key: 'overdue_category', label: 'Kategori' }
        ];
      case 'stock':
        return [
          { key: 'no', label: 'No', render: (_, index) => index + 1 },
          { key: 'title', label: 'Judul Buku' },
          { key: 'author', label: 'Pengarang' },
          { key: 'stock', label: 'Stok', render: (value) => formatNumber(value) },
          { key: 'currently_borrowed', label: 'Sedang Dipinjam', render: (value) => formatNumber(value) },
          { key: 'total_copies', label: 'Total Eksemplar', render: (value) => formatNumber(value) },
          { key: 'stock_status', label: 'Status Stok' }
        ];
      case 'monthly':
        return [
          { key: 'no', label: 'No', render: (_, index) => index + 1 },
          { key: 'date', label: 'Tanggal', render: (value) => formatDate(value) },
          { key: 'total_borrowings', label: 'Total Pinjam', render: (value) => formatNumber(value) },
          { key: 'borrowed', label: 'Dipinjam', render: (value) => formatNumber(value) },
          { key: 'returned', label: 'Dikembalikan', render: (value) => formatNumber(value) }
        ];
      default:
        return [];
    }
  };

  // Handle export to CSV
  const handleExportCSV = () => {
    const columns = getTableColumns();
    const headers = columns.map(col => col.label);
    
    const csvContent = [
      headers.join(','),
      ...filteredReports.map((report, index) => 
        columns.map(col => {
          let value = '';
          if (col.render) {
            value = col.render(report[col.key], index, report);
            if (typeof value === 'object') {
              value = value.props?.children || '';
            }
          } else {
            value = report[col.key] || '';
          }
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const reportTypeName = reportTypeOptions.find(opt => opt.value === currentReportType)?.label || 'laporan';
    a.download = `${reportTypeName.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  // Filter reports based on search query
  const filteredReports = reportData.filter(report => {
    if (!searchQuery) return true;
    
    const searchTerm = searchQuery.toLowerCase();
    const searchableFields = [];
    
    // Add searchable fields based on report type
    switch (currentReportType) {
      case 'borrowings':
        searchableFields.push(
          report.book_title,
          report.member_name,
          report.member_code
        );
        break;
      case 'popular-books':
      case 'stock':
        searchableFields.push(
          report.title,
          report.author,
          report.categories
        );
        break;
      case 'active-members':
        searchableFields.push(
          report.member_name,
          report.member_code,
          report.faculty,
          report.study_program
        );
        break;
      case 'overdue':
        searchableFields.push(
          report.book_title,
          report.member_name,
          report.member_code
        );
        break;
      default:
        // For other report types, search all string fields
        Object.values(report).forEach(value => {
          if (typeof value === 'string') {
            searchableFields.push(value);
          }
        });
    }
    
    return searchableFields.some(field => 
      field && field.toString().toLowerCase().includes(searchTerm)
    );
  });

  // Fetch reports on mount and when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReports();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentReportType, currentFilter, dateRange.start_date, dateRange.end_date]);

  // Fetch dashboard stats on mount
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false);
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentReportTypeLabel = reportTypeOptions.find(opt => opt.value === currentReportType)?.label || 'Laporan';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-emerald-700 shadow-lg z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:block text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2">
              <BookOpen className="h-6 w-6 text-emerald-700" />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg">Perpustakaan</h1>
              <p className="text-emerald-100 text-sm">Sistem Manajemen</p>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <User className="h-6 w-6" />
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-sm text-gray-500">admin@perpustakaan.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-white shadow-lg transition-all duration-300 z-40 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'} w-64`}>
        <div className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-emerald-100 text-emerald-700 border-r-4 border-emerald-700'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${sidebarCollapsed ? 'lg:justify-center' : ''}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Laporan</h1>
            <p className="text-gray-600">Kelola dan unduh berbagai jenis laporan perpustakaan</p>
          </div>

          {/* Dashboard Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Buku</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(dashboardStats.total_books || 0)}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Anggota</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(dashboardStats.total_members || 0)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sedang Dipinjam</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(dashboardStats.active_borrowings || 0)}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Terlambat</p>
                  <p className="text-2xl font-bold text-red-900">
                    {formatNumber(dashboardStats.overdue_borrowings || 0)}
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Report Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Report Type Selector */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Laporan
                </label>
                <button
                  onClick={() => setShowReportTypeDropdown(!showReportTypeDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <span>{currentReportTypeLabel}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                
                {showReportTypeDropdown && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {reportTypeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleReportTypeChange(option.value)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                          currentReportType === option.value ? 'bg-emerald-50 text-emerald-700' : 'text-gray-900'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Selector */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter Waktu
                </label>
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <span>{currentFilter}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange(option.label)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                          currentFilter === option.label ? 'bg-emerald-50 text-emerald-700' : 'text-gray-900'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dari Tanggal
                  </label>
                  <input
                    type="date"
                    value={dateRange.start_date}
                    onChange={(e) => handleDateRangeChange('start_date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sampai Tanggal
                  </label>
                  <input
                    type="date"
                    value={dateRange.end_date}
                    onChange={(e) => handleDateRangeChange('end_date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-end space-y-2">
                <button
                  onClick={fetchReports}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {loading ? (
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Refresh className="h-4 w-4 mr-2" />
                  )}
                  {loading ? 'Memuat...' : 'Muat Ulang'}
                </button>
                
                <button
                  onClick={handleExportCSV}
                  disabled={loading || filteredReports.length === 0}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari laporan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Report Summary */}
          {Object.keys(reportSummary).length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Laporan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(reportSummary).map(([key, value]) => {
                  if (typeof value === 'object') return null;
                  
                  const formatKey = (key) => {
                    const keyMap = {
                      'total_borrowings': 'Total Peminjaman',
                      'active_borrowings': 'Sedang Dipinjam',
                      'returned_borrowings': 'Dikembalikan',
                      'overdue_borrowings': 'Terlambat',
                      'total_books': 'Total Buku',
                      'low_stock_books': 'Stok Rendah',
                      'out_of_stock_books': 'Stok Habis'
                    };
                    return keyMap[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  };

                  return (
                    <div key={key} className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{formatNumber(value)}</p>
                      <p className="text-sm text-gray-600">{formatKey(key)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Report Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentReportTypeLabel}
                </h3>
                <div className="text-sm text-gray-500">
                  {loading ? (
                    <span className="flex items-center">
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Memuat data...
                    </span>
                  ) : (
                    `${formatNumber(filteredReports.length)} data ditemukan`
                  )}
                </div>
              </div>
            </div>

            {error ? (
              <div className="p-6">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-900 font-medium mb-2">Gagal Memuat Data</p>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                      onClick={fetchReports}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                    >
                      Coba Lagi
                    </button>
                  </div>
                </div>
              </div>
            ) : loading ? (
              <div className="p-6">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader className="h-12 w-12 text-emerald-600 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-600">Memuat data laporan...</p>
                  </div>
                </div>
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="p-6">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-900 font-medium mb-2">Tidak Ada Data</p>
                    <p className="text-gray-600">
                      {searchQuery ? 
                        'Tidak ada data yang sesuai dengan pencarian Anda.' :
                        'Tidak ada data laporan untuk filter yang dipilih.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {getTableColumns().map((column) => (
                        <th
                          key={column.key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((report, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {getTableColumns().map((column) => (
                          <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {column.render ? 
                              column.render(report[column.key], index, report) : 
                              report[column.key] || '-'
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
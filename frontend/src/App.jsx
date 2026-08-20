import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import StudentDetailsModal from './components/StudentDetailsModal';
import FacultyDirectory from './components/FacultyDirectory';
import NoticeBoard from './components/NoticeBoard';
import CourseSchedule from './components/CourseSchedule';
import LandingPage from './components/LandingPage';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';
import { studentApi, facultyApi, noticeApi } from './services/api';

export default function App() { 
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'portal' | 'faculty' | 'notices' | 'schedule'
  const [students, setStudents] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [notices, setNotices] = useState([]);
  const [stats, setStats] = useState({ totalStudents: 0, averageAge: 0, courseCounts: {} });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // Opels default light theme

  // Authentication State
  const [currentUser, setCurrentUser] = useState({
    email: 'admin@college.edu',
    name: 'System Administrator',
    role: 'ADMIN' // 'ADMIN' | 'FACULTY' | 'STUDENT'
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast notification state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [studentsData, statsData, facultyData, noticeData] = await Promise.all([
        studentApi.getAllStudents(),
        studentApi.getStats(),
        facultyApi.getAllFaculty().catch(() => []),
        noticeApi.getAllNotices().catch(() => [])
      ]);
      setStudents(studentsData || []);
      setStats(statsData || { totalStudents: 0, averageAge: 0, courseCounts: {} });
      setFacultyList(facultyData || []);
      setNotices(noticeData || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      addToast(error?.message || "Failed to connect to backend server.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Login / Logout Handlers
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    addToast(`Signed in as ${userData.name} (${userData.role})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    addToast("Signed out successfully.");
  };

  // One-Click CSV Export Function
  const handleExportCSV = () => {
    if (!students || students.length === 0) {
      addToast("No student records available to export.", "error");
      return;
    }

    const headers = ["ID", "Name", "Age", "Course", "Semester", "Email", "Phone", "AttendanceRate", "GPA", "FeeStatus"];
    const rows = students.map(s => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      s.age,
      `"${s.course.replace(/"/g, '""')}"`,
      `"${s.semester.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.phone || '').replace(/"/g, '""')}"`,
      `${s.attendanceRate || 85}%`,
      s.gpa || 3.5,
      `"${s.feeStatus || 'Paid'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `college_students_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Exported ${students.length} student records to CSV file.`);
  };

  const handleAddStudent = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const handleViewStudent = (student) => {
    setViewStudent(student);
  };

  const handleDeleteStudent = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student "${name}"?`)) {
      return;
    }
    try {
      await studentApi.deleteStudent(id);
      addToast(`Student "${name}" deleted successfully.`);
      fetchData();
    } catch (error) {
      addToast(error?.message || "Failed to delete student.", "error");
    }
  };

  const handleSaveStudent = async (formData) => {
    setIsSubmitting(true);
    try {
      if (studentToEdit) {
        await studentApi.updateStudent(studentToEdit.id, formData);
        addToast(`Student "${formData.name}" updated successfully.`);
      } else {
        await studentApi.createStudent(formData);
        addToast(`Student "${formData.name}" enrolled successfully.`);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      if (error?.errors) {
        const firstErr = Object.values(error.errors)[0];
        addToast(firstErr || error.message || "Validation failed", "error");
      } else {
        addToast(error?.message || "Failed to save student record.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddFaculty = async (facultyData) => {
    try {
      await facultyApi.createFaculty(facultyData);
      addToast(`Professor "${facultyData.name}" added to Faculty Directory.`);
      fetchData();
    } catch (error) {
      addToast(error?.message || "Failed to add faculty member.", "error");
    }
  };

  const handleDeleteFaculty = async (id, name) => {
    if (!window.confirm(`Remove professor "${name}" from Faculty Directory?`)) return;
    try {
      await facultyApi.deleteFaculty(id);
      addToast(`Professor "${name}" removed.`);
      fetchData();
    } catch (error) {
      addToast(error?.message || "Failed to delete faculty member.", "error");
    }
  };

  const handleAddNotice = async (noticeData) => {
    try {
      await noticeApi.createNotice(noticeData);
      addToast(`Announcement "${noticeData.title}" published!`);
      fetchData();
    } catch (error) {
      addToast(error?.message || "Failed to post announcement.", "error");
    }
  };

  const handleDeleteNotice = async (id, title) => {
    if (!window.confirm(`Delete notice "${title}"?`)) return;
    try {
      await noticeApi.deleteNotice(id);
      addToast("Announcement deleted.");
      fetchData();
    } catch (error) {
      addToast(error?.message || "Failed to delete notice.", "error");
    }
  };

  return (
    <div className="app-container">
      {/* Opels Header Banner & Ribbon Tabs */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onAddStudent={handleAddStudent}
        onExportCSV={handleExportCSV}
        onRefresh={fetchData}
        theme={theme}
        toggleTheme={toggleTheme}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Page Content */}
      <main>
        {activeView === 'landing' && (
          <LandingPage 
            onLaunchPortal={() => setActiveView('portal')} 
            stats={stats} 
          />
        )}

        {activeView === 'portal' && (
          <>
            <Dashboard stats={stats} />

            {loading ? (
              <div className="glass-panel empty-state">
                <h3>Loading Student Directory...</h3>
              </div>
            ) : (
              <StudentTable
                students={students}
                onView={handleViewStudent}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
                userRole={currentUser?.role || 'STUDENT'}
              />
            )}
          </>
        )}

        {activeView === 'faculty' && (
          <FacultyDirectory 
            facultyList={facultyList}
            onAddFaculty={handleAddFaculty}
            onDeleteFaculty={handleDeleteFaculty}
            userRole={currentUser?.role || 'STUDENT'}
          />
        )}

        {activeView === 'notices' && (
          <NoticeBoard
            notices={notices}
            onAddNotice={handleAddNotice}
            onDeleteNotice={handleDeleteNotice}
            userRole={currentUser?.role || 'STUDENT'}
          />
        )}

        {activeView === 'schedule' && (
          <CourseSchedule />
        )}
      </main>

      {/* Login Authentication Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
        isSubmitting={isSubmitting}
      />

      {/* View Student Details Modal & ID Card */}
      <StudentDetailsModal
        student={viewStudent}
        onClose={() => setViewStudent(null)}
        onEdit={handleEditStudent}
      />

      {/* Floating Toast Alerts */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

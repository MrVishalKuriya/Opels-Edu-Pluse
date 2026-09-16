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

// Crio.do Applied Learning & OPELS Components
import CrioHero from './components/CrioHero';
import CrioPrograms from './components/CrioPrograms';
import CrioProjectStudio from './components/CrioProjectStudio';
import CrioPlacements from './components/CrioPlacements';
import CrioMasterclasses from './components/CrioMasterclasses';
import CrioScholarshipQuiz from './components/CrioScholarshipQuiz';
import CrioCurriculumModal from './components/CrioCurriculumModal';
import CrioApplyModal from './components/CrioApplyModal';
import CrioFooter from './components/CrioFooter';

// Student Friendly Hub & Gemini Chatbot
import StudentDashboard from './components/StudentDashboard';
import StudentGeminiChat from './components/StudentGeminiChat';

import { studentApi, facultyApi, noticeApi, learningApi } from './services/api';
import { crioPrograms } from './data/learningData';
import { auth, logoutUser, onAuthStateChanged } from './services/firebase';
import { Sparkles } from 'lucide-react';

export default function App() { 
  // Main view state: default to 'learning-home' for Crio-style experiential platform
  const [activeView, setActiveView] = useState('learning-home'); 
  // Views: 'learning-home' | 'student-hub' | 'programs' | 'sandbox' | 'placements' | 'masterclasses' | 'scholarship' | 'portal' | 'faculty' | 'notices' | 'schedule'
  
  // Learning Data & Modals State
  const [programs, setPrograms] = useState(crioPrograms);
  const [selectedProgramForSyllabus, setSelectedProgramForSyllabus] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyModalData, setApplyModalData] = useState(null);
  const [sandboxInitialProject, setSandboxInitialProject] = useState('qkart');

  // Gemini AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState(null);

  // Campus ERP Data State (Preserved for College Administration)
  const [students, setStudents] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [notices, setNotices] = useState([]);
  const [stats, setStats] = useState({ totalStudents: 0, averageAge: 0, courseCounts: {} });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // Opels light theme default

  // Authentication State
  const [currentUser, setCurrentUser] = useState({
    uid: 'demo-student-1',
    email: 'student@college.edu',
    displayName: 'Aarav Sharma',
    name: 'Aarav Sharma',
    role: 'STUDENT',
    xpPoints: 480,
    targetTrack: 'Full Stack Developer',
    completedProjects: 1
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fireUser) => {
      if (fireUser) {
        setCurrentUser(prev => ({
          ...prev,
          uid: fireUser.uid,
          email: fireUser.email,
          displayName: fireUser.displayName || fireUser.email?.split('@')[0] || 'Student',
          name: fireUser.displayName || fireUser.email?.split('@')[0] || 'Student',
          photoURL: fireUser.photoURL || '',
          role: fireUser.email === 'admin@college.edu' ? 'ADMIN' : 'STUDENT'
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Student Modals state
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
    }, 4500);
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
      const [studentsData, statsData, facultyData, noticeData, programsData] = await Promise.all([
        studentApi.getAllStudents().catch(() => []),
        studentApi.getStats().catch(() => ({ totalStudents: 0, averageAge: 0, courseCounts: {} })),
        facultyApi.getAllFaculty().catch(() => []),
        noticeApi.getAllNotices().catch(() => []),
        learningApi.getPrograms().catch(() => [])
      ]);
      setStudents(studentsData || []);
      setStats(statsData || { totalStudents: 0, averageAge: 0, courseCounts: {} });
      setFacultyList(facultyData || []);
      setNotices(noticeData || []);
      setPrograms(programsData || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
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
    addToast(`Signed in as ${userData.displayName || userData.name} (${userData.role})`);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // Ignore
    }
    setCurrentUser(null);
    addToast("Signed out successfully.");
  };

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
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `opels_student_roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Student roster exported successfully to CSV.");
  };

  const handleOpenSandbox = (projectId = 'qkart') => {
    setSandboxInitialProject(projectId);
    setActiveView('sandbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApply = (program = null, scholarship = null) => {
    setApplyModalData({ program, scholarship });
    setIsApplyModalOpen(true);
  };

  const handleApplySuccess = (applicationId) => {
    addToast(`Application confirmed! Reference ID: ${applicationId}`);
  };

  const handleOpenChat = (ctx = null) => {
    setChatContext(ctx || { projectName: 'General Study', milestoneTitle: 'Doubt Solver' });
    setIsChatOpen(true);
  };

  // Student CRUD Operations
  const handleAddStudent = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
    setViewStudent(null);
  };

  const handleViewStudent = (student) => {
    setViewStudent(student);
  };

  const handleDeleteStudent = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await studentApi.deleteStudent(id);
      addToast(`Student "${name}" deleted.`);
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

  const isLearningView = ['learning-home', 'student-hub', 'programs', 'sandbox', 'placements', 'masterclasses', 'scholarship'].includes(activeView);

  return (
    <div className="app-container">
      {/* Opels Header Banner with Crio.do Navigation Tabs & Actions */}
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
        onOpenApply={() => handleOpenApply()}
        onOpenSandbox={() => handleOpenSandbox('qkart')}
        onOpenChat={handleOpenChat}
      />

      {/* Main Page Content */}
      <main>
        {/* VIEW 1: Crio Experiential Home Overview */}
        {activeView === 'learning-home' && (
          <>
            <CrioHero 
              onExplorePrograms={() => setActiveView('programs')}
              onOpenSandbox={() => handleOpenSandbox('qkart')}
              onOpenScholarship={() => setActiveView('scholarship')}
              onOpenApply={() => handleOpenApply()}
            />

            <CrioPrograms 
              programs={programs}
              onSelectProgramForSyllabus={(prog) => setSelectedProgramForSyllabus(prog)}
              onApplyForProgram={(prog) => handleOpenApply(prog)}
              onOpenSandboxWithProject={(projName) => {
                const idMap = { 'QKart E-Commerce': 'qkart', 'QTrip Dynamic Travel': 'qtrip', 'QMoney FinTech Analytics': 'qmoney', 'Enterprise RAG AI Copilot': 'rag-copilot' };
                handleOpenSandbox(idMap[projName] || 'qkart');
              }}
            />

            <CrioPlacements 
              onApplyNow={() => handleOpenApply()} 
            />

            <CrioMasterclasses 
              onShowToast={addToast} 
            />

            <CrioScholarshipQuiz 
              onApplyWithScholarship={(quizData) => {
                handleOpenApply(null, quizData);
              }} 
            />
          </>
        )}

        {/* VIEW 2: Student-Friendly Dashboard Hub */}
        {activeView === 'student-hub' && (
          <StudentDashboard 
            currentUser={currentUser}
            onNavigateToSandbox={handleOpenSandbox}
            onOpenChat={handleOpenChat}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        )}

        {/* VIEW 3: Programs & Fellowships */}
        {activeView === 'programs' && (
          <CrioPrograms 
            programs={programs}
            onSelectProgramForSyllabus={(prog) => setSelectedProgramForSyllabus(prog)}
            onApplyForProgram={(prog) => handleOpenApply(prog)}
            onOpenSandboxWithProject={(projName) => {
              const idMap = { 'QKart E-Commerce': 'qkart', 'QTrip Dynamic Travel': 'qtrip', 'QMoney FinTech Analytics': 'qmoney', 'Enterprise RAG AI Copilot': 'rag-copilot' };
              handleOpenSandbox(idMap[projName] || 'qkart');
            }}
          />
        )}

        {/* VIEW 4: Interactive Developer Project Sandbox (Crio Core Feature) */}
        {activeView === 'sandbox' && (
          <CrioProjectStudio 
            initialProjectId={sandboxInitialProject}
            onApplyForProgram={() => handleOpenApply()}
            currentUser={currentUser}
            onOpenChat={handleOpenChat}
          />
        )}

        {/* VIEW 5: Placements & Salary Hike Calculator */}
        {activeView === 'placements' && (
          <CrioPlacements 
            onApplyNow={() => handleOpenApply()} 
          />
        )}

        {/* VIEW 6: Live Masterclasses */}
        {activeView === 'masterclasses' && (
          <CrioMasterclasses 
            onShowToast={addToast} 
          />
        )}

        {/* VIEW 7: Scholarship & Eligibility Quiz */}
        {activeView === 'scholarship' && (
          <CrioScholarshipQuiz 
            onApplyWithScholarship={(quizData) => {
              handleOpenApply(null, quizData);
            }} 
          />
        )}

        {/* CAMPUS ERP VIEWS (Retained for student administration) */}
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

      {/* Floating AI Mentor Launcher Button */}
      {!isChatOpen && (
        <button
          className="floating-ai-launcher"
          onClick={() => handleOpenChat({ projectName: 'Developer Sandbox', milestoneTitle: 'Quick Doubt' })}
          title="Ask OPELS Gemini AI Study Mentor"
        >
          <div className="flex items-center gap-2">
            <span className="ai-icon-bubble">
              <Sparkles size={16} className="text-cyan-300 animate-pulse" />
            </span>
            <span className="font-semibold text-xs tracking-wide">Ask Gemini Mentor</span>
            <span className="ai-status-indicator"></span>
          </div>
        </button>
      )}

      {/* Multi-Turn Gemini AI Chat Assistant */}
      <StudentGeminiChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentUser={currentUser}
        currentContext={chatContext}
        isFloating={true}
      />

      {/* Global Learning Platform Footer */}
      {isLearningView && (
        <CrioFooter 
          setActiveView={setActiveView}
          onOpenApply={() => handleOpenApply()}
        />
      )}

      {/* Syllabus / Curriculum Detail Modal */}
      {selectedProgramForSyllabus && (
        <CrioCurriculumModal 
          program={selectedProgramForSyllabus}
          onClose={() => setSelectedProgramForSyllabus(null)}
          onApply={(prog) => handleOpenApply(prog)}
        />
      )}

      {/* Application & Free Trial Modal */}
      {isApplyModalOpen && (
        <CrioApplyModal 
          program={applyModalData?.program}
          scholarshipData={applyModalData?.scholarship}
          onClose={() => setIsApplyModalOpen(false)}
          onSuccess={handleApplySuccess}
        />
      )}

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

import React, { useState, useEffect } from 'react';
import { loadData, saveData, formatDate } from './utils/helpers';
import StudentForm from './components/StudentForm';
import AttendanceTable from './components/AttendanceTable';
import AttendanceSummary from './components/AttendanceSummary';
import DateSelector from './components/DateSelector';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

function App() {
  const [data, setData] = useState(loadData());
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    saveData(data);
  }, [data]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addOrUpdateStudent = (studentData) => {
    if (editingStudent) {
      setData(prev => ({
        ...prev,
        students: prev.students.map(s => s.id === editingStudent.id ? { ...studentData, id: s.id } : s)
      }));
    } else {
      const newStudent = { ...studentData, id: Date.now().toString() };
      setData(prev => ({
        ...prev,
        students: [...prev.students, newStudent]
      }));
    }
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student? All their attendance records will also be removed.')) {
      setData(prev => {
        const newAttendance = { ...prev.attendance };
        Object.keys(newAttendance).forEach(date => {
          delete newAttendance[date][id];
        });
        return {
          students: prev.students.filter(s => s.id !== id),
          attendance: newAttendance
        };
      });
    }
  };

  const markAttendance = (studentId, status) => {
    setData(prev => {
      const currentDay = prev.attendance[selectedDate] || {};
      // If clicking the same status, toggle it off (optional, but requested one-click toggle buttons)
      const newStatus = currentDay[studentId] === status ? null : status;
      
      const newAttendance = {
        ...prev.attendance,
        [selectedDate]: {
          ...currentDay,
          [studentId]: newStatus
        }
      };
      
      // Clean up null values
      if (newStatus === null) delete newAttendance[selectedDate][studentId];
      if (Object.keys(newAttendance[selectedDate]).length === 0) delete newAttendance[selectedDate];

      return { ...prev, attendance: newAttendance };
    });
  };

  const resetAllData = () => {
    if (window.confirm('CRITICAL ACTION: This will delete ALL students and ALL attendance records. Continue?')) {
      setData({ students: [], attendance: {} });
    }
  };

  const getStats = () => {
    const currentAttendance = data.attendance[selectedDate] || {};
    const stats = {
      total: data.students.length,
      present: 0,
      absent: 0,
      leave: 0
    };
    Object.values(currentAttendance).forEach(status => {
      if (status === 'Present') stats.present++;
      else if (status === 'Absent') stats.absent++;
      else if (status === 'Leave') stats.leave++;
    });
    return stats;
  };

  return (
    <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 20px 60px 20px' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        padding: '20px 0'
      }}>
        <div className="animate-slide">
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Attendance Pro
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Smart Classroom Management</p>
        </div>
        
        <div className="header-actions" style={{ display: 'flex', gap: '15px' }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button className="primary-btn" onClick={() => { setEditingStudent(null); setIsModalOpen(true); }}>
            + Add Student
          </button>
        </div>
      </header>

      <AttendanceSummary stats={getStats()} />

      <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <AttendanceTable 
        students={data.students}
        attendance={data.attendance[selectedDate] || {}}
        allAttendanceData={data.attendance}
        onMark={markAttendance}
        onEdit={(student) => { setEditingStudent(student); setIsModalOpen(true); }}
        onDelete={deleteStudent}
      />

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="secondary-btn" 
          onClick={resetAllData}
          style={{ color: 'var(--danger)', borderColor: 'var(--danger)', opacity: 0.7 }}
        >
          Reset All Data
        </button>
      </div>

      <StudentForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={addOrUpdateStudent}
        editingStudent={editingStudent}
      />

      <footer style={{ marginTop: '60px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>© 2026 Attendance Pro Dashboard • Built with React</p>
      </footer>
    </div>
  );
}

export default App;

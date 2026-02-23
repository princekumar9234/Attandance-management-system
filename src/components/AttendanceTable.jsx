import React, { useState } from 'react';
import { calculatePercentage } from '../utils/helpers';

const AttendanceTable = ({ 
  students, 
  attendance, 
  onMark, 
  onEdit, 
  onDelete,
  allAttendanceData 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rollNo');

  const getStudentStats = (studentId) => {
    let present = 0;
    let total = 0;
    Object.values(allAttendanceData).forEach(day => {
      if (day[studentId]) {
        total++;
        if (day[studentId] === 'Present') present++;
      }
    });
    return { present, total, percentage: calculatePercentage(present, total) };
  };

  const filteredStudents = students
    .filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.rollNo.toString().includes(searchTerm);
      const status = attendance[s.id] || 'Not Marked';
      const matchesFilter = filter === 'All' || status === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'percentage') {
        return getStudentStats(b.id).percentage - getStudentStats(a.id).percentage;
      }
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });

  if (students.length === 0) {
    return (
      <div className="glass-morphism animate-fade" style={{ padding: '60px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-secondary)' }}>No Students Found</h2>
        <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>Add your first student to start tracking attendance.</p>
      </div>
    );
  }

  return (
    <div className="glass-morphism animate-fade table-container" style={{ padding: '25px', overflow: 'hidden' }}>
      <div className="search-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '25px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '300px' }}>
          <input 
            type="text" 
            placeholder="Search by name or roll no..." 
            className="secondary-btn"
            style={{ flex: 1, padding: '10px 15px', textAlign: 'left' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="secondary-btn"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
            <option value="Not Marked">Not Marked</option>
          </select>
          <select 
            className="secondary-btn mobile-hide"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rollNo">Sort by Roll No</option>
            <option value="name">Sort by Name</option>
            <option value="percentage">Sort by Attendance %</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '15px 10px', color: 'var(--text-secondary)' }}>Roll No</th>
              <th style={{ padding: '15px 10px', color: 'var(--text-secondary)' }}>Student Name</th>
              <th style={{ padding: '15px 10px', color: 'var(--text-secondary)' }}>Attendance Status</th>
              <th className="mobile-hide" style={{ padding: '15px 10px', color: 'var(--text-secondary)', textAlign: 'center' }}>Overall %</th>
              <th style={{ padding: '15px 10px', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const status = attendance[student.id];
              const stats = getStudentStats(student.id);
              
              return (
                <tr key={student.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'var(--transition)' }} className="table-row">
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>{student.rollNo}</td>
                  <td style={{ padding: '15px 10px' }}>
                    <div style={{ fontWeight: '600' }}>{student.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{student.className}</div>
                  </td>
                  <td style={{ padding: '15px 10px' }}>
                    <div className="attendance-btn-group" style={{ display: 'flex', gap: '8px' }}>
                      {['Present', 'Absent', 'Leave'].map(s => (
                        <button
                          key={s}
                          onClick={() => onMark(student.id, s)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            transition: 'var(--transition)',
                            background: status === s ? 
                              (s === 'Present' ? 'var(--success)' : s === 'Absent' ? 'var(--danger)' : 'var(--warning)') : 
                              'var(--glass-border)',
                            color: status === s ? 'white' : 'var(--text-primary)',
                            opacity: status && status !== s ? 0.6 : 1
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="mobile-hide" style={{ padding: '15px 10px', textAlign: 'center' }}>
                    <div style={{ fontWeight: '600', color: stats.percentage < 75 ? 'var(--danger)' : 'var(--success)' }}>
                      {stats.percentage}%
                    </div>
                    <div className="progress-container" style={{ height: '4px', width: '60px', margin: '4px auto' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${stats.percentage}%`, 
                          background: stats.percentage < 75 ? 'var(--danger)' : 'var(--success)' 
                        }}
                      ></div>
                    </div>
                  </td>
                  <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => onEdit(student)}
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button 
                        onClick={() => onDelete(student.id)}
                        className="action-btn delete-btn"
                        title="Delete"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default AttendanceTable;

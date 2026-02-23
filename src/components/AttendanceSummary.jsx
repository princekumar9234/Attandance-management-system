import React from 'react';
import { calculatePercentage } from '../utils/helpers';

const AttendanceSummary = ({ stats }) => {
  const { total, present, absent, leave } = stats;
  const overallPercentage = calculatePercentage(present, total);

  return (
    <div className="summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
      <div className="glass-morphism card-container animate-fade" style={{ padding: '20px' }}>
        <div className="card-3d">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Overall Attendance</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--accent-primary)' }}>{overallPercentage}%</h2>
            <div style={{ flex: 1 }}>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${overallPercentage}%`, background: 'var(--accent-primary)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-morphism animate-fade" style={{ padding: '20px', animationDelay: '0.1s' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Total Students</p>
        <h2 style={{ fontSize: '2rem', marginTop: '5px' }}>{total}</h2>
      </div>

      <div className="glass-morphism animate-fade" style={{ padding: '20px', animationDelay: '0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600' }}>Present</p>
            <h3 style={{ color: 'var(--success)' }}>{present}</h3>
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600' }}>Absent</p>
            <h3 style={{ color: 'var(--danger)' }}>{absent}</h3>
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600' }}>Leave</p>
            <h3 style={{ color: 'var(--warning)' }}>{leave}</h3>
          </div>
        </div>
        <div className="progress-container" style={{ height: '6px', display: 'flex' }}>
          <div style={{ width: `${(present/total)*100 || 0}%`, background: 'var(--success)', height: '100%' }}></div>
          <div style={{ width: `${(absent/total)*100 || 0}%`, background: 'var(--danger)', height: '100%' }}></div>
          <div style={{ width: `${(leave/total)*100 || 0}%`, background: 'var(--warning)', height: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;

import React from 'react';
import { formatDate } from '../utils/helpers';

const DateSelector = ({ selectedDate, onDateChange }) => {
  const today = formatDate(new Date());

  const handlePrev = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    onDateChange(formatDate(d));
  };

  const handleNext = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    onDateChange(formatDate(d));
  };

  return (
    <div className="glass-morphism date-selector-wrapper" style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={handlePrev} className="secondary-btn" style={{ padding: '8px 12px' }}>←</button>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Selected Date</p>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => onDateChange(e.target.value)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-primary)', 
              fontSize: '1.2rem', 
              fontWeight: '700',
              cursor: 'pointer',
              outline: 'none'
            }}
          />
        </div>
        <button onClick={handleNext} className="secondary-btn" style={{ padding: '8px 12px' }}>→</button>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          className={`secondary-btn ${selectedDate === today ? 'active' : ''}`} 
          onClick={() => onDateChange(today)}
          style={{ border: selectedDate === today ? '1px solid var(--accent-primary)' : '' }}
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default DateSelector;

import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button 
      className="secondary-btn" 
      onClick={toggleTheme}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '8px 16px'
      }}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;

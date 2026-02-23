export const STORAGE_KEY = 'attendance_app_data';

export const loadData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  
  // Initial dummy data
  return {
    students: [
      { id: '1', name: 'John Doe', rollNo: '101', className: '10th A' },
      { id: '2', name: 'Jane Smith', rollNo: '102', className: '10th A' },
      { id: '3', name: 'Mike Ross', rollNo: '103', className: '10th B' },
      { id: '4', name: 'Rachel Zane', rollNo: '104', className: '10th B' },
      { id: '5', name: 'Harvey Specter', rollNo: '105', className: '12th A' }
    ],
    attendance: {}
  };
};

export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Present': return 'var(--success)';
    case 'Absent': return 'var(--danger)';
    case 'Leave': return 'var(--warning)';
    default: return 'var(--text-secondary)';
  }
};

export const calculatePercentage = (present, total) => {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
};

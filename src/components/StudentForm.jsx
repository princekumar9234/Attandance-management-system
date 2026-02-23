import React, { useState, useEffect } from 'react';

const StudentForm = ({ isOpen, onClose, onSubmit, editingStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    className: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({ name: '', rollNo: '', className: '' });
    }
  }, [editingStudent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo || !formData.className) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-morphism animate-fade">
        <h2 style={{ marginBottom: '20px' }}>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Full Name</label>
            <input
              type="text"
              className="glass-morphism"
              style={{ width: '100%', padding: '12px', border: '1px solid var(--glass-border)', background: 'var(--card-bg)', color: 'inherit', borderRadius: '10px' }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter student name"
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Roll Number</label>
            <input
              type="text"
              className="glass-morphism"
              style={{ width: '100%', padding: '12px', border: '1px solid var(--glass-border)', background: 'var(--card-bg)', color: 'inherit', borderRadius: '10px' }}
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              placeholder="e.g. 101"
              required
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Class / Section</label>
            <input
              type="text"
              className="glass-morphism"
              style={{ width: '100%', padding: '12px', border: '1px solid var(--glass-border)', background: 'var(--card-bg)', color: 'inherit', borderRadius: '10px' }}
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              placeholder="e.g. 10th A"
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn">
              {editingStudent ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;

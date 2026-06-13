"use client";

import { useState } from 'react';
import styles from './VolunteerForm.module.css';

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    reason: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', skills: '', reason: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successIconLarge}>🎉</div>
        <h3 className={styles.successTitle}>You're In!</h3>
        <p className={styles.successText}>
          Thank you for registering as a volunteer. Our team will review your application and get back to you shortly.
        </p>
        <button 
          className="btn btn-secondary" 
          onClick={() => setStatus('idle')}
        >
          Register Another Volunteer
        </button>
      </div>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Volunteer Registration</h2>
        <p className={styles.formSubtitle}>Fill in your details to get started</p>
      </div>
      
      {status === 'error' && (
        <div className={styles.error}>
          <span className={styles.errorIcon}>⚠️</span>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="vol-name">Full Name</label>
          <input 
            type="text" 
            id="vol-name" 
            name="name" 
            className="input-field" 
            required 
            value={formData.name}
            onChange={handleChange}
            placeholder="E.g. Priya Sharma"
          />
        </div>

        <div className={styles.fieldRow}>
          <div className="input-group">
            <label className="input-label" htmlFor="vol-email">Email Address</label>
            <input 
              type="email" 
              id="vol-email" 
              name="email" 
              className="input-field" 
              required 
              value={formData.email}
              onChange={handleChange}
              placeholder="priya@example.com"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="vol-phone">Phone Number</label>
            <input 
              type="tel" 
              id="vol-phone" 
              name="phone" 
              className="input-field" 
              required 
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="vol-skills">Your Skills / Interests</label>
          <input 
            type="text" 
            id="vol-skills" 
            name="skills" 
            className="input-field" 
            required 
            value={formData.skills}
            onChange={handleChange}
            placeholder="E.g. Teaching, Web Development, Healthcare..."
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="vol-reason">Why do you want to join us?</label>
          <textarea 
            id="vol-reason" 
            name="reason" 
            className={`input-field ${styles.textarea}`} 
            required 
            value={formData.reason}
            onChange={handleChange}
            placeholder="I am passionate about making a difference in..."
          />
        </div>

        <button 
          type="submit" 
          className={`btn btn-primary ${styles.submitBtn}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting Application...' : '🚀 Submit Registration'}
        </button>
      </form>
    </div>
  );
}

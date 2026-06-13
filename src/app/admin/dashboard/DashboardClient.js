"use client";

import { useState } from 'react';
import styles from './dashboard.module.css';

export default function DashboardClient({ initialVolunteers, stats, userEmail }) {
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
      }
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Skills', 'Reason', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...volunteers.map(v => [
        `"${v.name}"`,
        `"${v.email}"`,
        `"${v.phone}"`,
        `"${v.skills.replace(/"/g, '""')}"`,
        `"${v.reason.replace(/"/g, '""')}"`,
        `"${v.status}"`,
        `"${new Date(v.createdAt).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `nayepankh_volunteers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredVolunteers = volunteers.filter(v => {
    const matchesFilter = filter === 'All' || v.status === filter;
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
                          v.email.toLowerCase().includes(search.toLowerCase()) ||
                          v.skills.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.dashboardPage}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <div className={styles.sidebarLogo}>NP</div>
          <div>
            <div className={styles.sidebarTitle}>NayePankh</div>
            <div className={styles.sidebarSub}>Admin Panel</div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <a href="/admin/dashboard" className={`${styles.sidebarLink} ${styles.sidebarLinkActive}`}>
            <span>📊</span> Dashboard
          </a>
          <a href="/" className={styles.sidebarLink}>
            <span>🏠</span> View Site
          </a>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarUser}>
            <div className={styles.sidebarAvatar}>
              {userEmail?.charAt(0).toUpperCase()}
            </div>
            <div className={styles.sidebarUserInfo}>
              <div className={styles.sidebarUserName}>Admin</div>
              <div className={styles.sidebarUserEmail}>{userEmail}</div>
            </div>
          </div>
          <a href="/api/auth/signout" className={styles.sidebarLogout}>Sign Out</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.dashboardMain}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div>
            <h1 className={styles.dashboardTitle}>Dashboard</h1>
            <p className={styles.dashboardSubtitle}>Manage volunteer applications</p>
          </div>
          <button onClick={exportCSV} className="btn btn-primary">
            📥 Export CSV
          </button>
        </div>

        {/* Stat Cards */}
        <div className={styles.statsGrid}>
          <div className={`stat-card animate-fade-in`}>
            <div className="stat-icon" style={{ background: 'rgba(29,53,87,0.1)', color: 'var(--color-secondary)' }}>📋</div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className={`stat-card animate-fade-in-delay-1`}>
            <div className="stat-icon" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>⏳</div>
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending Review</div>
          </div>
          <div className={`stat-card animate-fade-in-delay-2`}>
            <div className="stat-icon" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>✅</div>
            <div className="stat-value">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className={`stat-card animate-fade-in-delay-3`}>
            <div className="stat-icon" style={{ background: 'var(--color-danger-light)', color: 'var(--color-primary)' }}>❌</div>
            <div className="stat-value">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className={styles.toolbar}>
          <div className={styles.filterGroup}>
            {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Search by name, email, or skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Volunteer</th>
                  <th>Contact</th>
                  <th>Skills</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📭</div>
                      <div className={styles.emptyTitle}>No volunteers found</div>
                      <div className={styles.emptyText}>
                        {filter !== 'All' ? `No ${filter.toLowerCase()} applications.` : 'No volunteers have registered yet.'}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredVolunteers.map((v, i) => (
                    <tr key={v.id} style={{ animationDelay: `${i * 50}ms` }}>
                      <td>
                        <div className={styles.volunteerCell}>
                          <div className={styles.volunteerAvatar}>
                            {v.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className={styles.volunteerName}>{v.name}</div>
                            <div className={styles.volunteerDate}>
                              {new Date(v.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.contactEmail}>{v.email}</div>
                        <div className={styles.contactPhone}>{v.phone}</div>
                      </td>
                      <td>
                        <div className={styles.skillsCell} title={v.skills}>{v.skills}</div>
                      </td>
                      <td>
                        <span className={`badge badge-${v.status.toLowerCase()}`}>
                          {v.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {v.status === 'Pending' ? (
                          <div className={styles.actionGroup}>
                            <button 
                              onClick={() => updateStatus(v.id, 'Approved')}
                              className={`btn btn-sm ${styles.approveBtn}`}
                            >
                              ✓ Approve
                            </button>
                            <button 
                              onClick={() => updateStatus(v.id, 'Rejected')}
                              className={`btn btn-sm ${styles.rejectBtn}`}
                            >
                              ✕ Reject
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateStatus(v.id, 'Pending')}
                            className={`btn btn-sm ${styles.resetBtn}`}
                          >
                            ↩ Reset
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

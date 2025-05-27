// src/pages/AdminPanel.jsx
import React, { useState } from 'react';
import AddCandidate from './AddCandidate';
import ManageCandidates from './ManageCandidates';
import VotedUsers from './VotedUsers';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
<div className="admin-wrapper">
      <div className="admin-card">
        <h2 className="admin-title">Admin Panel</h2>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add Candidate
          </button>
          <button
            className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Candidates
          </button>
          <button
            className={`tab-btn ${activeTab === 'voted' ? 'active' : ''}`}
            onClick={() => setActiveTab('voted')}
          >
            Voted Users
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'add' && <AddCandidate />}
          {activeTab === 'manage' && <ManageCandidates />}
          {activeTab === 'voted' && <VotedUsers />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

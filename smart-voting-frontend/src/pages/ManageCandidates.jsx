// src/pages/ManageCandidates.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageCandidates.css';

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  // Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:3000/options');
      setCandidates(res.data);
    } catch (err) {
      console.error('Error fetching candidates:', err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Delete candidate
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/options/${id}`);
      alert('🗑️ Candidate deleted successfully');
      fetchCandidates(); // Refresh list
    } catch (err) {
      console.error('Error deleting candidate:', err);
      alert('❌ Cannot delete candidate. Maybe already voted or server error.');
    }
  };

  return (
    <div className="manage-container">
      <div className="manage-card">
        <h2>🛠️ Manage Candidates</h2>
        {candidates.length === 0 ? (
          <p>No candidates available.</p>
        ) : (
          <ul>
            {candidates.map((c) => (
              <li key={c.id} className="candidate-row">
                <span>{c.name}</span>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageCandidates;

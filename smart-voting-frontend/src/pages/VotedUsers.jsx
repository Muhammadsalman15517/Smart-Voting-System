import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Optional styling

const VotedUsers = () => {
  const [cnics, setCnics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/votes/voted-cnic')
      .then(res => setCnics(res.data))
      .catch(err => console.error('Error fetching CNICs:', err));
  }, []);

  return (
    <div className="voted-users-container">
      <h3>📋 CNICs of Users Who Voted</h3>
      {cnics.length === 0 ? (
        <p>No votes cast yet.</p>
      ) : (
        <ul className="cnic-list">
          {cnics.map((nic, index) => (
            <li key={index}>🧾 {nic}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VotedUsers;

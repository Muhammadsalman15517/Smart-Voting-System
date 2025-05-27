import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminLogin.css'; // reuse existing styles

const VotedCNICs = () => {
  const [cnics, setCnics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/votes/voted-cnic')
      .then(res => setCnics(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🧾 CNICs that Voted</h2>
        {cnics.length === 0 ? (
          <p>No one has voted yet.</p>
        ) : (
          <ul>
            {cnics.map((nic, i) => (
              <li key={i}>{nic}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VotedCNICs;

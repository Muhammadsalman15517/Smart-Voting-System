import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Voting.css';

const Voting = () => {
  const navigate = useNavigate();
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    // Fetch candidates
    axios.get('http://localhost:3000/options')
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err));

    // Set current date & time
    const now = new Date();
    setCurrentDateTime(now.toLocaleString());
  }, []);

  const handleVote = () => {
    // Validate age
    const birthYear = parseInt(dob.split('-')[0]);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    // Validate CNIC format
    const nicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

    if (!selectedCandidate || !nic || !dob) {
      alert('⚠️ Please fill in all fields.');
    } else if (!nicPattern.test(nic)) {
      alert('❌ Invalid NIC format. Use XXXXX-XXXXXXX-X');
    } else if (age < 18) {
      alert('❌ You must be at least 18 years old to vote!');
    } else {
      // Send vote to backend
      axios.post('http://localhost:3000/votes', {
        user: nic,
        optionId: selectedCandidate,
      })
      .then(() => {
        alert('✅ Vote successfully casted!');
        navigate('/thankyou');
      })
      .catch(() => alert('❌ Failed to submit vote.'));
    }
  };

  return (
    <div className="voting-container">
      <div className="voting-card">
        <div className="row">
          <div className="half">
            <label>Candidate:</label>
            <select
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
            >
              <option value="">-- Select --</option>
              {candidates.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>

          <div className="half">
            <label>Date & Time:</label>
            <input type="text" value={currentDateTime} readOnly />
          </div>
        </div>

        <label>Enter CNIC:</label>
        <input
          type="text"
          value={nic}
          onChange={(e) => {
            const formatted = e.target.value.replace(/[^0-9-]/g, '');
            if (formatted.length <= 15) {
              setNic(formatted);
            }
          }}
          placeholder="e.g., 12231-2243751-1"
          maxLength={15}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <button onClick={handleVote}>Cast Vote</button>
      </div>
    </div>
  );
};

export default Voting;

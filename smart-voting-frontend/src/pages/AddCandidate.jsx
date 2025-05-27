// src/pages/AddCandidate.jsx
import { useState } from 'react';
import axios from 'axios';
import './AddCandidate.css'; // ✅ Import your CSS

const AddCandidate = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Candidate name is required');
      return;
    }

    try {
      await axios.post('http://localhost:3000/options', { name });
      alert('✅ Candidate added successfully!');
      setName('');
    } catch (err) {
      console.error('Error adding candidate:', err);
      alert('❌ Failed to add candidate.');
    }
  };

  return (
    <div className="add-candidate-container">
      <div className="add-candidate-card">
        <h2>📝 Add New Candidate</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Candidate Name"
          />
          <button type="submit">Add Candidate</button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;

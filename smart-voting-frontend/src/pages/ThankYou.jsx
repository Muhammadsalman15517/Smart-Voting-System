import { useEffect, useState } from 'react';
import axios from 'axios';
import './ThankYou.css';

const ThankYou = () => {
  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/options')
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err));

    axios.get('http://localhost:3000/votes/results')
      .then(res => setResults(res.data))
      .catch(err => console.error('Error fetching votes:', err));
  }, []);

  // 🔁 Merge options with votes by comparing names
  const merged = candidates.map(c => {
    const match = results.find(r =>
      r.option === c.name ||            // if r.option is string
      r.option?.name === c.name         // if r.option is object
    );
    return {
      name: c.name,
      votes: match ? Number(match.count) : 0
    };
  });

  const ranked = [...merged].sort((a, b) => b.votes - a.votes);

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <h2>🎉 Thank You for Voting!</h2>

        {merged.map((candidate, index) => (
          <div className="vote-row" key={index}>
            <div className="candidate-box">{candidate.name}</div>
            <div className="vote-box">Total Votes: {candidate.votes}</div>
          </div>
        ))}

        <div className="live-ranking-box">
          <h3>📊 Live Ranking</h3>
          {ranked.length > 0 ? (
            <ul className="ranking-list">
              {ranked[0] && <li>🥇 Position 1: {ranked[0].name}</li>}
              {ranked[1] && <li>🥈 Position 2: {ranked[1].name}</li>}
              {ranked[2] && <li>🥉 Position 3: {ranked[2].name}</li>}
            </ul>
          ) : (
            <p>Waiting for votes to show ranking.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/voting');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-wrapper">
      <div className="left-container">
        <div className="welcome-card">
          <h1 className="animated-text">Welcome to<br />Smart Voting System</h1>
        </div>
      </div>
      
    </div>
  );
};

export default Welcome;

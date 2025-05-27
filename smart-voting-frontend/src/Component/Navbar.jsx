// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">🗳️ Smart Voting</div>
      <ul className="nav-links">
        <li><Link to="/">Welcome</Link></li>
        <li><Link to="/voting">Voting</Link></li>
        <li><Link to="/thankyou">Thank You</Link></li>
        <li><Link to="/admin">AdminLogin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

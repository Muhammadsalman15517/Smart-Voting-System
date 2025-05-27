// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Welcome from './pages/Welcome';
import Voting from './pages/Voting';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/AdminLogin';
import AddCandidate from './pages/AddCandidate';
import ManageCandidates from './pages/ManageCandidates';
import AdminPanel from './pages/AdminPanel';
import VotedCNICs from './pages/VotedCNICs';


function App() {
  const isAdmin = localStorage.getItem('admin') === 'true';

  return (
    <BrowserRouter>
     <Navbar /> {/* ✅ show navbar on all pages */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/add-candidate" element={<AddCandidate />} />
        <Route path="/manage-candidates" element={<ManageCandidates />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/voted-cnics" element={<VotedCNICs />} />
       <Route
  path="/admin-panel"
  element={
    localStorage.getItem('admin') === 'true' ? (
      <AdminPanel />
      
    ) : (
      
      <Navigate to="/admin" />
    )
    
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

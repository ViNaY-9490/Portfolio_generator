import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Registration/Registration.jsx';
import Login from './pages/Registration/Login.jsx';
import Loginsuccess from './pages/Loginsuccess.jsx';
import ForgotPassword from './pages/Registration/ForgotPassword.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginsuccess" element={<Loginsuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
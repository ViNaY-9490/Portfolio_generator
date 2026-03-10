import { useState } from 'react';
import axiosclient from '../../utils/axiosclient';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Import CSS file

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // ✅ Correct hook usage

  async function sendOtp(e) {
    e.preventDefault();
    await axiosclient.post('/forgot-password', { email });
    alert('otp sent');
    setStep(2);
  }

  async function resetPassword(e) {
    e.preventDefault();
    await axiosclient.post('/verify-otp', { email, otp });
    await axiosclient.post('/reset-password', { email, newPassword });
    alert("Password reset successful");
    navigate('/login'); // ✅ Correct usage
  }

  return (
    <div className="forgot-container">
      {step === 1 && (
        <form onSubmit={sendOtp} className="forgot-form">
          <h2>Forgot Password</h2>
          <input 
            type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder="Enter email" 
            className="input-field"
          />
          <button type="submit" className="btn">Send OTP</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={resetPassword} className="forgot-form">
          <h2>Reset Password</h2>
          <input 
            type="text" 
            value={otp} 
            onChange={(e)=>setOtp(e.target.value)} 
            placeholder="Enter OTP" 
            className="input-field"
          />
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e)=>setNewPassword(e.target.value)} 
            placeholder="New Password" 
            className="input-field"
          />
          <button type="submit" className="btn">Reset Password</button>
        </form>
      )}
    </div>
  );
}
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim() || !password.trim()) {
      alert('Please fill all details');
      return;
    }

    // Login status
    localStorage.setItem('isLoggedIn', 'true');

    // Save email for profile
    localStorage.setItem('userEmail', email.trim());

    // User ko wahi page par bhejna jahan se login kiya tha
    const from = location.state?.from?.pathname || '/';

    window.location.href = from;
  };

  return (
    <div className="login-container">
      {/* LOGIN HEADER */}
      <h1>🔐 Welcome Back!</h1>

      <p>Login to continue shopping at Mini Store.</p>

      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div>
          <label>Email</label>

          <br />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        {/* PASSWORD */}
        <div>
          <label>Password</label>

          <br />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        {/* LOGIN BUTTON */}
        <button type="submit">🔐 Login</button>
      </form>

      <p>Don't have an account? No registration required for this demo.</p>
    </div>
  );
}

export default Login;

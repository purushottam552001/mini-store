import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState(localStorage.getItem('userName') || '');

  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');

  const [address, setAddress] = useState(
    localStorage.getItem('userAddress') || ''
  );

  const [message, setMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();

    if (!name || !email || !address) {
      alert('Please fill all details');
      return;
    }

    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userAddress', address);

    setMessage('Profile updated successfully! ✅');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');

    navigate('/');
  };

  return (
    <div className="profile-container">
      <h1>👤 My Profile</h1>

      {message && <p className="profile-success">{message}</p>}

      <form onSubmit={handleSave}>
        <div className="profile-field">
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="profile-field">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="profile-field">
          <label>Address</label>

          <textarea
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button type="submit" className="save-profile-btn">
          Save Profile
        </button>
      </form>

      <button className="profile-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;

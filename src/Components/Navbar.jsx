import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { CartContext } from '../Context/CartContext';

function Navbar() {
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Total products in cart
  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');

    setIsLoggedIn(false);

    navigate('/');
  };

  return (
    <nav>
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        🛍️ Mini Store
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">🏠 Home</Link>

        <Link to="/products">🛍️ Products</Link>

        <Link to="/cart">🛒 Cart ({totalItems})</Link>

        {isLoggedIn && (
          <>
            <Link to="/orders">📦 My Orders</Link>

            <Link to="/profile">👤 Profile</Link>
          </>
        )}

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button onClick={handleLogout}>🚪 Logout</button>
        ) : (
          <Link to="/login">🔐 Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

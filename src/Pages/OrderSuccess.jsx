import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div className="success-container">
      <h1>🎉 Order Successful!</h1>

      <h2>Thank you for your purchase! ❤️</h2>

      <p>Your order has been placed successfully.</p>

      <p>We have received your order and will process it shortly.</p>

      <div>
        <p>📦 Your order is now being prepared.</p>

        <p>🚚 You will receive your order soon.</p>
      </div>

      <div>
        <Link to="/orders">
          <button className="checkout-btn">📦 View My Orders</button>
        </Link>

        <Link to="/products">
          <button className="continue-shopping-btn">
            🛍️ Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;

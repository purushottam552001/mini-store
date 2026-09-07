import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../Context/CartContext';
import { OrderContext } from '../Context/OrderContext';

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !address.trim()) {
      alert('Please fill all details');
      return;
    }

    // Create new order
    const newOrder = {
      id: 'ORD-' + Date.now(),

      date: new Date().toLocaleString(),

      customer: {
        name: name.trim(),
        email: email.trim(),
        address: address.trim(),
      },

      products: cart,

      paymentMethod,

      totalPrice,

      status: 'Order Placed',
    };

    // Save order
    addOrder(newOrder);

    // Empty cart
    clearCart();

    // Go to success page
    navigate('/order-success');
  };

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <h1>💳 Checkout</h1>

        <h2>Your cart is empty.</h2>

        <button className="checkout-btn" onClick={() => navigate('/products')}>
          Continue Shopping →
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>💳 Checkout</h1>

      <form onSubmit={handleSubmit}>
        {/* CUSTOMER DETAILS */}
        <div className="checkout-section">
          <h2>👤 Customer Details</h2>

          <label>Name</label>
          <br />

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <br />

          <label>Email</label>
          <br />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <br />

          <label>Address</label>
          <br />

          <textarea
            placeholder="Enter your complete address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* PAYMENT METHOD */}
        <div className="checkout-section">
          <h2>💰 Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card Payment
          </label>
        </div>

        {/* ORDER SUMMARY */}
        <div className="checkout-section">
          <h2>📦 Order Summary</h2>

          <div className="order-summary">
            {cart.map((product) => (
              <div className="order-summary-item" key={product.id}>
                <div>
                  <strong>{product.title}</strong>

                  <p>Quantity: {product.quantity}</p>
                </div>

                <strong>
                  ₹{(product.price * product.quantity).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
        </div>

        {/* PLACE ORDER */}
        <button type="submit" className="place-order-btn">
          🛍️ Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;

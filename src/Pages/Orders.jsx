import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { OrderContext } from '../Context/OrderContext';

function Orders() {
  const { orders, clearOrders } = useContext(OrderContext);

  const navigate = useNavigate();

  return (
    <div className="orders-container">
      {/* PAGE HEADER */}
      <h1>📦 My Orders</h1>

      <p>View your previous orders and order details.</p>

      {/* NO ORDERS */}
      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>🛍️ No orders yet.</h2>

          <p>You haven't placed any orders yet.</p>

          <button
            className="checkout-btn"
            onClick={() => navigate('/products')}
          >
            🛍️ Start Shopping →
          </button>
        </div>
      ) : (
        <>
          {/* ORDER LIST */}
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              {/* ORDER HEADER */}
              <div className="order-header">
                <div>
                  <h2>📦 {order.id}</h2>

                  <p>🕒 {order.date}</p>
                </div>

                <strong>✅ {order.status}</strong>
              </div>

              {/* CUSTOMER DETAILS */}
              <div>
                <h3>👤 Customer Details</h3>

                <p>
                  <strong>Name:</strong> {order.customer?.name}
                </p>

                <p>
                  <strong>Email:</strong> {order.customer?.email}
                </p>

                <p>
                  <strong>Address:</strong> {order.customer?.address}
                </p>
              </div>

              {/* PRODUCTS */}
              <div className="order-products">
                <h3>🛍️ Products</h3>

                {order.products.map((product) => (
                  <div className="order-product" key={product.id}>
                    <img src={product.image} alt={product.title} />

                    <div>
                      <h3>{product.title}</h3>

                      <p>Price: ₹{product.price.toFixed(2)}</p>

                      <p>Quantity: {product.quantity}</p>

                      <p>
                        Subtotal: ₹
                        {(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ORDER FOOTER */}
              <div className="order-footer">
                <p>
                  💳 Payment:{' '}
                  <strong>
                    {order.paymentMethod === 'cod'
                      ? 'Cash on Delivery'
                      : 'Card Payment'}
                  </strong>
                </p>

                <h2>Total: ₹{order.totalPrice.toFixed(2)}</h2>
              </div>
            </div>
          ))}

          {/* CLEAR ORDER HISTORY */}
          <button className="remove-btn" onClick={clearOrders}>
            🗑️ Clear Order History
          </button>
        </>
      )}
    </div>
  );
}

export default Orders;

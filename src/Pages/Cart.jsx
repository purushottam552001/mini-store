import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../Context/CartContext';

function Cart() {
  const navigate = useNavigate();

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  // Total quantity of all products
  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>🛒 Shopping Cart</h1>

      <p>Cart Items: {totalItems}</p>

      {cart.length === 0 ? (
        <div>
          <h2>Your cart is empty.</h2>

          <button
            className="checkout-btn"
            onClick={() => navigate('/products')}
          >
            Continue Shopping →
          </button>
        </div>
      ) : (
        <>
          {/* Cart Products */}

          {cart.map((product) => (
            <div className="cart-item" key={product.id}>
              <img src={product.image} alt={product.title} />

              <div>
                <h2>{product.title}</h2>

                <p>Price: ₹{product.price.toFixed(2)}</p>

                <p>
                  Subtotal: ₹{(product.price * product.quantity).toFixed(2)}
                </p>

                {/* Quantity */}

                <div className="quantity-buttons">
                  <button onClick={() => decreaseQuantity(product.id)}>
                    -
                  </button>

                  <span>{product.quantity}</span>

                  <button onClick={() => increaseQuantity(product.id)}>
                    +
                  </button>
                </div>

                <br />

                {/* Remove */}

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart Total */}

          <div className="cart-total">
            <p>
              Total Items: <strong>{totalItems}</strong>
            </p>

            <h2>Total: ₹{totalPrice.toFixed(2)}</h2>

            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

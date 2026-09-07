import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { CartContext } from '../Context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <h2 className="product-title">{product.title}</h2>

        <div className="product-rating">
          ⭐ {product.rating?.rate || 0}
          <span>({product.rating?.count || 0})</span>
        </div>

        <h3 className="product-price">₹{product.price.toFixed(2)}</h3>

        <div className="product-buttons">
          <Link to={`/products/${product.id}`}>
            <button className="details-btn">View Details</button>
          </Link>

          <button className="add-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

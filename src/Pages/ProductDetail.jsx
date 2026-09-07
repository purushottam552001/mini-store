import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Loader from '../Components/Loader';
import { CartContext } from '../Context/CartContext';

function ProductDetail() {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Product not found');
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>

        <button className="checkout-btn" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <Link to="/products">
        <button className="checkout-btn">← Back to Products</button>
      </Link>

      <div className="product-detail">
        <div>
          <img src={product.image} alt={product.title} width="300" />
        </div>

        <div>
          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <h1>{product.title}</h1>

          <p>
            ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0}{' '}
            reviews)
          </p>

          <h2>₹{product.price.toFixed(2)}</h2>

          <p>{product.description}</p>

          <button className="checkout-btn" onClick={() => addToCart(product)}>
            🛒 Add to Cart
          </button>

          <Link to="/cart">
            <button className="checkout-btn">Go to Cart →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

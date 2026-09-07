import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from '../Components/ProductCard';
import Loader from '../Components/Loader';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.slice(0, 4));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Welcome to Mini Store 🛍️</h1>

      <p>Find your favorite products at Mini Store.</p>

      <p>Explore our collection and add your favorite products to the cart.</p>

      <Link to="/products">
        <button className="checkout-btn">Shop Now →</button>
      </Link>

      <hr />

      <h2>⭐ Featured Products</h2>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link to="/products">
        <button className="checkout-btn">View All Products →</button>
      </Link>
    </div>
  );
}

export default Home;

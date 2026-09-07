import { useEffect, useState } from 'react';

import ProductCard from '../Components/ProductCard';
import Loader from '../Components/Loader';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search
  const [search, setSearch] = useState('');

  // Category
  const [category, setCategory] = useState('all');

  // Maximum Price
  const [maxPrice, setMaxPrice] = useState(1000);

  // Sort
  const [sort, setSort] = useState('default');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Search + Category + Price Filter
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === 'all' || product.category === category;

    const matchPrice = product.price <= maxPrice;

    return matchSearch && matchCategory && matchPrice;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'low') {
      return a.price - b.price;
    }

    if (sort === 'high') {
      return b.price - a.price;
    }

    return 0;
  });

  // Loading
  if (loading) {
    return <Loader />;
  }

  // Error
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
      </select>

      {/* Sort */}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="default">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>

      {/* Maximum Price */}
      <div>
        <label>Max Price: ₹{maxPrice}</label>

        <br />

        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      {/* Product Count */}
      <h3>{sortedProducts.length} Products Found</h3>

      {/* Products */}
      <div className="products-container">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h2>No products found</h2>
        )}
      </div>
    </div>
  );
}

export default Products;

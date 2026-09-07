import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';

import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Checkout from './Pages/Checkout';
import OrderSuccess from './Pages/OrderSuccess';
import Orders from './Pages/Orders';

import ProtectedRoute from './Components/ProtectedRoute';
import Profile from './Pages/Profile';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </>
  );
}

export default App;

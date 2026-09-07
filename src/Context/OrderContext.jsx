import { createContext, useState } from 'react';

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addOrder = (order) => {
    setOrders((previousOrders) => {
      const updatedOrders = [order, ...previousOrders];

      localStorage.setItem('orders', JSON.stringify(updatedOrders));

      return updatedOrders;
    });
  };

  const clearOrders = () => {
    setOrders([]);

    localStorage.removeItem('orders');
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;

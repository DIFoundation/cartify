'use client';

import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discounted, setDiscounted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;

    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    updateCart(updated);
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const getTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return discounted ? total * 0.9 : total;
  };

  const handleApplyCoupon = () => {
    const pattern = /^WEB3BRIDGECOHORTx$/;
    if (pattern.test(coupon)) {
      setDiscounted(true);
      setError('');
    } else {
      setError('Invalid coupon code. Try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 px-2 border rounded"
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <label className="block mb-2 font-medium">Coupon Code:</label>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Apply Coupon
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>

          <h3 className="text-xl font-bold mt-4">Total: ${getTotal().toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

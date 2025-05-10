'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const saveCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    saveCart(updatedCart);
    toast.success(`${product.name} added to cart`);
  };

  return {
    cart,
    addToCart,
  };
}

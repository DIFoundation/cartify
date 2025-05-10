"use client";

import useCart from "@/hooks/useCart";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function CheckoutPage() {
  const { cart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", coupon: "" });
  const [discount, setDiscount] = useState(0);

    const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    const code = form.coupon.trim();
    const validCode = /^WEB3BRIDGECOHORTx$/;

    if (validCode.test(code)) {
      setDiscount(0.1); // 10%
      toast.success("Coupon applied: 10% off");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      return toast.error("Please fill in all required fields");
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - subtotal * discount;

    toast.success("Order placed successfully!");

  router.push(
    `/success?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}&total=${total}&products=${encodeURIComponent(JSON.stringify(cart))}`
  );

  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - subtotal * discount;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="border-b py-2">
                {item.name} (x{item.quantity}) - ₦{item.price * item.quantity}
              </li>
            ))}
          </ul>

          <p>Subtotal: ₦{subtotal.toFixed(2)}</p>
          {discount > 0 && <p>Discount: -{(subtotal * discount).toFixed(2)}</p>}
          <p className="font-bold">Total: ₦{total.toFixed(2)}</p>

          <div className="mt-6">
            <input
              type="text"
              name="coupon"
              placeholder="Enter coupon code"
              value={form.coupon}
              onChange={handleChange}
              className="border p-2 mr-2"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-blue-600 text-white px-4 py-2"
            >
              Apply Coupon
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
            {/* 👇 Card Details (Mock Inputs) */}
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              maxLength={16}
              pattern="\d*"
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                maxLength={5}
                onChange={handleChange}
                className="w-1/2 border p-2"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                maxLength={3}
                pattern="\d*"
                onChange={handleChange}
                className="w-1/2 border p-2"
                required
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2">
              Place Order
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-2">
            By placing your order, you agree to our Terms and Conditions.
            </p>
        </>
      )}
    </div>
  );
}

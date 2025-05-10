"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const total = searchParams.get("total");
  const products = JSON.parse(searchParams.get("products") || "[]");

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Successful!
      </h1>
      <p className="text-lg mb-6">
        Thank you <strong>{name}</strong> for your purchase.
      </p>
      <p className="mb-2">
        A confirmation has been sent to: <strong>{email}</strong>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Order Summary</h2>
      <ul className="text-left">
        {products.map((item, index) => (
          <li key={index} className="border-b py-2">
            {item.name} (x{item.quantity}) - ₦{item.price * item.quantity}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xl font-bold">
        Total Paid: ₦{Number(total).toFixed(2)}
      </p>

      <p className="mt-6 text-gray-600">We appreciate your business!</p>
      <Link
        href="/"
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
    </Suspense>
  );
}

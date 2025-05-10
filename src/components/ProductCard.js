'use client';
import Image from "next/image";

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    alert(`Added ${product.name} to cart`);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <Image
        width={5000}
        height={5000}
        src={product.image}
        alt={product.name}
        className="h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-orange-600 font-bold mb-4">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

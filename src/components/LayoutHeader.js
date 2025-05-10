import Link from 'next/link';

export default function LayoutHeader() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-blue-800">
          Cartify
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-600">
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}

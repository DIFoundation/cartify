import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutHeader from '../components/LayoutHeader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cartify - Smart Shopping Cart",
  description: "A functional shopping cart with coupon discounts and persistent storage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900 min-h-screen`}
      >
        <LayoutHeader />
        <main className="max-w-6xl mx-auto p-4">
        {children}
        </main>
      </body>
    </html>
  );
}

import Link from "next/link";

export default function LandingPageNav() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-400 bg-white text-gray-900">
      {/* Logo Kiri */}
      <div className="text-xl font-bold">
        <Link href="/">Clickit</Link>
      </div>

      {/* Navigasi Tengah */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
        <Link href="/about" className="hover:text-blue-600 transition">About</Link>
        <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
      </div>

      {/* Tombol Kanan */}
      <div className="flex items-center gap-4 text-sm font-medium">
        <Link href="/login-affiliator" className="text-white py-1 px-2 bg-blue-600 transition rounded-2xl">Login as affiliator</Link>
        <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
        <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

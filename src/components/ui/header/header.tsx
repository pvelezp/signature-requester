"use client";
import Link from "next/link";

const Header = () => (
  <header className="flex justify-between items-center p-6 w-full shadow-sm">
    <Link href="/" className="font-bold text-lg">
      Sign Requester
    </Link>

    <nav>
      <Link className="font-semibold text-gray-600" href="/documents">
        My Documents
      </Link>
    </nav>
  </header>
);

export default Header;

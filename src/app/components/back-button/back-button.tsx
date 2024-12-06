"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="pt-4 px-6">
      <button
        onClick={() => router.back()}
        className="left-4 bg-white border border-gray-300 p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default BackButton;

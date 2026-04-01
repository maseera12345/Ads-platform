// import Link from 'next/link';

// export default function Navbar() {
//   return (
//     <nav className="bg-blue-600 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-white text-xl font-bold">
//           AdFlow Pro
//         </Link>
//         <div className="space-x-4">
//           <Link href="/" className="text-white hover:text-gray-200">
//             Home
//           </Link>
//           <Link href="/ads" className="text-white hover:text-gray-200">
//             Ads
//           </Link>
//           <Link href="/create" className="text-white hover:text-gray-200">
//             Create Ad
//           </Link>
//           <Link href="/approved" className="text-white hover:text-gray-200">
//             Approved
//           </Link>
//           <Link href="/admin" className="text-white hover:text-gray-200">
//             Admin
//           </Link>
//           {/* <Link href="/login" className="text-white hover:text-gray-200">
//             Login
//           </Link> */}
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-white text-xl font-bold">
          AdFlow Pro
        </Link>

        {/* Mobile Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white hover:text-gray-200">Home</Link>
          <Link href="/ads" className="text-white hover:text-gray-200">Ads</Link>
          <Link href="/create" className="text-white hover:text-gray-200">Create Ad</Link>
          <Link href="/approved" className="text-white hover:text-gray-200">Approved</Link>
          <Link href="/admin" className="text-white hover:text-gray-200">Admin</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col space-y-2 mt-3">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/ads" className="text-white">Ads</Link>
          <Link href="/create" className="text-white">Create Ad</Link>
          <Link href="/approved" className="text-white">Approved</Link>
          <Link href="/admin" className="text-white">Admin</Link>
        </div>
      )}
    </nav>
  );
}
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
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-white text-xl font-bold">
          AdFlow Pro
        </Link>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div className="hidden md:flex flex-wrap items-center gap-4 text-sm font-medium text-white">
          <Link href="/">Home</Link>
          <Link href="/ads">Explore</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/create">Create</Link>
          <Link href="/approved">Published</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/moderator">Moderator</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login" className="rounded-full border border-white px-3 py-1 hover:bg-white hover:text-blue-600 transition">
            Login
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-2 mt-4 px-2 text-white">
          <Link href="/" className="block rounded-2xl px-4 py-3 hover:bg-blue-500">Home</Link>
          <Link href="/ads" className="block rounded-2xl px-4 py-3 hover:bg-blue-500">Explore</Link>
          <Link href="/packages" className="block rounded-2xl px-4 py-3 hover:bg-blue-500">Packages</Link>
          <Link href="/create" className="block rounded-2xl px-4 py-3 hover:bg-blue-500">Create</Link>
          <Link href="/approved" className="block rounded-2xl px-4 py-3 hover:bg-blue-500">Published</Link>
          <Link href="/dashboard" className="block rounded-2xl px-4 py-3 hover:bg-blue-500">Dashboard</Link>
          <Link href="/moderator" className="block rounded-2xl px-4 py-3 hover:bg-blue-500">Moderator</Link>
          <Link href="/admin" className="block rounded-2xl px-4 py-3 hover:bg-blue-500">Admin</Link>
          <Link href="/login" className="block rounded-2xl bg-white px-4 py-3 text-blue-600 font-semibold">Login</Link>
        </div>
      )}
    </nav>
  );
}
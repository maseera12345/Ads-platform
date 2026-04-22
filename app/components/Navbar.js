"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-white text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AdFlow</span>
          <span className="text-white"> Pro</span>
        </Link>

        <button
          className="text-slate-300 hover:text-white md:hidden transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div className="hidden md:flex flex-wrap items-center gap-1 text-sm font-medium">
          <Link href="/" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-slate-800">Home</Link>
          <Link href="/ads" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-slate-800">Explore</Link>
          <Link href="/packages" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-slate-800">Packages</Link>
          <Link href="/create" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-slate-800">Create</Link>
          <Link href="/approved" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-slate-800">Published</Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-slate-800">Dashboard</Link>
          <Link href="/moderator" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-slate-800">Moderator</Link>
          <Link href="/admin" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-slate-800">Admin</Link>
          <Link href="/login" className="ml-4 rounded-lg border border-blue-500 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 font-semibold transition-all duration-200 hover:shadow-lg">
            Login
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-4 border-t border-slate-800">
          <Link href="/" className="text-slate-300 hover:text-white block rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors">Home</Link>
          <Link href="/ads" className="text-slate-300 hover:text-white block rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors">Explore</Link>
          <Link href="/packages" className="text-slate-300 hover:text-white block rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors">Packages</Link>
          <Link href="/create" className="text-slate-300 hover:text-white block rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors">Create</Link>
          <Link href="/approved" className="text-slate-300 hover:text-white block rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors">Published</Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white block rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors">Dashboard</Link>
          <Link href="/moderator" className="text-slate-300 hover:text-white block rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors">Moderator</Link>
          <Link href="/admin" className="text-slate-300 hover:text-white block rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors">Admin</Link>
          <Link href="/login" className="block rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold mt-2 transition-all duration-200 text-center">Login</Link>
        </div>
      )}
    </nav>
  );
}
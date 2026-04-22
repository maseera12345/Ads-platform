"use client"

import Link from "next/link"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (!error) {
      alert("Registration successful. Please log in.")
      router.push("/login")
    } else {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Create your account</h1>
        <p className="text-slate-600 text-center mb-8 text-sm">Register to start submitting ads and tracking package approval.</p>

        <label className="block mb-4">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition"
          />
        </label>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 shadow-sm hover:shadow-md"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition">Login here</Link>
        </p>
      </div>
    </div>
  )
}

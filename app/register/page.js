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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-4 text-center">Create your account</h1>
        <p className="text-slate-500 text-center mb-8">Register to start submitting ads and tracking package approval.</p>

        <label className="block mb-4">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </label>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  )
}

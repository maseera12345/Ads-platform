"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      setUser(user)
      const { data } = await supabase
        .from("ads")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setAds(data || [])
      setLoading(false)
    }

    loadUser()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">Loading your dashboard...</div>
        ) : !user ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-md border border-slate-200">
            <h1 className="text-3xl font-bold text-slate-900">Client Dashboard</h1>
            <p className="mt-4 text-slate-600">You need to log in to view your ads.</p>
            <Link href="/login" className="mt-8 inline-flex rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-semibold transition-all duration-200">Login</Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="rounded-2xl bg-white p-8 shadow-md border border-slate-200">
              <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.email}</h1>
              <p className="mt-3 text-slate-600">Manage your submitted ads, payment proof, and listing status.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <StatCard title="Your Ads" value={ads.length} />
              <StatCard title="Published" value={ads.filter((ad) => ["approved", "published"].includes(ad.status)).length} />
              <StatCard title="Pending" value={ads.filter((ad) => ["submitted", "payment_pending", "payment_submitted"].includes(ad.status)).length} />
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-md border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Your Ads</h2>
              {ads.length === 0 ? (
                <div className="mt-6 text-slate-600">No ads found yet. Start by creating a new listing.</div>
              ) : (
                <div className="mt-6 space-y-4">
                  {ads.map((ad) => (
                    <div key={ad.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5 hover:border-blue-500 transition-colors">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{ad.title}</h3>
                          <p className="text-sm text-slate-600 mt-1 font-medium">{ad.status}</p>
                        </div>
                        <Link href={`/ads/${ad.id}`} className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold transition-all duration-200 text-center">View</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-md border border-slate-200 text-center hover:border-blue-500 transition-colors">
      <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">{title}</div>
      <div className="mt-4 text-4xl font-bold text-slate-900">{value}</div>
    </div>
  )
}

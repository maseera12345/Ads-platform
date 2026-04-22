"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ModeratorPage() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQueue = async () => {
      setLoading(true)
      const { data } = await supabase
        .from("ads")
        .select("*")
        .in("status", ["submitted", "payment_submitted"])
        .order("created_at", { ascending: false })

      setAds(data || [])
      setLoading(false)
    }

    fetchQueue()
  }, [])

  const updateStatus = async (id, status) => {
    await supabase.from("ads").update({ status }).eq("id", id)
    const { data } = await supabase
      .from("ads")
      .select("*")
      .in("status", ["submitted", "payment_submitted"])
      .order("created_at", { ascending: false })

    setAds(data || [])
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 rounded-2xl bg-white p-8 shadow-md border border-slate-200">
          <h1 className="text-4xl font-bold text-slate-900">Moderator Review Queue</h1>
          <p className="mt-3 text-slate-600">Review submitted ads and update listing status for publishing.</p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">Loading moderation queue...</div>
        ) : ads.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">No ads are waiting for review.</div>
        ) : (
          <div className="grid gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{ad.title}</h2>
                    <p className="mt-2 text-slate-600">{ad.description || "No description."}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 font-semibold text-slate-700">Status: {ad.status}</span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 font-semibold text-slate-700">Submitted: {new Date(ad.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => updateStatus(ad.id, "verified")} className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md">✓ Verify</button>
                    <button onClick={() => updateStatus(ad.id, "rejected")} className="rounded-lg bg-red-600 hover:bg-red-700 px-5 py-2 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md">✕ Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

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
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">Moderator Review Queue</h1>
          <p className="mt-3 text-slate-600">Review submitted ads and update listing status for publishing.</p>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">Loading moderation queue...</div>
        ) : ads.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">No ads are waiting for review.</div>
        ) : (
          <div className="grid gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{ad.title}</h2>
                    <p className="mt-2 text-slate-600">{ad.description || "No description."}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
                      <span className="rounded-full bg-slate-100 px-3 py-1">Status: {ad.status}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">Submitted: {new Date(ad.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => updateStatus(ad.id, "verified")} className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition">Verify</button>
                    <button onClick={() => updateStatus(ad.id, "rejected")} className="rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition">Reject</button>
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

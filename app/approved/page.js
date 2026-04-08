"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ApprovedAds() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApproved = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .in("status", ["approved", "published"])
        .order("created_at", { ascending: false })

      if (!error) {
        setAds(data || [])
      }

      setLoading(false)
    }

    fetchApproved()
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-900">✅ Published Listings</h1>
        <p className="text-slate-600 mt-1">This page shows all ads that passed approval and are live.</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center text-slate-500">Loading approved ads...</div>
        ) : ads.length === 0 ? (
          <div className="text-center text-slate-500 bg-white p-10 rounded-3xl shadow">No approved ads found</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad) => (
              <div key={ad.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl">
                <h2 className="text-xl font-semibold text-slate-900">{ad.title}</h2>
                <p className="mt-3 text-slate-600">{ad.description}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                  <span>{ad.city || "Location not specified"}</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Published</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

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
    <div className="min-h-screen bg-slate-50 p-6 py-12">
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-slate-900">✅ Published Listings</h1>
        <p className="text-slate-600 mt-2">This page shows all ads that passed approval and are live.</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center text-slate-500 rounded-2xl bg-white p-12 shadow-md border border-slate-200">Loading approved ads...</div>
        ) : ads.length === 0 ? (
          <div className="text-center text-slate-500 bg-white p-12 rounded-2xl shadow-md border border-slate-200">No approved ads found</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad) => (
              <div key={ad.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:border-blue-500 hover:-translate-y-1">
                <h2 className="text-lg font-bold text-slate-900">{ad.title}</h2>
                <p className="mt-3 text-slate-600 text-sm line-clamp-2">{ad.description}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-slate-600">📍 {ad.city || "Location not specified"}</span>
                  <span className="rounded-lg bg-emerald-100 text-emerald-700 px-3 py-1 font-semibold">Published</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

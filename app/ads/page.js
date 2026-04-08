"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdsPage() {
  const [ads, setAds] = useState([])
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("newest")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true)
      const { data } = await supabase
        .from("ads")
        .select("*")
        .in("status", ["approved", "published"])
        .order("created_at", { ascending: false })

      setAds(data || [])
      setLoading(false)
    }

    fetchAds()
  }, [])

  const filteredAds = ads
    .filter((ad) =>
      ad.title?.toLowerCase().includes(query.toLowerCase()) ||
      ad.description?.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at)
      }
      return new Date(b.created_at) - new Date(a.created_at)
    })

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">Explore Ads</h1>
          <p className="mt-3 text-slate-600">Search verified listings and discover package-based sponsored ads.</p>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              type="search"
              placeholder="Search by title or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 rounded-3xl border border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-3xl border border-slate-300 bg-white px-4 py-3 shadow-sm"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">Loading ads...</div>
        ) : filteredAds.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">No matching ads found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredAds.map((ad) => (
              <Link
                key={ad.id}
                href={`/ads/${ad.id}`}
                className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{ad.city || "General"}</div>
                <h2 className="mt-4 text-2xl font-semibold">{ad.title}</h2>
                <p className="mt-3 text-slate-600">{ad.description || "No description available."}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                  <span>{new Date(ad.created_at).toLocaleDateString()}</span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">{ad.status}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

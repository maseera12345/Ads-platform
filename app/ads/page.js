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
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 rounded-2xl bg-white p-8 shadow-md border border-slate-200">
          <h1 className="text-4xl font-bold text-slate-900">Explore Ads</h1>
          <p className="mt-3 text-slate-600">Search verified listings and discover package-based sponsored ads.</p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              type="search"
              placeholder="Search by title or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none transition"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none transition"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">Loading ads...</div>
        ) : filteredAds.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">No matching ads found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredAds.map((ad) => {
              const url = ad.image_url || ad.media_url || ""
              let imgUrl = url
              if (url.includes("youtube.com") || url.includes("youtu.be")) {
                const match = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/)
                if (match?.[1]) {
                  imgUrl = `data:image/jpeg;base64,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`
                }
              }

              return (
                <Link
                  key={ad.id}
                  href={`/ads/${ad.id}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500"
                >
                  {imgUrl ? (
                    <div className="-mx-6 -mt-6 mb-6 overflow-hidden">
                      <img src={imgUrl} alt={ad.title || "Thumbnail"} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="-mx-6 -mt-6 mb-6 h-48 bg-slate-50 flex flex-col items-center justify-center text-slate-300 border-b border-slate-100">
                      <span className="text-4xl opacity-50">🖼️</span>
                    </div>
                  )}
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">{ad.city || "General"}</div>
                  <h2 className="mt-4 text-xl font-bold text-slate-900">{ad.title}</h2>
                  <p className="mt-3 text-slate-600 text-sm line-clamp-2">{ad.description || "No description available."}</p>
                  <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                    <span>{new Date(ad.created_at).toLocaleDateString()}</span>
                    <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 font-semibold">{ad.status}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

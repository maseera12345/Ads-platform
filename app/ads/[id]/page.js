"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdDetailPage() {
  const params = useParams()
  const id = params?.id
  const [ad, setAd] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAd = async () => {
      if (!id) return
      setLoading(true)
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("id", id)
        .single()

      if (!error) {
        setAd(data)
      }
      setLoading(false)
    }

    fetchAd()
  }, [id])

  const renderMedia = () => {
    const url = ad?.image_url || ad?.media_url || ""
    if (!url) {
      return <div className="rounded-2xl bg-slate-100 p-20 text-center text-slate-500 border border-slate-200">No media available</div>
    }

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const match = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/)
      const videoId = match?.[1]
      const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : url
      return <img src={thumbnail} alt="YouTube thumbnail" className="h-72 w-full rounded-2xl object-cover border border-slate-200" />
    }

    return <img src={url} alt={ad?.title || "Ad media"} className="h-72 w-full rounded-2xl object-cover border border-slate-200" />
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/ads" className="text-blue-700 hover:underline">← Back to Explore</Link>

        {loading ? (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">Loading listing details...</div>
        ) : !ad ? (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">Ad not found.</div>
        ) : (
          <div className="mt-6 rounded-2xl bg-white p-8 shadow-md border border-slate-200">
            {renderMedia()}
            <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <h1 className="text-4xl font-bold text-slate-900">{ad.title}</h1>
                <p className="mt-4 text-slate-600 leading-relaxed">{ad.description || "No description provided."}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-lg border border-slate-200 bg-slate-100 text-slate-700 px-3 py-1 font-semibold">Status: {ad.status}</span>
                  <span className="rounded-lg border border-slate-200 bg-slate-100 text-slate-700 px-3 py-1 font-semibold">City: {ad.city || "N/A"}</span>
                  <span className="rounded-lg border border-slate-200 bg-slate-100 text-slate-700 px-3 py-1 font-semibold">Package: {ad.package || ad.package_id || "Standard"}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-blue-500 transition-colors">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">Seller Summary</p>
                <p className="mt-4 text-sm text-slate-600">Submitted by: <span className="font-semibold text-slate-900">{ad.user_id || "Unknown"}</span></p>
                <p className="mt-3 text-sm text-slate-600">Created: <span className="font-semibold text-slate-900">{new Date(ad.created_at).toLocaleDateString()}</span></p>
                <p className="mt-3 text-sm text-slate-600">Expiry: <span className="font-semibold text-slate-900">{ad.expire_at ? new Date(ad.expire_at).toLocaleDateString() : "Not set"}</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

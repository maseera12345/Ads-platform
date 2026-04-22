"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchAds = async () => {
    setLoading(true)
    setError("")
    const { data, error } = await supabase.from("ads").select("*").order("created_at", { ascending: false })

    if (error) {
      setError(error.message)
      setAds([])
    } else {
      setAds(data || [])
    }
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    setLoading(true)
    await supabase.from("ads").update({ status }).eq("id", id)
    fetchAds()
  }

  useEffect(() => {
    fetchAds()
  }, [])

  const stats = useMemo(() => ({
    total: ads.length,
    submitted: ads.filter((ad) => ad.status === "submitted").length,
    published: ads.filter((ad) => ad.status === "published").length,
    rejected: ads.filter((ad) => ad.status === "rejected").length,
    paymentSubmitted: ads.filter((ad) => ad.status === "payment_submitted").length,
  }), [ads])

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 rounded-2xl bg-white p-8 shadow-md border border-slate-200">
          <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-3 text-slate-600">Verify payments, review submitted listings, and publish approved ads.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5 mb-10">
          <StatCard label="Total Ads" value={stats.total} />
          <StatCard label="Submitted" value={stats.submitted} />
          <StatCard label="Payment Submitted" value={stats.paymentSubmitted} />
          <StatCard label="Published" value={stats.published} />
          <StatCard label="Rejected" value={stats.rejected} />
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-5 text-red-700 shadow-sm">{error}</div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">Loading ads...</div>
        ) : ads.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">No ads found.</div>
        ) : (
          <div className="grid gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold text-slate-900">{ad.title}</h2>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{ad.status}</span>
                    </div>
                    <p className="mt-3 text-slate-600">{ad.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
                      <span>📦 Package: {ad.package || ad.package_id || "Standard"}</span>
                      <span>📍 City: {ad.city || "N/A"}</span>
                      <span>📅 Created: {new Date(ad.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => updateStatus(ad.id, "submitted")} className="rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition">Submitted</button>
                    <button onClick={() => updateStatus(ad.id, "payment_pending")} className="rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-700 transition">Payment Pending</button>
                    <button onClick={() => updateStatus(ad.id, "payment_submitted")} className="rounded-lg border border-blue-300 bg-blue-50 hover:bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 transition">Payment Submitted</button>
                    <button onClick={() => updateStatus(ad.id, "verified")} className="rounded-lg border border-indigo-300 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-700 transition">Verify</button>
                    <button onClick={() => updateStatus(ad.id, "published")} className="rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700 transition">Publish</button>
                    <button onClick={() => updateStatus(ad.id, "rejected")} className="rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 transition">Reject</button>
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

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-md border border-slate-200 hover:border-blue-500 transition-colors">
      <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">{label}</div>
      <div className="mt-4 text-3xl font-bold text-slate-900">{value}</div>
    </div>
  )
}

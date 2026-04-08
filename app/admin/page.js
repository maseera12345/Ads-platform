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
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-3 text-slate-600">Verify payments, review submitted listings, and publish approved ads.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5 mb-8">
          <StatCard label="Total Ads" value={stats.total} />
          <StatCard label="Submitted" value={stats.submitted} />
          <StatCard label="Payment Submitted" value={stats.paymentSubmitted} />
          <StatCard label="Published" value={stats.published} />
          <StatCard label="Rejected" value={stats.rejected} />
        </div>

        {error && (
          <div className="mb-6 rounded-3xl bg-red-100 p-5 text-red-700 shadow-sm">{error}</div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">Loading ads...</div>
        ) : ads.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">No ads found.</div>
        ) : (
          <div className="grid gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold text-slate-900">{ad.title}</h2>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{ad.status}</span>
                    </div>
                    <p className="mt-3 text-slate-600">{ad.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
                      <span>Package: {ad.package || ad.package_id || "Standard"}</span>
                      <span>City: {ad.city || "N/A"}</span>
                      <span>Created: {new Date(ad.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => updateStatus(ad.id, "submitted")} className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50">Submitted</button>
                    <button onClick={() => updateStatus(ad.id, "payment_pending")} className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2 text-amber-700 hover:bg-amber-100">Payment Pending</button>
                    <button onClick={() => updateStatus(ad.id, "payment_submitted")} className="rounded-2xl border border-blue-300 bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100">Payment Submitted</button>
                    <button onClick={() => updateStatus(ad.id, "verified")} className="rounded-2xl border border-indigo-300 bg-indigo-50 px-4 py-2 text-indigo-700 hover:bg-indigo-100">Verify</button>
                    <button onClick={() => updateStatus(ad.id, "published")} className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-emerald-700 hover:bg-emerald-100">Publish</button>
                    <button onClick={() => updateStatus(ad.id, "rejected")} className="rounded-2xl border border-red-300 bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100">Reject</button>
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
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
      <div className="text-sm uppercase tracking-[0.3em] text-slate-500">{label}</div>
      <div className="mt-4 text-3xl font-bold text-slate-900">{value}</div>
    </div>
  )
}

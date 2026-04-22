

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  })

  useEffect(() => {
    const fetchStats = async () => {

      const { data } = await supabase.from("ads").select("*")

      const total = data.length
      const approved = data.filter(a => a.status === "approved").length
      const rejected = data.filter(a => a.status === "rejected").length
      const pending = data.filter(a => a.status === "pending").length

      setStats({ total, approved, rejected, pending })
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 p-6 py-12">

      <h1 className="text-4xl font-bold mb-10 text-slate-900">
        📊 Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <Card title="Total Ads" value={stats.total} />
        <Card title="Approved" value={stats.approved} />
        <Card title="Rejected" value={stats.rejected} />
        <Card title="Pending" value={stats.pending} />

      </div>

    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow text-center">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}
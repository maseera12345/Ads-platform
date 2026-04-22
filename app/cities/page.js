"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function CitiesPage() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("cities").select("*").eq("is_active", true).order("sort_order")
      setCities(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">📍 Browse by City</h1>
          <p className="mt-4 text-slate-600">Find listings in your city</p>
        </div>
        {loading ? <div className="text-center">Loading...</div> : <div className="grid gap-4 md:grid-cols-4">
          {cities.map((city) => (<Link key={city.id} href={`/city/${city.slug}`} className="rounded-lg border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition text-center">
            <h3 className="font-bold text-slate-900">{city.name}</h3>
            <p className="text-sm text-slate-600">{city.province}</p>
          </Link>))}
        </div>}
      </div>
    </div>
  )
}

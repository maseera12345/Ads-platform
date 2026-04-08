"use client"

import Link from "next/link"

const packages = [
  { name: "Basic", duration: "7 days", price: "Entry", features: ["Standard category listing", "No featured placement", "Basic support"] },
  { name: "Standard", duration: "15 days", price: "Value", features: ["Category priority", "Manual refresh", "Highlighted badge"] },
  { name: "Premium", duration: "30 days", price: "Premium", features: ["Homepage visibility", "Auto refresh", "Featured placement"] }
]

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Package engine</p>
          <h1 className="text-4xl font-bold text-slate-900">Listing Packages</h1>
          <p className="mt-4 text-slate-600">Compare package durations, homepage placement, and ranking weight.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl">
              <div className="text-sm uppercase tracking-[0.3em] text-slate-500">{pkg.name}</div>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">{pkg.duration}</h2>
              <p className="mt-2 text-slate-600">{pkg.price}</p>
              <ul className="mt-6 space-y-3 text-slate-600">
                {pkg.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link href="/create" className="mt-8 inline-flex rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">Choose {pkg.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

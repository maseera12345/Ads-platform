"use client"

import Link from "next/link"

const packages = [
  { name: "Basic", duration: "7 days", price: "Entry", features: ["Standard category listing", "No featured placement", "Basic support"] },
  { name: "Standard", duration: "15 days", price: "Value", features: ["Category priority", "Manual refresh", "Highlighted badge"] },
  { name: "Premium", duration: "30 days", price: "Premium", features: ["Homepage visibility", "Auto refresh", "Featured placement"] }
]

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-semibold">Package Engine</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Listing Packages</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Compare package durations, homepage placement, and ranking weight.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.name} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-200 hover:shadow-lg hover:border-blue-500 hover:-translate-y-1">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">{pkg.name}</div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">{pkg.duration}</h2>
              <p className="mt-2 text-sm text-blue-600 font-semibold">{pkg.price}</p>
              <ul className="mt-6 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="text-slate-600 text-sm flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/create" className="mt-8 inline-flex rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-3 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md">Choose {pkg.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

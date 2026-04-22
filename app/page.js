"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const packages = [
  { title: "Basic", duration: "7 days", description: "Entry-level listing with standard placement.", highlight: "Best for new ads." },
  { title: "Standard", duration: "15 days", description: "Boosted visibility inside category results.", highlight: "Balanced reach." },
  { title: "Premium", duration: "30 days", description: "Homepage placement and featured weight.", highlight: "Highest visibility." }
]

export default function Home() {
  const [featuredAds, setFeaturedAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestAds = async () => {
      setLoading(true)
      const { data } = await supabase
        .from("ads")
        .select("*")
        .in("status", ["approved", "published"])
        .order("created_at", { ascending: false })
        .limit(6)

      setFeaturedAds(data || [])
      setLoading(false)
    }

    fetchLatestAds()
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="lg:w-3/5">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300 font-semibold">Professional Marketplace</p>
            <h1 className="mt-6 text-5xl font-bold leading-tight">AdFlow Pro — Moderated Ads, Verified Payments, Premium Packages</h1>
            <p className="mt-6 text-lg text-slate-200">Build a production-style ad workflow platform where clients submit listings, moderators review content, and admins publish only verified ads.</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/ads" className="inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 px-8 py-3 text-white font-semibold shadow-lg transition-all duration-200 hover:shadow-xl">Browse Ads</Link>
              <Link href="/create" className="inline-flex items-center justify-center rounded-lg border-2 border-blue-400 bg-transparent hover:bg-blue-950 px-8 py-3 text-white font-semibold transition-all duration-200">Submit Listing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white p-10 shadow-md border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900">Advanced Marketplace Workflow</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">The platform supports sponsored listings with moderation, payment verification, package-based visibility and expiration, and analytics for admins and moderators.</p>

            <ul className="mt-8 space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Submit ad requests with package selection.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Moderators review content quality and add notes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Admins verify payments and publish approved ads.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Only approved / published ads are visible publicly.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-900 p-10 text-white shadow-md">
            <h3 className="text-2xl font-semibold">Platform Highlights</h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-5 hover:border-blue-500 transition-colors">
                <h4 className="font-semibold text-blue-400">External Media</h4>
                <p className="text-slate-300 mt-2 text-sm">Only external URLs are stored and previewed safely.</p>
              </div>
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-5 hover:border-blue-500 transition-colors">
                <h4 className="font-semibold text-blue-400">Package Rules</h4>
                <p className="text-slate-300 mt-2 text-sm">Packages control duration, weight, and homepage placement.</p>
              </div>
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-5 hover:border-blue-500 transition-colors">
                <h4 className="font-semibold text-blue-400">Automation Ready</h4>
                <p className="text-slate-300 mt-2 text-sm">Scheduled expiry and publish logic can be added with server jobs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-semibold">Premium Options</p>
              <h2 className="text-4xl font-bold text-slate-900">Choose your listing plan</h2>
            </div>
            <Link href="/packages" className="rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-semibold transition-all duration-200">View all packages</Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.title} className="rounded-2xl bg-white p-8 shadow-md border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">{pkg.title}</div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{pkg.duration}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{pkg.description}</p>
                <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4 text-slate-800 font-semibold text-sm">{pkg.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-semibold">Live Listings</p>
            <h2 className="text-4xl font-bold text-slate-900">Recent approved ads</h2>
          </div>
          <Link href="/ads" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Browse all ads →</Link>
        </div>

        {loading ? (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">Loading ads...</div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredAds.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-md border border-slate-200">No live listings yet.</div>
            ) : (
              featuredAds.map((ad) => (
                <Link key={ad.id} href={`/ads/${ad.id}`} className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500">
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">{ad.city || "City"}</div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">{ad.title}</h3>
                    <p className="mt-4 text-slate-600 text-sm line-clamp-2">{ad.description || "No description provided."}</p>
                  </div>
                  <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">View details →</div>
                </Link>
              ))
            )}
          </div>
        )}
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all">
            <h3 className="text-xl font-semibold">Safe Workflow</h3>
            <p className="mt-4 text-blue-100">A moderator and admin workflow keeps only valid ads visible.</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all">
            <h3 className="text-xl font-semibold">External Media</h3>
            <p className="mt-4 text-blue-100">Media stored only as external URLs with preview support.</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all">
            <h3 className="text-xl font-semibold">Reporting Ready</h3>
            <p className="mt-4 text-blue-100">Dashboard pages display listing and moderation metrics.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

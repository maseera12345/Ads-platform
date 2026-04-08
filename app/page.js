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
      <section className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="lg:w-3/5">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Sponsored Marketplace</p>
            <h1 className="mt-6 text-5xl font-bold leading-tight">AdFlow Pro — Moderated Ads, Verified Payments, Live Packages</h1>
            <p className="mt-6 text-lg text-slate-100">Build a production-style ad workflow platform where clients submit listings, moderators review content, and admins publish only verified ads.</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/ads" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-blue-700 font-semibold shadow-lg hover:bg-slate-100 transition">Browse Ads</Link>
              <Link href="/create" className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 py-3 text-white font-semibold hover:bg-white/20 transition">Submit Listing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900">Advanced Marketplace Workflow</h2>
            <p className="mt-4 text-slate-600">The platform supports sponsored listings with moderation, payment verification, package-based visibility and expiration, and analytics for admins and moderators.</p>

            <ul className="mt-8 space-y-4 text-slate-600">
              <li>• Submit ad requests with package selection.</li>
              <li>• Moderators review content quality and add notes.</li>
              <li>• Admins verify payments and publish approved ads.</li>
              <li>• Only approved / published ads are visible publicly.</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-900 p-10 text-white shadow-lg">
            <h3 className="text-2xl font-semibold">Platform Highlights</h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-800 p-5">
                <h4 className="font-semibold">External Media</h4>
                <p className="text-slate-300 mt-2">Only external URLs are stored and previewed safely.</p>
              </div>
              <div className="rounded-3xl bg-slate-800 p-5">
                <h4 className="font-semibold">Package Rules</h4>
                <p className="text-slate-300 mt-2">Packages control duration, weight, and homepage placement.</p>
              </div>
              <div className="rounded-3xl bg-slate-800 p-5">
                <h4 className="font-semibold">Automation Ready</h4>
                <p className="text-slate-300 mt-2">Scheduled expiry and publish logic can be added with server jobs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Package Options</p>
              <h2 className="text-4xl font-bold text-slate-900">Choose your listing plan</h2>
            </div>
            <Link href="/packages" className="rounded-full bg-blue-700 px-6 py-3 text-white font-semibold hover:bg-blue-600 transition">View all packages</Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.title} className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-500">{pkg.title}</div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">{pkg.duration}</h3>
                <p className="mt-3 text-slate-600">{pkg.description}</p>
                <div className="mt-6 rounded-3xl bg-slate-100 p-4 text-slate-800 font-semibold">{pkg.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Live Listings</p>
            <h2 className="text-4xl font-bold text-slate-900">Recent approved ads</h2>
          </div>
          <Link href="/ads" className="text-blue-700 font-semibold hover:underline">Browse all ads</Link>
        </div>

        {loading ? (
          <div className="mt-10 rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">Loading ads...</div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredAds.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">No live listings yet.</div>
            ) : (
              featuredAds.map((ad) => (
                <Link key={ad.id} href={`/ads/${ad.id}`} className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{ad.city || "City"}</div>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-900">{ad.title}</h3>
                    <p className="mt-4 text-slate-600">{ad.description || "No description provided."}</p>
                  </div>
                  <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm font-medium text-slate-700">View details</div>
                </Link>
              ))
            )}
          </div>
        )}
      </section>

      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-8">
            <h3 className="text-xl font-semibold">Safe Workflow</h3>
            <p className="mt-4 text-slate-200">A moderator and admin workflow keeps only valid ads visible.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-8">
            <h3 className="text-xl font-semibold">External Media</h3>
            <p className="mt-4 text-slate-200">Media stored only as external URLs with preview support.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-8">
            <h3 className="text-xl font-semibold">Reporting Ready</h3>
            <p className="mt-4 text-slate-200">Dashboard pages display listing and moderation metrics.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

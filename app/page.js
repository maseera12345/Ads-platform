"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {

  const [ads, setAds] = useState([])
  const [filteredAds, setFilteredAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const fetchAds = async () => {
    setLoading(true)

    const { data } = await supabase
      .from("ads")
      .select("*")
      .eq("status", "approved")

    setAds(data || [])
    setFilteredAds(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchAds()
  }, [])

  // SEARCH + FILTER LOGIC
  useEffect(() => {
    let result = [...ads]

    if (search) {
      result = result.filter(ad =>
        ad.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (activeFilter !== "all") {
      result = result.filter(ad => ad.status === activeFilter)
    }

    setFilteredAds(result)
  }, [search, activeFilter, ads])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">

          <h1 className="text-xl font-bold text-gray-800">
            🚀 AdPlatform
          </h1>

          <input
            type="text"
            placeholder="Search ads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>
      </div>

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold">
            Discover Approved Ads
          </h2>
          <p className="text-blue-100 mt-2">
            Explore latest verified advertisements from our platform
          </p>

          {/* FILTER CHIPS */}
          <div className="flex gap-3 mt-6 flex-wrap">

            {["all", "approved", "rejected"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeFilter === type
                    ? "bg-white text-blue-600"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading ads...
          </div>
        ) : filteredAds.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow text-gray-500">
            No ads found
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredAds.map((ad) => (

              <div
                key={ad.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden border border-gray-100"
              >

                {/* TOP COLOR BAR */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

                <div className="p-5">

                  <h2 className="text-lg font-semibold text-gray-800">
                    {ad.title}
                  </h2>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {ad.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">

                    <span className="text-xs text-gray-400">
                      Sponsored
                    </span>

                    <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Active
                    </span>

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
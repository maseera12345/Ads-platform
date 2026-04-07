

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ApprovedAds() {

  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchApproved = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("ads")
      .select("*")
      // .eq("status", "approved")
      .eq("status", "published")

    if (!error) {
      setAds(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchApproved()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          ✅ Publish Advertisements
        </h1>
        <p className="text-gray-500 mt-1">
          All approved ads displayed here
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">

        {loading ? (
          <div className="text-center text-gray-500">
            Loading approved ads...
          </div>
        ) : ads.length === 0 ? (
          <div className="text-center text-gray-500 bg-white p-10 rounded-xl shadow">
            No approved ads found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-gray-100"
              >

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800">
                  {ad.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {ad.description}
                </p>

                {/* Status Badge */}
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    Approved
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}
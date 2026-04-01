

// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabase"

// export default function AdminPage() {

//   const [ads, setAds] = useState([])

//   const fetchAds = async () => {
//     const { data } = await supabase.from("ads").select("*")
//     setAds(data || [])
//   }

//   const updateStatus = async (id, status) => {
//     await supabase
//       .from("ads")
//       .update({ status })
//       .eq("id", id)

//     fetchAds()
//   }

//   useEffect(() => {
//     fetchAds()
//   }, [])

//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Admin Panel
//       </h1>

//       {ads.map((ad) => (
//         <div key={ad.id} className="border p-4 mb-3 rounded">

//           <h3 className="font-bold">{ad.title}</h3>
//           <p>{ad.description}</p>

//           <p className="mb-2">Status: {ad.status}</p>

//           <button
//             onClick={() => updateStatus(ad.id, "approved")}
//             className="bg-green-500 text-white px-3 py-1 mr-2"
//           >
//             Approve
//           </button>

//           <button
//             onClick={() => updateStatus(ad.id, "rejected")}
//             className="bg-red-500 text-white px-3 py-1"
//           >
//             Reject
//           </button>

//         </div>
//       ))}

//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {

  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAds = async () => {
    setLoading(true)

    const { data } = await supabase.from("ads").select("*")

    setAds(data || [])
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    await supabase
      .from("ads")
      .update({ status })
      .eq("id", id)

    fetchAds()
  }

  useEffect(() => {
    fetchAds()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🛠 Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage all advertisements and their approval status
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">

        {loading ? (
          <div className="text-center text-gray-500">
            Loading ads...
          </div>
        ) : ads.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No ads found
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
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      ad.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : ad.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ad.status}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => updateStatus(ad.id, "approved")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(ad.id, "rejected")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition"
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  )
}
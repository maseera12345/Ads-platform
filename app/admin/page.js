

// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabase"

// export default function AdminPage() {

//   const [ads, setAds] = useState([])
//   const [loading, setLoading] = useState(true)

//   const fetchAds = async () => {
//     setLoading(true)

//     const { data } = await supabase.from("ads").select("*")

//     setAds(data || [])
//     setLoading(false)
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
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* Header */}
//       <div className="max-w-6xl mx-auto mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           🛠 Admin Dashboard
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Manage all advertisements and their approval status
//         </p>
//       </div>

//       {/* Content */}
//       <div className="max-w-6xl mx-auto">

//         {loading ? (
//           <div className="text-center text-gray-500">
//             Loading ads...
//           </div>
//         ) : ads.length === 0 ? (
//           <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
//             No ads found
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {ads.map((ad) => (

//               <div
//                 key={ad.id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-gray-100"
//               >

//                 {/* Title */}
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {ad.title}
//                 </h2>

//                 {/* Description */}
//                 <p className="text-gray-600 mt-2 text-sm line-clamp-3">
//                   {ad.description}
//                 </p>

//                 {/* Status Badge */}
//                 <div className="mt-4">
//                   <span
//                     className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                       ad.status === "approved"
//                         ? "bg-green-100 text-green-700"
//                         : ad.status === "rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {ad.status}
//                   </span>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-2 mt-4">

//                   <button
//                     onClick={() => updateStatus(ad.id, "approved")}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     onClick={() => updateStatus(ad.id, "rejected")}
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition"
//                   >
//                     Reject
//                   </button>

//                 </div>

//               </div>

//             ))}

//           </div>
//         )}

//       </div>
//     </div>
//   )
// }

// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabase"

// export default function AdminPage() {

//   const [ads, setAds] = useState([])
//   const [loading, setLoading] = useState(true)

//   const fetchAds = async () => {
//     setLoading(true)

//     const { data } = await supabase.from("ads").select("*")

//     setAds(data || [])
//     setLoading(false)
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
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* Header */}
//       <div className="max-w-6xl mx-auto mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           🛠 Admin Dashboard
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Manage ads workflow (verification & publishing)
//         </p>
//       </div>

//       {/* Content */}
//       <div className="max-w-6xl mx-auto">

//         {loading ? (
//           <div className="text-center text-gray-500">
//             Loading ads...
//           </div>
//         ) : ads.length === 0 ? (
//           <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
//             No ads found
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {ads.map((ad) => (

//               <div
//                 key={ad.id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-gray-100"
//               >

//                 {/* Title */}
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {ad.title}
//                 </h2>

//                 {/* Description */}
//                 <p className="text-gray-600 mt-2 text-sm line-clamp-3">
//                   {ad.description}
//                 </p>

//                 {/* Status Badge */}
//                 <div className="mt-4">
//                   <span
//                     className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                       ad.status === "published"
//                         ? "bg-green-100 text-green-700"
//                         : ad.status === "rejected"
//                         ? "bg-red-100 text-red-700"
//                         : ad.status === "payment_pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : ad.status === "payment_submitted"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {ad.status}
//                   </span>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex flex-wrap gap-2 mt-4">

//                   {/* Verify Payment */}
//                   {ad.status === "payment_submitted" && (
//                     <button
//                       onClick={() => updateStatus(ad.id, "verified")}
//                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg"
//                     >
//                       Verify Payment
//                     </button>
//                   )}

//                   {/* Publish */}
//                   {ad.status === "verified" && (
//                     <button
//                       onClick={() => updateStatus(ad.id, "published")}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg"
//                     >
//                       Publish
//                     </button>
//                   )}

//                   {/* Reject */}
//                   {(ad.status === "submitted" || ad.status === "payment_submitted") && (
//                     <button
//                       onClick={() => updateStatus(ad.id, "rejected")}
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg"
//                     >
//                       Reject
//                     </button>
//                   )}

//                 </div>

//               </div>

//             ))}

//           </div>
//         )}

//       </div>
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

    const { data, error } = await supabase.from("ads").select("*")

    if (!error) {
      setAds(data || [])
    }

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
          Manage complete ad workflow (testing mode)
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
                      ad.status === "published"
                        ? "bg-green-100 text-green-700"
                        : ad.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : ad.status === "payment_pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : ad.status === "payment_submitted"
                        ? "bg-blue-100 text-blue-700"
                        : ad.status === "verified"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {ad.status}
                  </span>
                </div>

                {/* Buttons - ALL OPTIONS */}
                <div className="flex flex-wrap gap-2 mt-4">

                  <button
                    onClick={() => updateStatus(ad.id, "submitted")}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-xs py-2 rounded-lg"
                  >
                    Submitted
                  </button>

                  <button
                    onClick={() => updateStatus(ad.id, "payment_pending")}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs py-2 rounded-lg"
                  >
                    Payment Pending
                  </button>

                  <button
                    onClick={() => updateStatus(ad.id, "payment_submitted")}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 rounded-lg"
                  >
                    Payment Submitted
                  </button>

                  <button
                    onClick={() => updateStatus(ad.id, "verified")}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 rounded-lg"
                  >
                    Verify
                  </button>

                  <button
                    onClick={() => updateStatus(ad.id, "published")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded-lg"
                  >
                    Publish
                  </button>

                  <button
                    onClick={() => updateStatus(ad.id, "expired")}
                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white text-xs py-2 rounded-lg"
                  >
                    Expire
                  </button>

                  <button
                    onClick={() => updateStatus(ad.id, "rejected")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-2 rounded-lg"
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
// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabase"

// export default function AdsPage() {

//   const [ads, setAds] = useState([])

//   const fetchAds = async () => {
//     const { data, error } = await supabase
//       .from("ads")
//       .select("*")

//     if (error) {
//       console.log(error)
//     } else {
//       setAds(data)
//     }
//   }

//   useEffect(() => {
//     fetchAds()
//   }, [])

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>All Ads</h1>

//       {ads.map((ad) => (
//         <div key={ad.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//           <h3>{ad.title}</h3>
//           <p>{ad.description}</p>
//           <p>Status: {ad.status}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdsPage() {

  const [ads, setAds] = useState([])

  const fetchAds = async () => {
    const { data } = await supabase.from("ads").select("*")
    setAds(data || [])
  }

  useEffect(() => {
    fetchAds()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold text-center mb-8">
        📢 All Ads
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {ad.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {ad.description}
            </p>

            <span className="inline-block mt-4 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
              {ad.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
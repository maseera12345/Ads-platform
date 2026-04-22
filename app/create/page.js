
// "use client"

// import { useState } from "react"
// import { supabase } from "@/lib/supabase"

// export default function CreateAd() {

//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const { error } = await supabase.from("ads").insert([
//       {
//         title,
//         description,
//         status: "submitted"
//       }
//     ])

//     if (error) {
//       alert("Error: " + error.message)
//     } else {
//       alert("Ad Created Successfully!")
//       setTitle("")
//       setDescription("")
//     }
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Create Ad</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{ display: "block", margin: "10px 0" }}
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{ display: "block", margin: "10px 0" }}
//         />

//         <button type="submit">
//           Submit Ad
//         </button>
//       </form>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function CreateAd() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert("You need to be logged in to create an ad.")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("ads").insert([
      {
        title,
        description,
        status: "submitted",
        user_id: user.id,
        ...(imageUrl ? { image_url: imageUrl } : {})
      }
    ])

    setLoading(false)

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Ad Created Successfully!")
      setTitle("")
      setDescription("")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-slate-200 p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Create Advertisement
        </h1>

        <p className="text-slate-600 mb-8">
          Fill in the details below to submit your ad for approval.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ad Title
            </label>
            <input
              type="text"
              placeholder="Enter ad title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Write ad description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* External Media / Image URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Image / Media URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 shadow-sm hover:shadow-md"
          >
            {loading ? "Submitting..." : "Submit Ad"}
          </button>

        </form>

      </div>
    </div>
  )
}
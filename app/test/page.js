"use client"

import { supabase } from "@/lib/supabase"

export default function TestPage() {

  const insertData = async () => {
    const { data, error } = await supabase
      .from("ads")
      .insert([
        {
          title: "First Ad",
          description: "This is test data",
          image_url: "https://via.placeholder.com/150",
          status: "submitted"
        }
      ])

    if (error) {
      alert("Error: " + error.message)
      console.log(error)
    } else {
      alert("Data Inserted Successfully!")
      console.log(data)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Supabase Connection Test</h1>

        <button
          onClick={insertData}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Insert Test Data
        </button>
      </div>
    </div>
  )
}
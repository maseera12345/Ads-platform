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
    <div style={{ padding: "40px" }}>
      <h1>Supabase Test</h1>

      <button
        onClick={insertData}
        style={{
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Insert Data
      </button>
    </div>
  )
}
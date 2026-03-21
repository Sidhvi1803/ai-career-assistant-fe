import { useState } from "react"
import api from "../api/api"
import type { ResumeAnalysis } from "../types/types"

function ResumePage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResumeAnalysis | null>(null)

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)

      const response = await api.post("/analyze-resume/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setResult(response.data)
    } catch (error) {
      console.error(error)
      alert("Error analyzing resume")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Resume Analyzer</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) setFile(e.target.files[0])
        }}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Score: {result.score}</h3>

          <h4>Strengths</h4>
          <ul>
            {result.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Weaknesses</h4>
          <ul>
            {result.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Improvements</h4>
          <ul>
            {result.improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ResumePage
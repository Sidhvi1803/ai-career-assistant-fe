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
      const response = await api.post("/resume/analyze", formData, {
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
    <div className="max-w-3xl mx-auto mt-10">

      {/* Card */}
      <div className="card bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Resume Analyzer</h2>

        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered w-full mb-4"
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0])
          }}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4">

          <div className="card bg-base-100 shadow p-4">
            <h3 className="text-lg font-bold">
              Score: <span className="badge badge-success">{result.score}</span>
            </h3>
          </div>

          <div className="card bg-base-100 shadow p-4">
            <h4 className="font-bold">Strengths</h4>
            <ul className="list-disc ml-5 mt-2">
              {result.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card bg-base-100 shadow p-4">
            <h4 className="font-bold">Weaknesses</h4>
            <ul className="list-disc ml-5 mt-2">
              {result.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card bg-base-100 shadow p-4">
            <h4 className="font-bold">Improvements</h4>
            <ul className="list-disc ml-5 mt-2">
              {result.improvements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  )
}

export default ResumePage
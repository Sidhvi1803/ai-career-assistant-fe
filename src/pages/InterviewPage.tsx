import { useState } from "react"
import api from "../api/api"
import type { InterviewQuestions } from "../types/types"

function InterviewPage() {
  const [role, setRole] = useState("")
  const [level, setLevel] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<InterviewQuestions | null>(null)

  const handleGenerate = async () => {
    if (!role || !level) return

    try {
      setLoading(true)
      const response = await api.post("/resume/generate-questions", {
        role,
        experience_level: level,
      })
      setResult(response.data)
    } catch (error) {
      console.error(error)
      alert("Error generating questions")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">

      {/* Card */}
      <div className="card bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Interview Generator</h2>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Enter Role"
          className="input input-bordered w-full mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="select select-bordered w-full mb-3"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">Select Experience Level</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
        </select>

        {/* Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4">

          <div className="card bg-base-100 shadow p-4">
            <h3 className="font-bold text-lg">Technical Questions</h3>
            <ul className="list-disc ml-5 mt-2">
              {result.technical_questions.map((q: any, i) => (
                <li key={i}>{q.description}</li>
              ))}
            </ul>
          </div>

          <div className="card bg-base-100 shadow p-4">
            <h3 className="font-bold text-lg">Scenario Questions</h3>
            <ul className="list-disc ml-5 mt-2">
              {result.scenario_questions.map((q: any, i) => (
                <li key={i}>
                  <strong>{q.scenario}</strong><br />
                  {q.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-base-100 shadow p-4">
            <h3 className="font-bold text-lg">HR Questions</h3>
            <ul className="list-disc ml-5 mt-2">
              {result.hr_questions.map((q: any, i) => (
                <li key={i}>{q.description}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  )
}

export default InterviewPage
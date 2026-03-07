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

      const response = await api.post("/generate-questions", {
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
    <div>
      <h2>Interview Question Generator</h2>

      <input
        type="text"
        placeholder="Enter Role (e.g., Backend Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="">Select Experience Level</option>
        <option value="Fresher">Fresher</option>
        <option value="1-3 years">1-3 years</option>
        <option value="3-5 years">3-5 years</option>
      </select>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Technical Questions</h3>
          <ul>
            {result.technical_questions.map((q:any, i) => (
              <li key={i}>{q.question}</li>
            ))}
          </ul>

          <h3>Scenario Questions</h3>
          <ul>
            {result.scenario_questions.map((q:any, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>

          <h3>HR Questions</h3>
          <ul>
            {result.hr_questions.map((q:any, i) => (
              <li key={i}>{q.question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default InterviewPage
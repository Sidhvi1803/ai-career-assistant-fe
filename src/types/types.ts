export interface ResumeAnalysis {
  score: number
  strengths: string[]
  weaknesses: string[]
  improvements: string[]
}

export interface InterviewQuestions {
  technical_questions: string[]
  scenario_questions: string[]
  hr_questions: string[]
}

export interface QuestionItem {
  id: number
  question: string
  type: string
}
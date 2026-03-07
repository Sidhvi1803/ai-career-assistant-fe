
import './App.css'
import InterviewPage from './pages/InterviewPage'
import ResumePage from './pages/ResumePage'


function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>AI Career Assistant</h1>
      <ResumePage/>
      <InterviewPage/>
    </div>
  )
}

export default App

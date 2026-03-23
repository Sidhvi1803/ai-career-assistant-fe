import axios from "axios"

const api = axios.create({
  baseURL: "https://ai-career-assistant-be-production-b37e.up.railway.app",
})

export default api

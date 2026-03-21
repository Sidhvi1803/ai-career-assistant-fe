import axios from "axios"

const api = axios.create({
  baseURL: "https://ai-career-assistant-be-production.up.railway.app",
})

export default api

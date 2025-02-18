import { BrowserRouter } from "react-router-dom"

import { AuthProvider } from "./providers/AuthProvider"
import { Router } from "./routes/Router"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

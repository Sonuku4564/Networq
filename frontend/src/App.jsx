import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/auth/SignupPage"
import LoginPage from "./pages/auth/LoginPage"
import { Toaster } from "react-hot-toast"

function App() {
 
  return (
      <Layout> 
         <Routes>
          <Route path="/" element= {<HomePage/>} />
          <Route path="/signup" element= {<SignupPage/>} />
          <Route path="/login" element= {<LoginPage/>} />
         </Routes>
         <Toaster/>
      </Layout>
   
  )
}

export default App

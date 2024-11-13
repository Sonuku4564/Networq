import React from 'react'
import Layout from './components/Layout/Layout'
import {Routes, Route} from "react-router-dom"

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/auth/SignupPage"
import LoginPage from "./pages/auth/loginPage"

const App = () => {
  return (
	<Layout>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>

    </Routes>
  </Layout>
  )
}

export default App
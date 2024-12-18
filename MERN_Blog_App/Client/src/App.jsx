import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import FooterComponent from './components/FooterComponent'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Route>
        <Route path='/projects' element={<Projects />}></Route>
      </Routes>
      <FooterComponent></FooterComponent>
    </BrowserRouter>
  )
}

export default App
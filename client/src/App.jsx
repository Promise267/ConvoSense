import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from './components/Login/Login'
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import ChatList from './components/Home/ChatList'
import About from './components/Navbar/About'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/home/*' element = {<Home/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/about' element = {<About/>}/>
      </Routes>
    </>
  )
}

import { BrowserRouter, Navigate,Routes,Route } from "react-router-dom"

import Home from "scenes/homepage/Home"
import Login from "scenes/loginPage/Login"
import Profile from "scenes/profilePage/Profile"


function App() {


  return (
   <div className='app'>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/profile/:userId" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Header,Footer } from "./components"
import {login,logout} from "./store/authSlice"
import authService from "./appwrite/auth"
import { Outlet } from "react-router-dom"
function App () {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

 useEffect(() => {
  authService.getCurrentUser().then((userData) => {
    if(userData){
      dispatch(dispatch(login({userData})))
    } else {
      dispatch(logout())
    }
  }).finally(() => setLoading(false))

 }, [])
  return !loading ? (
    <>

   <div className="min-h-screen flex flex-wrap content-between overflow-x-hidden">
    <div className="w-full block">
      <Header/>
      <main>
        <Outlet/>
     
      </main>
      <Footer/>
    </div>
   </div>
    </>
 
  ) :
  (
    null
  
  )
}

export default App

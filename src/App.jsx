import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Component/Navbar/Navbar'
import { useLocation} from 'react-router-dom'
import { useLogin } from './Component/Store/LoginStore'
function App() {
  const location = useLocation();
  const {setisLoged} = useLogin();
  const userinfo = JSON.parse(localStorage.getItem('userinfo'));
  useEffect(()=>{
    if(userinfo !== null){
      setisLoged(true);
    }
    else{
      setisLoged(false);
    }
  },[])
  return (
    <div>
        {
          location.pathname !== '/login' && <Navbar/>
        }
        <Outlet/>
    </div>
  )
}

export default App

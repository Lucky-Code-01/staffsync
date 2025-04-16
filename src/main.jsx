import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter, createRoutesFromElements,Route,RouterProvider
}from 'react-router-dom'
import AdminDash from './Component/Backend/AdminDash.jsx'
import Home from './Component/FrontEnd/DashBord/Home.jsx'
import Login from './Component/Login/Login.jsx'
import { Provider } from 'react-redux'
import workSotre from './Component/ReduxStore/ToolkitStore.js'
import { LoginProvider } from './Component/Store/LoginStore.jsx'
// make the route function
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/admin' element={<AdminDash/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <LoginProvider>
        <Provider store={workSotre}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </Provider>
      </LoginProvider>
  </StrictMode>,
)

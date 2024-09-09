import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth from './Auth.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from './pages/authPages/signUp.tsx'
import { GatewayProvider } from './gateway/gatewayContext.tsx'
import Login from './pages/authPages/Login.tsx'
import Home from './Home.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Index from './pages/home/index.tsx'
import NewAccount from './pages/accounts/newAccount.tsx'
import AccountDetails from './pages/accounts/unityAccountInfo.tsx'
const router = createBrowserRouter([
  {
    path:"/",
    element: <Auth />,
    children:[
      {
        path: "/signup",
        element: <SignUp/>
      },
      {
        path: "/",
        element: <Login />
      }
    ]
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "index",
        element: <Index />
      },
      {
        path: "new/account",
        element: <NewAccount/>
      },
      {
        path: "account/:uuid",
        element: <AccountDetails/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GatewayProvider >
      <RouterProvider router={router} />
    </GatewayProvider>
  </React.StrictMode>,
)

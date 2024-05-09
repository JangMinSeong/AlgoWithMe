import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"
import App from './App.tsx'
import './index.css'
import router from "@/Router"
import StoreProvider from "@/StoreProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
  </React.StrictMode>,
)

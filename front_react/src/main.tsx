import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import router from "@/Router"
import StoreProvider from "@/StoreProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
  </React.StrictMode>,
)

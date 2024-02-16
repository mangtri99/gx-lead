import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import '@/assets/css/index.scss' // bootstrap css
import "@/assets/css/App.scss"; // custom css
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { router } from './router.tsx';
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router}/>
    </HelmetProvider>
    <Toaster position="top-right" />
  </React.StrictMode>,
)

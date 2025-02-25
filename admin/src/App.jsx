import { useState } from 'react'
// import AdminDoctors from './pages/Add/AdminDoctors'
import { ToastContainer, toast } from 'react-toastify';
import AdminMarketplace from './pages/AdminMarketplace/AdminMarketplace';
function App() {
  

  return (
    <>
    {/* <AdminDoctors /> */}
    <AdminMarketplace />
    <ToastContainer />
    </>
  )
}

export default App

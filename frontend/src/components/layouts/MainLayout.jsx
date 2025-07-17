import React from 'react'
import Header from './Header'       
import Footer from './Footer'       
import { Outlet } from 'react-router-dom'  
import SignUpModal from '../auth/SignUpModal';
import LoginModal from '../auth/LoginModal';


const MainLayout = () => {
  return (
    <div>
      <Header />
      <SignUpModal /> 
      <LoginModal />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )}
export default MainLayout;
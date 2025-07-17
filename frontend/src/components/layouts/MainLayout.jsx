import React from 'react'
import Header from './Header'       
import Footer from './Footer'       
import { Outlet } from 'react-router-dom'  
import SignUpForm from '../auth/signUp/SignUpForm';


const MainLayout = () => {
  return (
    <div>
      <Header />
      <SignUpForm /> 

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )}
export default MainLayout;
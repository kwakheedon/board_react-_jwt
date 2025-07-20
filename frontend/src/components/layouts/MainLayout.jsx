import React from 'react'
import Header from './Header'       
import Footer from './Footer'       
import { Outlet } from 'react-router-dom'  
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';
import Logout from '../auth/Logout';


const MainLayout = () => {
  return (
    <div>
      <Header />
      <SignUpForm /> 
      <LoginForm /> 
      <Logout />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )}
export default MainLayout;
import React from 'react'
import Header from './Header'       
import Footer from './Footer'       
import { Outlet } from 'react-router-dom'  
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';
import Logout from '../auth/Logout';
import { AnimatePresence } from 'framer-motion';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <AnimatePresence>
      <SignUpForm key="signup" /> 
      <LoginForm key="login"/> 
      <Logout key="logout" />
      </AnimatePresence>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )}
export default MainLayout;
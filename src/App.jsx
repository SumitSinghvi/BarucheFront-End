import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from './pages/Test';
import Layout from './pages/layout/Layout';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import SignIn from './pages/account/SignIn';
import SignUp from './pages/account/SignUp';
import Profile from './pages/account/Profile';

export default function App() {
  return (
  <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </Layout>
  </BrowserRouter>
  )
}

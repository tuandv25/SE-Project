import React from 'react'

import Header from '../components/HomeComponents/Header'
import UserHeader from '../components/UserComponents/UserHeader'
import Register from '../components/LoginAndRegisterComp/Register'
import Subscribe from '../components/HomeComponents/Subscribe'
import Footer from '../components/HomeComponents/Footer'

const RegisterPage = () => {
  return (
    <div>
        <Header/>
        <UserHeader/>
        <Register/>
        <Subscribe/>
        <Footer/>
    </div>
  )
}

export default RegisterPage

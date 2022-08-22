import React from 'react'

import Header from '../components/HomeComponents/Header'
import Login from '../components/LoginAndRegisterComp/Login'
import Footer from '../components/HomeComponents/Footer'
import Subscribe from '../components/HomeComponents/Subscribe'
import UserHeader from '../components/UserComponents/UserHeader'

const LoginPage = () => {
  return (
    <div>
        <Header/>
        <UserHeader/>
        <Login/>
        <Subscribe/>
        <Footer/>
    </div>
  )
}

export default LoginPage

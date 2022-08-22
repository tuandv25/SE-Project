import React from 'react'
import Header from '../components/HomeComponents/Header'
import UserHeader from '../components/UserComponents/UserHeader'
import UserDetail from '../components/UserComponents/UserDetail'
import Subscribe from '../components/HomeComponents/Subscribe'
import Footer from '../components/HomeComponents/Footer'

const User = () => {
  return (
    <div>
        <Header/>
        <UserHeader/>
        <UserDetail/>
        <Subscribe/>
        <Footer/>
    </div>
  )
}

export default User
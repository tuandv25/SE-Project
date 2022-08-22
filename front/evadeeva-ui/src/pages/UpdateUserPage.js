import UpdateUser from "../components/UserComponents/UpdateUser"
import React from 'react'
import Header from '../components/HomeComponents/Header'
import UserHeader from '../components/UserComponents/UserHeader'
import Subscribe from '../components/HomeComponents/Subscribe'
import Footer from '../components/HomeComponents/Footer'

const UpdateUserPage = () => {
    return (
      <div>
          <Header/>
          <UserHeader/>
          <UpdateUser/>
          <Subscribe/>
          <Footer/>
      </div>
    )
  }
  
  export default UpdateUserPage
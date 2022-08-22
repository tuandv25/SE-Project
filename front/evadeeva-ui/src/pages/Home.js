import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import Banner from '../components/HomeComponents/Banner'
import Header from '../components/HomeComponents/Header'
import Products from '../components/HomeComponents/Products'
import IntroShop from '../components/HomeComponents/IntroShop'
import Trending from '../components/HomeComponents/Trending'
import ImageSlider from '../components/HomeComponents/ImageSlider'
import Blog from '../components/HomeComponents/Blog'
import Feedback from '../components/HomeComponents/Feedback'
import Subscribe from '../components/HomeComponents/Subscribe'
import Footer from '../components/HomeComponents/Footer'

const Home = ({user}) => {
  if (user.admin) {
    return (
      <div>
        <Redirect to="/admin-product"></Redirect>
      </div>
    )
  }
  else {
    if (user.staff) {
      return (
        <div> 
          <Redirect to="/admin-offline-product"></Redirect>
        </div>
      )
    }
    else {
      return (
        <div>
          <Header/>
          <Banner/>
          <Trending/>
          <IntroShop/>
          <Products/>
          <ImageSlider/>
          <Blog/>
          <Feedback/>
          <Subscribe/>
          <Footer/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
      user : state.User,
  }
}

export default connect(mapStateToProps)(Home)

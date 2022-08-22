import React from 'react'

import Header from '../components/HomeComponents/Header'
import CheckoutMain from '../components/CartComponents/CheckoutMain'
import Products from '../components/HomeComponents/Products'
import Subscribe from '../components/HomeComponents/Subscribe'
import Footer from '../components/HomeComponents/Footer'

const Checkout = () => {
  return (
    <div>
        <Header/>
        <CheckoutMain/>
        <Products/>
        <Subscribe/>
        <Footer/>
    </div>
  )
}

export default Checkout
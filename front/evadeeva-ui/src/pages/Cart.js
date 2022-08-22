import React from 'react'

import Header from '../components/HomeComponents/Header'
import CartMain from '../components/CartComponents/CartMain'
import Products from '../components/HomeComponents/Products'
import Subscribe from '../components/HomeComponents/Subscribe'
import Footer from '../components/HomeComponents/Footer'

const Cart = () => {
  return (
    <div>
        <Header/>
        <CartMain/>
        <Products/>
        <Subscribe/>
        <Footer/>
    </div>
  )
}

export default Cart

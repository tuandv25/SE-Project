import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/HomeComponents/Header'
import ProductHeader from '../components/ProductComponents/ProductHeader'
import ProductMain from '../components/ProductComponents/ProductMain'
import Subscribe from '../components/HomeComponents/Subscribe'
import Footer from '../components/HomeComponents/Footer'

const Products = ({product}) => {
  return (
    <div>
        <Header/>
        <ProductHeader/>
        <ProductMain data={product}/>
        <Subscribe/>
        <Footer/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    product: state.Product
  }
}

export default connect(mapStateToProps)(Products)

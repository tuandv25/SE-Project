import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import currencyFormat from '../../utils/displayPrice'
import Header from '../HomeComponents/Header'
import ProductHeader from './ProductHeader'
import Subscribe from '../HomeComponents/Subscribe'
import Footer from '../HomeComponents/Footer'

import "../../assets/style/style.css"

const ProductFilterAccessory = ({accessory, sale}) => {
    const today = new Date();
  return (
    <div>
        <Header/>
        <ProductHeader/>
        <section className="ftco-section bg-light">
            <div className="container-fluid">
                <div className="row">
                    {accessory.map((item, index) => {
                        return (
                            <div className="col-sm col-md-6 col-lg-3 ftco-animate">
                                <div className="product" key={index}>
                                    <Link to={`/detailaccessory/${item.codePro}`} className="img-prod">
                                        <img className="img-fluid" src={item.img_1} alt="Product-Image"/>
                                        {((sale && sale.categoryId === 7 && (sale.expireAt >= today)) || (sale && sale.categoryId === 0 && (sale.expireAt >= today)))?
                                            <span className="status">{sale.name} {sale.disCount}%</span>
                                            :
                                            <></>
                                        }
                                    </Link>
                                    <div className="text py-3 px-3">
                                        <h3><Link to={`/detailaccessory/${item.codePro}`}>{item.name}</Link></h3>
                                        <div className="d-flex">
                                            <div className="pricing">
                                                {
                                                    ((sale && item.categoryId === 7 && (sale.expireAt >= today)) || (sale && sale.categoryId === 0 && (sale.expireAt >= today))) ?
                                                    <p className="price">
                                                        <span className="mr-2 price-dc">${currencyFormat(item.price)}</span>
                                                        <span className="price-sale">${currencyFormat(parseInt(item.price-item.price*sale.disCount/100, 10))}</span>
                                                    </p>
                                                    :
                                                    <p className="price">
                                                        <span className="price">${currencyFormat(item.price)}</span>
                                                    </p>
                                                }
                                            </div>
                                            <div className="rating">
                                                <p className="text-right">
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                </p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <Link to={`/detailaccessory/${item.codePro}`} className="add-to-cart">
                                            <p className="bottom-area d-flex">
                                                    <span>Add to cart <i className="fas fa-cart-plus" style={{marginLeft: '10px', fontSize: '15px'}}></i></span>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
        <Subscribe/>
        <Footer/>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        accessory: state.Accessory,
        sale: state.Event
    }
}

export default connect(mapStateToProps)(ProductFilterAccessory)

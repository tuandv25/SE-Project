import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import currencyFormat from '../../utils/displayPrice'
import Header from '../HomeComponents/Header'
import ProductHeader from './ProductHeader'
import Subscribe from '../HomeComponents/Subscribe'
import Footer from '../HomeComponents/Footer'

import "../../assets/style/style.css"

const ProductFilterBody = ({product, sale, category}) => {
    const today = new Date();
  return (
    <div>
        <Header/>
        <ProductHeader/>
        <section className="ftco-section bg-light">
            <div className="container-fluid">
                <div className="row">
                    {product.filter(function(product){return product.categoryId === category;}).map((item, index) => {
                        return (
                            <div className="col-sm col-md-6 col-lg-3 ftco-animate">
                                <div className="product" key={index}>
                                    <Link to={`/detail/${item.codePro}`} className="img-prod">
                                        <img className="img-fluid" src={item.img_1} alt="Product-Image"/>
                                            {((sale && item.categoryId === sale.categoryId && (sale.expireAt >= today)) || (sale && sale.categoryId === 0 && (sale.expireAt >= today))) ?
                                                <span className="status">{sale.name} {sale.disCount}%</span>
                                                :
                                                <></>
                                            }
                                    </Link>
                                    <div className="text py-3 px-3">
                                        <h3><Link to={`/detail/${item.codePro}`}>{item.name}</Link></h3>
                                        <div className="d-flex">
                                            <div className="pricing">
                                                {
                                                    ((sale && item.categoryId === sale.categoryId && (sale.expireAt >= today)) || (sale && sale.categoryId === 0 && (sale.expireAt >= today))) ?
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
                                        <Link to={`/detail/${item.codePro}`} className="add-to-cart">
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

const mapStateToProps_1 = (state)  => {
    return {
        product: state.Product,
        sale: state.Event,
        category: 1 // Dress
    }
}

const mapStateToProps_2 = (state)  => {
    return {
        product: state.Product,
        sale: state.Event,
        category: 2 // T_Shirt
    }
}

const mapStateToProps_3 = (state)  => {
    return {
        product: state.Product,
        sale: state.Event,
        category: 3 // Shirt
    }
}

const mapStateToProps_4 = (state)  => {
    return {
        product: state.Product,
        sale: state.Event,
        category: 4 // JumpSuit
    }
}

const mapStateToProps_5 = (state)  => {
    return {
        product: state.Product,
        sale: state.Event,
        category: 5 // Skirt
    }
}

const mapStateToProps_6 = (state)  => {
    return {
        product: state.Product,
        sale: state.Event,
        category: 6 // Trousers
    }
}

export default {
    FilterDress: connect(mapStateToProps_1)(ProductFilterBody),
    FilterT_Shirt: connect(mapStateToProps_2)(ProductFilterBody),
    FilterShirt: connect(mapStateToProps_3)(ProductFilterBody),
    FilterJumpSuit: connect(mapStateToProps_4)(ProductFilterBody),
    FilterSkirt: connect(mapStateToProps_5)(ProductFilterBody),
    FilterTrousers: connect(mapStateToProps_6)(ProductFilterBody),
}

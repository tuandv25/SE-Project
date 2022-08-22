import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import currencyFormat from '../../utils/displayPrice'

import "../../assets/style/style.css"

const Trending = ({product, sale}) => {
  return (
    <div>
        <section className="ftco-section ftco-product">
            <div className="container">
                <div className="row justify-content-center mb-3 pb-3">
                    <div className="col-md-12 heading-section head-link text-center ftco-animate">
                        <h1 className="big">Trending</h1>
                        <Link to="/products" title="Trending">
                            <h2 className="mb-4">Trending</h2>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {product.map((item, index) => {
                        return (index < 4) && (
                            <div className="col-sm col-md-6 col-lg ftco-animate" key={index}>
                                <div className="product">
                                    <Link to={`/detail/${item.codePro}`} className="img-prod">
                                        <img className="img-fluid" src={item.img_1} alt="Product Image"/>
                                            {(sale && item.categoryId === sale.categoryId || sale && sale.categoryId === 0)?
                                                <span className="status">{sale.name} {sale.disCount}%</span>
                                                :
                                                <></>
                                            }
                                    </Link>
                                    <div className="text py-3 px-3">
                                        <h3><Link to={`/detail/${item.codePro}`}>{`${item.name} ${item.codePro}`}</Link></h3>
                                        <div className="d-flex">
                                            {
                                                (sale && item.categoryId === sale.categoryId || sale && sale.categoryId === 0) ?
                                                <div className="d-flex">
                                                    <div className="pricing">
                                                        <p className="price">
                                                            <span className="mr-2 price-dc">${currencyFormat(item.price)}</span>
                                                            <span className="price-sale">${currencyFormat(parseInt(item.price-item.price*sale.disCount/100, 10))}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                :<div className="d-flex">
                                                    <div className="pricing">
                                                        <p className="price">
                                                            <span className="price">${currencyFormat(item.price)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            }
                                            {/* <div className="rating">
                                                <p className="text-right">
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                </p>
                                            </div> */}
                                        </div>
                                        {/* <hr/>
                                        <Link to={`/detail/${item.codePro}`} className="add-to-cart">
                                            <p className="bottom-area d-flex">
                                                    <span>Add to cart <i className="fas fa-cart-plus" style={{marginLeft: '10px', fontSize: '15px'}}></i></span>
                                            </p>
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        product:[
            ...state.Product,
        ],
        sale: state.Event
    }
}

export default connect(mapStateToProps)(Trending)

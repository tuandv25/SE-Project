import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { connect } from 'react-redux'

import currencyFormat from '../../utils/displayPrice'

import "../../assets/style/style.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Products = ({product, sale}) => {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 3,
    };

    return (
        <div>
            <section className="ftco-section ftco-product">
                <div className="container">
                    <div className="row justify-content-center mb-3 pb-3">
                        <div className="col-md-12 heading-section head-link text-center ftco-animate">
                            <h1 className="big">Products</h1>
                            <Link to="/products" title="Products">
                                <h2 className="mb-4">Products</h2>
                            </Link>
                        </div>
                    </div>
                    <Slider {...settings}>
                    {product.map((item, index) => {
                        return (index < 15) && (
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="product-slider owl-carousel ftco-animate">
                                        <div className="item" data-index={index} key={index}>
                                            <Link to={`/detail/${item.codePro}`}>
                                                <div className="product">
                                                    <div className="img-prod">
                                                        <img className="img-fluid" src={item.img_1} alt="Product Image"/>
                                                        {(sale && item.categoryId === sale.categoryId || sale && sale.categoryId === 0)?
                                                        <span className="status"> {sale.name}</span>
                                                        :
                                                        <></>
                                                        }
                                                    </div>
                                                    <div className="text pt-3 px-3">
                                                        <h3><Link to={`/detail/${item.codePro}`}>{`${item.name} ${item.codePro}`}</Link></h3>
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
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </Slider>
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

export default connect(mapStateToProps)(Products)

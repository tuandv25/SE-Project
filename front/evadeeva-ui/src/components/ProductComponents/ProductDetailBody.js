import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux'
import { addCart } from '../../actions/cart'
import currencyFormat from '../../utils/displayPrice'
import Header from '../HomeComponents/Header'
import Products from '../HomeComponents/Products'
import ProductHeader from './ProductHeader'
import Subscribe from '../HomeComponents/Subscribe'
import Footer from '../HomeComponents/Footer'

import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/style.css"

const size = ['S', 'M', 'L', 'XL']
const sizeDB = ['size_S', 'size_M', 'size_L', 'size_XL']

const ProductDetailBody = ({product, match, dispatch, sale}) => {
    const today = new Date();
    const [keyActive, setKeyActive] = useState('')
    const [indexSizeActive, setIndexSizeActive] = useState(-1)
    const [quantity, setQuantity] = useState(1)
    const detailProduct = product.filter((item) => item.codePro === match.params.code)[0];

    const handleAddCart = () => {
        if (!keyActive) {
            toast.error("Chọn size sản phẩm")
        }
        else if (quantity <= 0) {
            toast.error("Chọn số lượng sản phẩm")
        }
        else {
            toast.success("Sản phẩm đã thêm thành công")
            dispatch(addCart({
                id: detailProduct.id,
                name: detailProduct.name,
                img_1: detailProduct.img_1,
                color: detailProduct.color,
                codePro: detailProduct.codePro,
                count: quantity,
                size: keyActive,
                price: detailProduct.price,
                categoryId: detailProduct.categoryId,
            }))
        }
    }
    return (
        <div>
            <Header/>
            <ProductHeader/>
            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-5 ftco-animate">
                            <img src={detailProduct.img_1} className="img-fluid" alt="Product-Image"/>
                        </div>
                        <div className="col-lg-6 product-details pl-md-5 ftco-animate">
                        <h3>{detailProduct.name}</h3>
                            <div className="pricing">
                            {
                                ((sale && detailProduct.categoryId === sale.categoryId && (sale.expireAt >= today)) || (sale && sale.categoryId === 0 && (sale.expireAt >= today))) ?
                                <p className="price">
                                    <span className="mr-2 price-dc">${currencyFormat(detailProduct.price)}</span>
                                    <span className="price-sale">${currencyFormat(parseInt(detailProduct.price-detailProduct.price*sale.disCount/100, 10))}</span>
                                </p>
                                :
                                <p className="price">
                                    <span className="price">${currencyFormat(detailProduct.price)}</span>
                                </p>
                            }
                            </div>
                            <p>SKU: {detailProduct.codePro}</p>
                            <p>{detailProduct.description}</p>
                            <p>Color: {detailProduct.color}</p>
                            <p>Material: {detailProduct.material}</p>
                            <div className="row mt-4">
                                <div className="col-md d-flex mb-3">
                                    {size.map((item, index) => {
                                    if (detailProduct[sizeDB[index]] !== 0){
                                        return (
                                            <span className="mr-2">
                                                <button className={`input-size-btn ${(keyActive === item)
                                                    && "active"}`}
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        setKeyActive(item);
                                                        setIndexSizeActive(index)
                                                    }}
                                                > {item} </button>
                                            </span>
                                        )
                                    }
                                    })}
                                </div>
							    <div className="w-100"></div>
							    <div className="input-group col-md-6 d-flex mb-3">
                                    <span className="input-group-btn mr-2">
                                        <button className="quantity-left-minus btn"
                                                type="button"
                                                onClick={() => {
                                                    if (quantity > 0) setQuantity(quantity - 1)
                                                }}
                                        ><i className="fas fa-minus"></i></button>
                                    </span>
                                        <div id="quantity" name="quantity" className="form-control">
                                            {quantity}
                                        </div>
                                    <span className="input-group-btn ml-2">
                                        <button className="quantity-left-minus btn"
                                                type="button"
                                                onClick={() => {
                                                    if (quantity < detailProduct[sizeDB[indexSizeActive]]) {
                                                    setQuantity(quantity + 1)
                                                    }
                                                    else {
                                                        toast.warning("Vượt quá số lượng")
                                                    }
                                                }}
                                        ><i className="fas fa-plus"></i></button>
                                    </span>
                                </div>
          	                </div>
                            <div onClick={handleAddCart}>
                                <div className="btn btn-primary py-3 px-5">Add to Cart</div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </section>
            <Products/>
            <Subscribe/>
            <Footer/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        product: [
            ...state.Product,
        ],
        sale: state.Event,
    }
}

export default connect(mapStateToProps)(ProductDetailBody)

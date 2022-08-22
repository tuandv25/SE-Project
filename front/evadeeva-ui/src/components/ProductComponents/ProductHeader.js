import React from 'react'
import { Link } from 'react-router-dom'

import "../../assets/style/style.css"

const ProductHeader = () => {
    return (
        <div>
            <div className="hero-wrap hero-bread bg-img">
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center mt-5">
                        <div className="col-md-9 ftco-animate text-center">
                            <h1 className="mb-0 bread">PRODUCT</h1>
                            <Link to="/products"><h5 className="mt-2 mb-1 breadcrumbs">ALL</h5></Link>
                            <p className="breadcrumbs">
                                <span className="mr-2 ml-2"><Link to="/dress">Dress</Link></span>
                                <span>|</span>
                                <span className="mr-2 ml-2"><Link to="/t_shirt">T-Shirt</Link></span>
                                <span>|</span>
                                <span className="mr-2 ml-2"><Link to="/shirt">Shirt</Link></span>
                                <span>|</span>
                                <span className="mr-2 ml-2"><Link to="/jumpsuit">Jumpsuit</Link></span>
                                <span>|</span>
                                <span className="mr-2 ml-2"><Link to="/skirt">Skirt</Link></span>
                                <span>|</span>
                                <span className="mr-2 ml-2"><Link to="/trousers">Trousers</Link></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductHeader
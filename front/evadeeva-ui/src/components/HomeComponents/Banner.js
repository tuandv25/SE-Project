import React from 'react'
import { Link } from 'react-router-dom'
import FullHeight from 'react-full-height'

import "../../assets/style/style.css"

const Banner = () => {
  return (
    <div>
        <FullHeight className="hero-wrap banner-img">
            <div className="overlay"></div>
            <div className="container">
                <FullHeight className="row no-gutters slider-text align-items-center justify-content-center">
                    <div className="col-md-11 text-center">
                        
                    </div>
                    <div className="mouse">
                        <Link to="/products" className="mouse-icon">
                            <div className="mouse-wheel"><span className="fas fa-angle-down"></span></div>
                        </Link>
                    </div>
                </FullHeight>
            </div>
        </FullHeight>
    </div>
  )
}

export default Banner
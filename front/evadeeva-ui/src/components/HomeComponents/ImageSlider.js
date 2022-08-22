import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

import "../../assets/style/style.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ImageSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            <Slider {...settings}>
                <Link to="/">
                    <div>
                        <img className="img-fluid" src="https://theme.hstatic.net/200000000133/1000569834/14/slideshow_1.jpg?v=5142" alt="Slide-1"/>
                    </div>
                </Link>
                <Link to="/">
                    <div>
                        <img className="img-fluid" src="https://theme.hstatic.net/200000000133/1000569834/14/slideshow_2.jpg?v=5142" alt="Slide-2"/>
                    </div>
                </Link>
                <Link to="/">
                    <div>
                        <img className="img-fluid" src="https://theme.hstatic.net/200000000133/1000569834/14/slideshow_3.jpg?v=5142" alt="Slide-3"/>
                    </div>
                </Link>
            </Slider>
        </div>
    )
}

export default ImageSlider
import React from 'react'
import { Carousel } from 'react-bootstrap'

import "../../assets/style/style.css"

const Feedback = () => {
  return (
    <div>
        <section className="ftco-section testimony-section bg-light">
            <div className="container">
                <div className="row justify-content-center mb-3 pb-3">
                    <div className="col-md-12 heading-section text-center ftco-animate">
                        <h1 className="big">Feedback</h1>
                        <h2 className="mb-4">Feedback</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 ftco-animate">
          	            <div className="row ftco-animate">
		                    <div className="col-md-12">
                                <Carousel>
                                    <Carousel.Item>
                                        <div className="item">
                                            <div className="testimony-wrap py-4 pb-5">
                                                <div className="user-img mb-4" style={{backgroundImage: 'url("https://haycafe.vn/wp-content/uploads/2022/02/Hi%CC%80nh-a%CC%89nh-ga%CC%81i-xinh-Han-Quoc-ma%CC%81i-ngo%CC%81.jpg")'}}>
                                                    <span className="quote d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-quote-left"></i>
                                                    </span>
                                                </div>
                                                <div className="text text-center">
                                                    <p className="mb-4">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                                    <p className="name">Roger Scott</p>
                                                    <span className="position">Customer</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="item">
                                            <div className="testimony-wrap py-4 pb-5">
                                                <div className="user-img mb-4" style={{backgroundImage: 'url("https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-600x600.jpg")'}}>
                                                    <span className="quote d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-quote-left"></i>
                                                    </span>
                                                </div>
                                                <div className="text text-center">
                                                    <p className="mb-4">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                                    <p className="name">Roger Scott</p>
                                                    <span className="position">Customer</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="item">
                                            <div className="testimony-wrap py-4 pb-5">
                                                <div className="user-img mb-4" style={{backgroundImage: 'url("https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/thutrang/2021_01_25/7t/cau-thu-nao-vuong-nhieu-tin-don-hen-ho-gai-xinh-nhat-nam-2020-hinh-6.jpg")'}}>
                                                    <span className="quote d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-quote-left"></i>
                                                    </span>
                                                </div>
                                                <div className="text text-center">
                                                    <p className="mb-4">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                                    <p className="name">Roger Scott</p>
                                                    <span className="position">Customer</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="item">
                                            <div className="testimony-wrap py-4 pb-5">
                                                <div className="user-img mb-4" style={{backgroundImage: 'url("https://danviet.mediacdn.vn/thumb_w/650/2020/8/28/gia-han-02-15986060398321206004048.jpg")'}}>
                                                    <span className="quote d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-quote-left"></i>
                                                    </span>
                                                </div>
                                                <div className="text text-center">
                                                    <p className="mb-4">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                                    <p className="name">Roger Scott</p>
                                                    <span className="position">Customer</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Feedback
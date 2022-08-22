import React from 'react'
import { Link } from 'react-router-dom'

import "../../assets/style/style.css"

const IntroShop = () => {
    return (
        <div>
            <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center">
                        <img src="https://file.hstatic.net/200000000133/article/2.3_083fc647db40450dbc44b0593395b026_grande.png" className="d-flex justify-content-center align-items-center" alt=""/>
                        </div>
                        <div className="col-md-7 py-5 wrap-about pb-md-5 ftco-animate">
                            <div className="heading-section-bold mb-5 mt-md-5">
                                <div className="ml-md-0">
                                    <h2 className="mb-4"><span>Force of Nature</span></h2>
                                </div>
                            </div>
                            <div className="pb-md-5">
                                <p>
                                Với <strong>Force of Nature</strong>, Eva de Eva muốn kể câu chuyện về Vẻ đẹp đích thực của người phụ nữ trong âm hưởng của sự tự do, dám thử thách, hết mình với những khát khao. "Chạy" về nơi xa ấy, vượt lên khỏi những kìm nén và định kiến, thoát ra khỏi vỏ bọc của sự hoàn hảo, quy chuẩn, tìm về với vẻ đẹp nội tại, với nét đẹp nguyên bản và tính nữ thuần khiết nhất. Lắng nghe giai điệu của biển xanh, vũ điệu của nắng vàng và lời ca của gió nhẹ, Nàng tỏa sáng kiêu sa và rực rỡ.
                                </p>
                            </div>
                            <Link to="/products">
                                <div className="btn-learn-more">
                                    <p className="">Tìm hiểu thêm</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default IntroShop
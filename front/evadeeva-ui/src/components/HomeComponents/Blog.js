import React from 'react'
import { Link } from 'react-router-dom'

import "../../assets/style/style.css"

const Blog = () => {
  return (
    <div>
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center mb-3 pb-3">
                    <div className="col-md-12 heading-section head-link text-center ftco-animate">
                        <h1 className="big">Blog</h1>
                        <Link to="/products" title="Blog">
                            <h2 className="mb-4">Recent Blog</h2>
                        </Link>
                    </div>
                </div>
                <div className="row d-flex">
                    <div className="col-md-4 d-flex ftco-animate">
                        <div className="blog-entry align-self-stretch">
                            <Link to="/" className="block-20" style={{backgroundImage: 'url("https://file.hstatic.net/200000000133/file/244967969_4416166485170663_5649669575000338741_n_a0204a63f53f4cfaaa9d1643d8dee9e0_grande.jpg")'}}>
                            </Link>
                            <div className="text mt-3 d-block">
                                <h3 className="heading mt-3"><Link to="/">[NEW COLLECTION] A BREATH OF TIME - PART 2</Link></h3>
                                <div className="meta mb-3">
                                    <div>
                                        <Link to="/">
                                            <p>Thời gian là sợi dây vô hình gắn kết vạn vật từ quá khứ tới tương lai, là thước đo của những giá trị bền vững xuyên suốt trong chuỗi hành trình phát triển của thời trang. Hãy cùng Eva de Eva tham gia...</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex ftco-animate">
                        <div className="blog-entry align-self-stretch">
                            <Link to="/" className="block-20" style={{backgroundImage: 'url("https://file.hstatic.net/200000000133/file/244967969_4416166485170663_5649669575000338741_n_a0204a63f53f4cfaaa9d1643d8dee9e0_grande.jpg")'}}>
                            </Link>
                            <div className="text mt-3 d-block">
                                <h3 className="heading mt-3"><Link to="/">THE SYMPHONY OF ELITE - vol.1</Link></h3>
                                <div className="meta mb-3">
                                    <div>
                                        <Link to="/">
                                            <p>Được lấy cảm hứng từ họa tiết Paisley độc đáo và giai điệu ngọt ngào của mùa thu tái hiện lên bởi gam màu nâu vàng ấm nóng và những làn gió se lạnh khiến con người ta ngây ngất, chạm đến những cung bậc cảm xúc lắng đọng và tinh tế. Eva de Eva...</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex ftco-animate">
                        <div className="blog-entry align-self-stretch">
                            <Link to="/" className="block-20" style={{backgroundImage: 'url("https://file.hstatic.net/200000000133/file/244967969_4416166485170663_5649669575000338741_n_a0204a63f53f4cfaaa9d1643d8dee9e0_grande.jpg")'}}>
                            </Link>
                            <div className="text mt-3 d-block">
                                <h3 className="heading mt-3"><Link to="/">BRILLIANT RAINBOW | SUMMER COLLECTION 2022</Link></h3>
                                <div className="meta mb-3">
                                    <div>
                                        <Link to="/">
                                            <p>Cảm xúc sau cơn bão sẽ không còn là nỗi buồn, sự trầm lắng mà thay vào đó là ánh sáng của cầu vồng, âm thanh của hy vọng về tương lai tươi sáng. Bộ sưu tập mới của Eva de Eva ra đời như một lời nhắn nhủ, một phong cách sống đầy màu sắc, tích cực gửi tới nàng...</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Blog
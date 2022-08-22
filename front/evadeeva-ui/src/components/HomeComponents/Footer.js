import React from 'react'
import { Link } from 'react-router-dom'

import "../../assets/style/style.css"

const Footer = () => {
    return (
        <div>
            <footer className="ftco-footer bg-light ftco-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Eva De Eva</h2>
                                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                    <li className="ftco-animate"><Link to="#"><span className="fab fa-twitter"></span></Link></li>
                                    <li className="ftco-animate"><Link to="#"><span className="fab fa-facebook"></span></Link></li>
                                    <li className="ftco-animate"><Link to="#"><span className="fab fa-instagram"></span></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4 ml-md-5">
                                <h2 className="ftco-heading-2">Menu</h2>
                                <ul className="list-unstyled mr-5">
                                    <li><Link to="#" className="py-2 d-block">Shop</Link></li>
                                    <li><Link to="#" className="py-2 d-block">About</Link></li>
                                    <li><Link to="#" className="py-2 d-block">Journal</Link></li>
                                    <li><Link to="#" className="py-2 d-block">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Help</h2>
                                <div className="d-flex">
                                    <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                                        <li><Link to="#" className="py-2 d-block">Shipping Information</Link></li>
                                        <li><Link to="#" className="py-2 d-block">Returns &amp; Exchange</Link></li>
                                        <li><Link to="#" className="py-2 d-block">Terms &amp; Conditions</Link></li>
                                        <li><Link to="#" className="py-2 d-block">Privacy Policy</Link></li>
                                    </ul>
                                    <ul className="list-unstyled">
                                        <li><Link to="#" className="py-2 d-block">FAQs</Link></li>
                                        <li><Link to="#" className="py-2 d-block">Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Have a Questions?</h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li><span className="icon fa-solid fa-location-dot"></span><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                                        <li><Link to="#"><span className="icon fa-solid fa-phone"></span><span className="text">+2 392 3929 210</span></Link></li>
                                        <li><Link to="#"><span className="icon fa-solid fa-envelope"></span><span className="text">info@yourdomain.com</span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p>
                                This project is made with <i className="fa-solid fa-heart"></i> by Group
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
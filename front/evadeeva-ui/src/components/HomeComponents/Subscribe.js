import React from 'react'
import { Link } from 'react-router-dom'

import "../../assets/style/style.css"

const Subscribe = () => {
  return (
    <div>
        <section className="ftco-section-parallax">
            <div className="parallax-img d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center mb-3 pb-3">
                        <div className="col-md-12 heading-section text-center ftco-animate">
                            <h1 className="big">Subscribe</h1>
                            <h2 className="mb-4">Subscribe to our Newsletter</h2>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-5">
                        <div className="col-md-8">
                            <form action="#" className="subscribe-form">
                                <div className="form-group d-flex">
                                    <input type="text" className="form-control" placeholder="Enter email address"/>
                                    <input type="submit" value="Subscribe" className="submit px-3"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Subscribe
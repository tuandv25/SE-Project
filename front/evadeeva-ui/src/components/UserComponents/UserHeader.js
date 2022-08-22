import React from 'react'
import { Link } from 'react-router-dom'

import "../../assets/style/style.css"

const UserHeader = () => {
  return (
    <div>
        <div className="hero-wrap hero-bread bg-img">
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center mt-5">
                    <div className="col-md-9 ftco-animate text-center">
                        <h1 className="mb-0 bread">Account</h1>
                        <p className="breadcrumbs">
                            <span className="mr-2 ml-2"><Link to="/">Home</Link></span>
                            <span>|</span>
                            <span className="mr-2 ml-2"><Link to="/account">User</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserHeader
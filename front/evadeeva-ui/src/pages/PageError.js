import React from 'react'
import { Link } from 'react-router-dom'
import "../assets/style/pageError.scss"

const PageError = () => {
  return (
    <div id="bg-error">
        <div>
            <h1>404</h1>
            <h3>page not found</h3>
        </div>
        <div className="container">
            <div className="ghost-copy">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
            <div className="ghost">
                <div className="face">
                    <div className="eye"></div>
                    <div className="eye-right"></div>
                    <div className="mouth"></div>
                </div>
            </div>
            <div className="shadow"></div>
        </div>
        <div className="bottom">
            <p>Boo, looks like a ghost stole this page!</p>
            <div className="buttons">
                <Link to="/">
                    <button className="btn">Back</button>
                    <button className="btn">Home</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PageError
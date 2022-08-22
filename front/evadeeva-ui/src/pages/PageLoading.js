import React from 'react'
import "../assets/style/pageLoading.scss"

const PageLoading = () => {
  return (
    <div id="bg-loading">
        <div className="wrap">
            <div className="loading">
                <div className="bounceball"></div>
                <div className="text">NOW LOADING</div>
            </div>
        </div>
    </div>
  )
}

export default PageLoading
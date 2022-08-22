import React, { useEffect, useState } from 'react'

const Search = () => {
    return (
        <form action="#" className="pl-1">
            <div className="d-flex">
                <input required type="text" className="form-control-fix" placeholder="Search"/>
                <button type="submit" value="" className="btn-fix fas fa-search submit"/>
            </div>
        </form>
    )
}

export default Search
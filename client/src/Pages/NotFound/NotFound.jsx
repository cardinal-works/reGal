import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <div id="notfound" className="text-light">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <Link to="explore" className="btn btn-regal">Go To Explore</Link>
            </div>
        </div>
    )
}

export default NotFound;
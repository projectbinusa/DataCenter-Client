import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="">
                                <a className="nav-link" href="/table">Table</a>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
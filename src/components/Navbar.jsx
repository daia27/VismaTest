import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withContext } from "../helpers/withContext";
import './Navbar.scss'
import Search from "./Search";


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <img className="d-inline-block align-top mr-2" src="/logo.png" height="30" alt="visma app logo"/>
                    <Link to="/" className="navbar-brand"><strong>vismovies</strong></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbar-content" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbar-content">
                        <Search/>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withContext(Navbar);
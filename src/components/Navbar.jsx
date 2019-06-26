import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Search from "./Search";
import {withContext} from "../helpers/withContext";
import './Navbar.scss'


class Navbar extends Component {

    get activeCategory(){
        return this.props.context.state.categories.find((item) => {
            return item.id === this.props.context.state.activeCategory;
        })
    }

    setActiveCategory(categoryId){
        this.props.context.setState({
            activeCategory: categoryId
        });
        this.props.context.getVideos(categoryId);
    }

    renderCategories(){
        return this.props.context.state.categories.map((item) => {
            return (
                <a key={item.id} className="dropdown-item" onClick={() =>this.setActiveCategory(item.id)}>{item.title}</a>
            )
        })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            </nav>
        );
    }
}

export default withContext(Navbar);
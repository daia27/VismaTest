import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import {AppContext} from './Context';
import {omdb, searchMovies} from './api/omdb';
import { getPopularMovies } from "./api/omdb";
import Home from "./views/Home";
import Search from "./views/Search";
import Navbar from "./components/Navbar";
import MovieDetail from "./views/MovieDetail";
import qs from "query-string";
import {getFavorites} from "./helpers/favorites";


library.add(faArrowAltCircleLeft);
library.add(faHeart);

export class App extends Component {
    state = {
        activeQuery: '',
        favorites: []
    };

    componentDidMount() {
        this.setState({
            favorites: getFavorites()
        });
    }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state,
                setState: this.setState.bind(this)
            }}>
                <div className="App">
                    <Router>
                        <div>
                            <Navbar/>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/search" component={Search} />
                            <Route exact path="/movie/:movieId" component={MovieDetail} />
                        </div>
                    </Router>
                </div>
            </AppContext.Provider>
        );
    }
}

export default App;

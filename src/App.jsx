import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import {AppContext} from './Context';
import {omdb, searchMovies} from './api/omdb';
import { getPopularMovies } from "./api/omdb";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import MovieDetail from "./views/MovieDetail";
import qs from "query-string";
import {getFavorites} from "./helpers/favorites";


library.add(faArrowAltCircleLeft);
library.add(faHeart);

export class App extends Component {
    state = {
        movies: [],
        activeQuery: '',
        favorites: []
    };

    componentDidMount() {
        this.setState({
            favorites: getFavorites()
        });
    }

    searchMovies(searchQuery) {
        return searchMovies(searchQuery).then((response) => {
            this.setState({
                movies: response.data.results.map((item) => {
                    return {
                        id: item.id,
                        title: item.title,
                        poster: item.poster_path
                    };
                }),
            });
        });
    }

    render() {
        return (
            <AppContext.Provider value={{state: this.state, setState: this.setState.bind(this), searchMovies: this.searchMovies.bind(this)}}>
                <div className="App">
                    <Router>
                        <div>
                            <Navbar/>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/movie/:movieId" component={MovieDetail} />
                        </div>
                    </Router>
                </div>
            </AppContext.Provider>
        );
    }
}

export default App;

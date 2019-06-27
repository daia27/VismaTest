import React, { Component } from 'react';
import {withContext} from "../helpers/withContext";
import {withRouter} from "react-router";
import {searchMovies} from "../api/omdb";
import qs from "query-string";
import MovieThumbnail from "../components/MovieThumbnail";

class Search extends Component {
    state = {
        movies: [],
        loading: true
    };

    componentDidMount() {
        const searchQuery = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search;

        this.props.context.setState({
            activeQuery: searchQuery,
            searchMode: true
        });

        searchMovies(searchQuery).then((response) => {
            this.setState({
                loading: false,
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

    renderMovies() {
        return this.state.movies.map((item) => {
            return (
                <div className='col-lg-2 col-md-5 col-sm-5 col-10' key={item.id}>
                    <MovieThumbnail id={item.id} title={item.title} poster={item.poster} showFavorite={true} />
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container pt-4'>
                <div className='row'>
                    <div className="col-10">
                        <h1>Search results</h1>
                        <p>{ !this.state.loading && this.state.movies.length === 0 ? 'No movies were found.' : null }</p>
                    </div>

                    {this.renderMovies()}
                </div>
            </div>
        );
    }
}

export default withRouter(withContext(Search));
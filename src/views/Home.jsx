import React, { Component } from 'react';
import {withContext} from "../helpers/withContext";
import MovieThumbnail from "../components/MovieThumbnail";
import {withRouter} from "react-router";
import {App} from "../App";
import qs from "query-string";
import {getPopularMovies} from "../api/omdb";

class Home extends Component {
    componentDidMount() {
        const searchQuery = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search;

        if (searchQuery) {
            this.props.context.setState({
                activeQuery: searchQuery
            });

            this.props.context.searchMovies(searchQuery);
        } else {
            getPopularMovies().then((response) => {
                this.props.context.setState({
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
    }

    renderMovies() {
        return this.props.context.state.movies.map((item) => {
            return (
                <div className='col-lg-2 col-md-5 col-sm-5 col-10' key={item.id}>
                    <MovieThumbnail id={item.id} title={item.title} poster={item.poster} />
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container pt-4'>
                <div className='row'>
                    {this.renderMovies()}
                </div>
            </div>
        );
    }
}

export default withRouter(withContext(Home));
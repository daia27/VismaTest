import React, { Component } from 'react';
import {getMovie} from "../api/omdb";
import './MovieDetail.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {withContext} from "../helpers/withContext";
import MovieFavorite from '../components/MovieFavorite';


class MovieDetail extends Component {
    state = {
        title: '',
        description: '',
        backdrop: '',
        id: '',
        rating: 0
    };

    componentDidMount () {
        const {movieId} = this.props.match.params;

        getMovie(movieId).then((response) => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.overview,
                backdrop: response.data.backdrop_path,
                genre: response.data.genres.map((genre) => {
                    return genre.name;
                }).join(', '),
                rating: response.data.vote_average,
                poster: response.data.poster_path
            });
        });
    }

    render() {
        return (
            <div className="movie-detail-wrapper">
                { this.state.backdrop ?
                    <img src={'https://image.tmdb.org/t/p/w1400_and_h450_face/' + this.state.backdrop } alt={this.state.title} /> : null }

                <div className='container pt-4'>
                    <div className='row'>
                        <div className='col'>
                           <div className='movie-details'>
                               <div className="movie-title"> <h1>{this.state.title}</h1></div>
                               <div className="movie-statistics">
                                   <div>
                                       {this.state.genre}
                                   </div>
                                   <div>
                                       {this.state.rating}/10

                                       { this.state.id ? <MovieFavorite movieId={this.state.id} title={this.state.title} poster={this.state.poster} /> : null }
                                   </div>
                               </div>
                               <div className="movie-description mt-3">{this.state.description}</div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withContext(MovieDetail);
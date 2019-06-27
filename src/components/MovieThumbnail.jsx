import React, {Component} from 'react';
import './MovieThumbnail.scss'
import {Link} from "react-router-dom";
import MovieFavorite from "./MovieFavorite";

export default class MovieThumbnail extends Component {
    render() {
        return (
            <div className='movie-thumbnail'>
                <Link to={`/movie/${this.props.id}`}>
                    { this.props.poster ?
                        <img className='movie-thumbnail-image' src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + this.props.poster} alt={this.props.title}/> :
                        null }
                    <div className='movie-thumbnail-content'>
                        <div className='title'>{this.props.title}</div>
                    </div>
                </Link>
                {this.props.id ? <div className="movie-thumbnail-favorite"><MovieFavorite movieId={this.props.id} title={this.props.title} poster={this.props.poster}/></div> : null}
            </div>
        )
    }
}
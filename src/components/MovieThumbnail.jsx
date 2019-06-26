import React, {Component} from 'react';
import './MovieThumbnail.scss'
import {Link} from "react-router-dom";

export default class MovieThumbnail extends Component {
    render() {
        return (
            <Link to={`/movie/${this.props.id}`} className='movie-thumbnail'>
                { this.props.poster ?
                    <img className='movie-thumbnail-image' src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + this.props.poster} alt={this.props.title}/> :
                    null }
                <div className='movie-thumbnail-content'>
                    <div className='title'>{this.props.title}</div>
                </div>
            </Link>
        )
    }
}
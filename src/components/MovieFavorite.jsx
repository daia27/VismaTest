import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {Component} from 'react';
import './MovieFavorite.scss'

export default class MovieFavorite extends Component {
    render() {
        return (
            <span className="movie-favorite">
                <FontAwesomeIcon icon={'heart'} />
            </span>
        )
    }
}
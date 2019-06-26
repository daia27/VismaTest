import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {Component} from 'react';
import './MovieFavorite.scss'
import {getFavorites} from "../helpers/favorites";

export default class MovieFavorite extends Component {
    state = {
        isFavorite: false
    };

    constructor(props, state) {
        super(props, state);

        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    componentDidMount() {
        const favorites = getFavorites();

        console.log(favorites, this.props.movieId)

        if (favorites.find((fav) => fav === this.props.movieId)) {
            this.setState({
                isFavorite: true
            });
        }
    }

    toggleFavorite() {
        const favorites = getFavorites();
        const favIndex = favorites.findIndex((fav) => fav === this.props.movieId);

        if (favIndex !== -1) {
            favorites.splice(favIndex, 1);

            this.setState({
                isFavorite: false
            });
        } else {
            favorites.push(this.props.movieId);

            this.setState({
                isFavorite: true
            });
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    render() {
        return (
            <span onClick={this.toggleFavorite} className={ "movie-favorite" + (this.state.isFavorite ? ' is-favorite' : '') }>
                <FontAwesomeIcon icon={'heart'} />
            </span>
        )
    }
}
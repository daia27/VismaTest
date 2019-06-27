import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {Component} from 'react';
import './MovieFavorite.scss'
import {getFavorites} from "../helpers/favorites";
import {withContext} from "../helpers/withContext";

class MovieFavorite extends Component {
    state = {
        isFavorite: false
    };

    constructor(props, state) {
        super(props, state);

        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    componentDidMount() {
        const favorites = getFavorites();

        if (favorites.find((fav) => fav.id === this.props.movieId)) {
            this.setState({
                isFavorite: true
            });
        }
    }

    toggleFavorite() {
        const favorites = getFavorites();
        const favIndex = favorites.findIndex((fav) => fav.id === this.props.movieId);

        if (favIndex !== -1) {
            favorites.splice(favIndex, 1);

            this.setState({
                isFavorite: false
            });
        } else {
            favorites.push({
                id: this.props.movieId,
                title: this.props.title,
                poster: this.props.poster
            });

            this.setState({
                isFavorite: true
            });
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        this.props.context.setState({
            favorites: favorites
        })
    }

    render() {
        return (
            <span onClick={this.toggleFavorite} className={ "movie-favorite" + (this.state.isFavorite ? ' is-favorite' : '') }>
                <FontAwesomeIcon icon={'heart'} />
            </span>
        )
    }
}

export default withContext(MovieFavorite);
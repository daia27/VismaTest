import React, {Component} from 'react';
import './MovieThumbnail.scss'
import {Link} from "react-router-dom";

export class MovieThumbnail extends Component {
    render() {
        return (
            <Link to={`/video/${this.props.videoId}`} className='video-thumbnail'>
                <img className='video-thumbnail-image' src={this.props.image} alt={this.props.title}/>
                <div className='video-thumbnail-content'>
                    <div className='title'>{this.props.title}</div>
                    <div className='author'>{this.props.author}</div>
                </div>
            </Link>
        )
    }
}
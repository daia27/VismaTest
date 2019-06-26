import React, { Component } from 'react';
import {MovieThumbnail} from "../components/MovieThumbnail";
import {withContext} from "../helpers/withContext";

class Home extends Component {
    renderVideos() {
        return this.props.context.state.videos.map((item) => {
            return (
                <div className='col-lg-2 col-md-5 col-sm-5 col-10' key={item.videoId}>
                    <MovieThumbnail videoId={item.videoId} image={item.thumbnail} title={item.title} author={item.channelTitle}/>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container pt-4'>
                <div className='row'>
                    {this.renderVideos()}
                </div>
            </div>
        );
    }
}

export default withContext(Home);
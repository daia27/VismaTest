import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import {AppContext} from './Context';
import {omdb} from './api/omdb';
import MovieDetail from "./views/MovieDetail";

library.add(faThumbsUp);
library.add(faThumbsDown);
library.add(faArrowAltCircleLeft);

export class App extends Component {
    state = {
        categories: [],
        videos: [],
        activeCategory: '',
        activeQuery: ''
    };

    // async componentDidMount() {
    //     const categoriesResponse: ICategoryResponse = await youtube.get('/videoCategories', {
    //         params: {
    //             regionCode: 'US'
    //         }
    //     });
    //
    //     this.setState({
    //         categories: categoriesResponse.data.items.map((item) => {
    //             return {
    //                 id: item.id,
    //                 title: item.snippet.title
    //             }
    //         }),
    //     });
    //
    //     this.getVideos(this.defaultCategory);
    // }

    // async getVideos(categoryId: string, query: string = '') {
    //     const videosResponse: IVideoResponse = await youtube.get('/search', {
    //         params: {
    //             type: 'video',
    //             regionCode: 'US',
    //             videoCategoryId: categoryId,
    //             q: query,
    //             maxResults: '10',
    //         }
    //     });
    //
    //     this.setState({
    //         videos: videosResponse.data.items.map((item) => {
    //             return {
    //                 videoId: item.id.videoId,
    //                 channelId: item.snippet.channelId,
    //                 channelTitle: item.snippet.channelTitle,
    //                 title: item.snippet.title,
    //                 thumbnail: item.snippet.thumbnails.high.url
    //             }
    //         }),
    //         activeCategory: categoryId,
    //         activeQuery: query
    //     });
    // }

    render() {
        return (
            <AppContext.Provider value={{state: this.state, setState: this.setState.bind(this)}}>
                <div className="App">
                    <Router>
                        <div>
                            <Navbar/>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/movie/:movieId" component={MovieDetail} />
                        </div>
                    </Router>
                </div>
            </AppContext.Provider>
        );
    }
}

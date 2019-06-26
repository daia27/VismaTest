import React, { Component } from 'react';
import {omdb} from "../api/omdb";
import './MovieDetail.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {withContext} from "../helpers/withContext";

class MovieDetail extends Component {
    state = {
        title: '',
        author: '',
        description: '',
        videoId: '',
        comments: [],
        viewCount: 0,
        upVotes: 0,
        downVotes: 0
    };

    async componentDidMount () {
        const {videoId} = this.props.match.params;

        const videoDetailResponse = await omdb.get('/videos', {
            params: {
                id: videoId,
                part: 'snippet,contentDetails,statistics',
            }
        });

        this.setState({
            title: videoDetailResponse.data.items[0].snippet.title,
            author: videoDetailResponse.data.items[0].snippet.channelTitle,
            description: videoDetailResponse.data.items[0].snippet.description,
            videoId,
            upVotes: videoDetailResponse.data.items[0].statistics.likeCount,
            downVotes: videoDetailResponse.data.items[0].statistics.dislikeCount,
            viewCount: videoDetailResponse.data.items[0].statistics.viewCount
        });

        const commentsResponse = await omdb.get('/commentThreads', {
            params: {
                videoId: videoId,
                part: 'snippet,replies',
                maxResults: 50
            }
        });

        this.setState({
            comments: commentsResponse.data.items.map((item) => {
                return {
                    text: item.snippet.topLevelComment.snippet.textDisplay,
                    author: item.snippet.topLevelComment.snippet.authorDisplayName,
                    replies: ((item.replies || {}).comments || []).map((subItem) => {
                        return {
                            text: subItem.snippet.textDisplay,
                            author: subItem.snippet.authorDisplayName
                        }
                    })
                }
            })
        });
    }

    renderComments() {
        return this.state.comments.map((item, itemIndex) => (
            <div className="comment-wrapper" key={itemIndex}>
                <div className="comment">
                    <div><strong>{item.author}</strong></div>
                    <div>{item.text}</div>
                </div>

                { item.replies.length > 0 ?
                    <div className="replies">
                        { item.replies.map((subItem, subItemIndex) => (
                            <div className="comment" key={subItemIndex}>
                                <div><strong>{subItem.author}</strong></div>
                                <div>{subItem.text}</div>
                            </div>
                        ))
                        }
                    </div> : null }
            </div>
        ));
    }

    render() {
        return (
            <div className='container pt-4'>
                <div className='row'>
                    <div className="back-button">
                        <Link to="/">
                            <button className="btn btn-outline-primary my-2 my-sm-0"><FontAwesomeIcon icon="arrow-alt-circle-left"/>Back</button>
                        </Link>
                    </div>
                    <div className='col'>
                        <iframe src={`http://www.youtube.com/embed/${this.props.match.params.videoId}?autoplay=1`} width="840" height="475" frameBorder="0" allowFullScreen/>
                       <div className='video-details'>
                           <div className="video-title"> <strong>{this.state.title}</strong></div>
                           <div className="video-statistics">
                               <div className="video-views-count">{this.state.viewCount} views</div>
                               <div className="video-likes-dislikes">
                                   {this.state.upVotes}
                                   <FontAwesomeIcon icon="thumbs-up"/>
                                   {this.state.downVotes}
                                   <FontAwesomeIcon icon="thumbs-down" />
                               </div>
                           </div>
                           <div className="video-author"><strong>{this.state.author}</strong></div>
                           <div className="video-description">{this.state.description}</div>
                           <h5>Comments</h5>
                           <div className="video-comments">{this.renderComments()}</div>
                       </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withContext(MovieDetail);
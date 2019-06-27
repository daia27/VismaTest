import React, {Component} from 'react';
import { withRouter} from "react-router";
import { withContext } from "../helpers/withContext";

class Search extends Component {

    constructor(props, state) {
        super(props, state);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.props.context.setState({
            activeQuery: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();

        if (this.props.context.state.activeQuery) {
            this.props.context.searchMovies(this.props.context.state.activeQuery)
                .then(() => {
                    this.props.history.push("/?search="+this.props.context.state.activeQuery);
                    this.props.context.setState({
                        searchMode: true
                    });
                });
        } else {
            this.props.context.getPopularMovies()
                .then(() => {
                    this.props.history.push("/");
                    this.props.context.setState({
                        searchMode: false
                    });
                });
        }
    }

    render() {
        return (
            <form className="form-inline my-2 my-lg-0 ml-3" onSubmit={this.handleSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search for a movie" aria-label="Search" onChange={this.handleChange} value={this.props.context.state.activeQuery}/>
                <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
            </form>
        );
    }
}

export default withRouter(withContext(Search));
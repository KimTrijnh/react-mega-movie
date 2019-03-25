import React, { Component } from 'react'
import YouTube from '@u-wave/react-youtube';

export default class Trailer extends Component {
    constructor(props) {
        super(props);
        this.state = { trailer: {} };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        console.log(this.props.movieId);
        const API_KEY = "f55e42fa6f08a80dc89685d49eab586d";
        const TrailerAPI = `https://api.themoviedb.org/3/movie/${this.props.movieId}/videos?api_key=${API_KEY}`;

        fetch(TrailerAPI)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    trailer: data.results.find(ele => {
                        return ele.type === 'Trailer'
                    })
                }, () => console.log(this.state.trailer));
            });
    }

    render() {
        return (
            <div>
                <YouTube
                    video={this.state.trailer.key}
                    autoplay
                />
            </div>
        )
    }
}

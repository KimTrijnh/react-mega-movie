import React, { Component } from 'react'
import YouTube from '@u-wave/react-youtube';

export default class Trailer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trailers: [],
            currentTrailer: {},
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const API_KEY = "f55e42fa6f08a80dc89685d49eab586d";
        const TrailerAPI = `https://api.themoviedb.org/3/movie/${this.props.movieId}/videos?api_key=${API_KEY}`;

        fetch(TrailerAPI)
            .then(response => response.json())
            .then(async data => {
                console.log(data)
                await this.setState({
                    trailers: data.results.filter(ele => {
                        return ele.type === 'Trailer'
                    })
                });
                await this.setState({
                    currentTrailer: this.state.trailers[0]
                }, () => console.log(this.state.currentTrailer));
            });
    }
    chooseTrailer = index => {
        this.setState({
            currentTrailer: this.state.trailers[index]
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-5">
                        {this.state.trailers.map((trailer, index) => (
                            <p key={index}>{index + 1}. <a href="#" onClick={() => this.chooseTrailer(index)}>{trailer.name}</a></p>
                        ))}
                    </div>
                    <div className="col-12 col-sm-7">
                        <div className="videoWrapper">
                            <YouTube
                                video={this.state.currentTrailer.key}
                                autoplay
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

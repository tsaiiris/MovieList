import React, { Component, Fragment } from 'react'


import axios from '../../../axios'

import App from '../../../App'
import Movie from '../movielistcontent/movie/Movie'
import PageBar from './pagebar/PageBar'
import Spinner from '../../../ui/spinner/Spinner'
import SortBar from './sortmovie/SortMovie'

class MovieListContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            currentPage: +this.props.match.params.id,
            totalPage: null
        }
    }

    // Call at the first time
    componentDidMount() {
        this.fetchDataHandler(+this.props.match.params.id)
    }

    // Call everytime when url has changed
    componentDidUpdate() {
        if (this.state.currentPage != +this.props.match.params.id) {
            this.fetchDataHandler(+this.props.match.params.id)
        }
    }

    fetchDataHandler = (page) => {
        axios.get('movie/popular?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US&page=' + page)
            .then(Response => {
                this.setState({
                    data: Response['data']['results'],
                    totalPage: Response['data']['total_pages'],
                    currentPage: page
                })
            })
    }

    toggleLikedMoviesHandler = (id, movie) => {
        if (App.likedMovies.has(id)) {
            App.likedMovies.delete(id)
        } else {
            App.likedMovies.set(id, movie)
        }
        this.setState({})
    }

    sortByTitle = () => {
        this.state.data.sort(function (movie1, movie2) {

            if (movie1['title'] > movie2['title']) {
                return 1

            } else if (movie1['title'] < movie2['title']) {
                return -1

            } else {
                return 0
            }
        })

        this.setState({
            data: this.state.data
        })
    }

    sortByVoteCount = () => {
        this.state.data.sort(function (movie1, movie2) {

            if (movie1['vote_count'] > movie2['vote_count']) {
                return 1

            } else if (movie1['vote_count'] < movie2['vote_count']) {
                return -1

            } else {
                return 0
            }
        })

        this.setState({
            data: this.state.data
        })
    }

    sortByVoteAverage = () => {
        this.state.data.sort(function (movie1, movie2) {

            if (movie1['vote_average'] > movie2['vote_average']) {
                return 1

            } else if (movie1['vote_average'] < movie2['vote_average']) {
                return -1

            } else {
                return 0
            }
        })

        this.setState({
            data: this.state.data
        })

    }

    sortByReleaseDate = () => {
        this.state.data.sort(function (movie1, movie2) {

            if (movie1['release_date'] > movie2['release_date']) {
                return 1

            } else if (movie1['release_date'] < movie2['release_date']) {
                return -1

            } else {
                return 0
            }
        })

        this.setState({
            data: this.state.data
        })

    }

    render() {
        let movies = <Spinner />

        if (this.state.data) {

            movies = this.state.data.map(res => {

                return (
                    <Movie
                        key={res['id']}
                        toggleLikedMoviesHandler={this.toggleLikedMoviesHandler}
                        movie={res}
                    />
                )
            })
        }

        return (
            <Fragment>
                <SortBar
                    sortByTitle={this.sortByTitle}
                    sortByVoteCount={this.sortByVoteCount}
                    sortByVoteAverage={this.sortByVoteAverage}
                    sortByReleaseDate={this.sortByReleaseDate} />
                <PageBar
                    currentpage={this.state.currentPage}
                    totalpage={this.state.totalPage} />
                <div>{movies}</div>

            </Fragment>


        )
    }
}

export default MovieListContent
import React, { Component } from "react";
import { getMovies,deleteMovie } from "../services/movieService";
import Pagination from "./common/Pagination";
import { Paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import Search from './common/Search'
import { getGenres } from "../services/genreService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    pageSize: 4,
    currPage: 1,
    searchQuery:"",
  };
 async componentDidMount() { 
    const {data}=await getGenres();
  
    const allGenres = [{ _id: "", name: "All Genres" }, ...data];
    const {data:allMovies}=await getMovies()
    
    this.setState({
      movies: allMovies,
      genres: allGenres
    });
  }
  deleteMovie = async id => {
    const { movies: filteredMovie } = this.state;
    const originalState=this.state.movies
    this.setState({
      movies: filteredMovie.filter(mov => mov._id !== id)
    })
    
    try{
    await deleteMovie(id)
    }
    catch(ex){
  if(ex.response&&ex.response.status==404){
    toast.error("It's already deleted")
  }
  this.setState({
    movies:originalState
  })
    }
  };

  changeLike = moviePassed => {
    const { movies } = this.state;
    const moviesNew = [...movies];
    const index = moviesNew.indexOf(moviePassed);
    moviesNew[index] = { ...movies[index] };
    moviesNew[index].liked = !moviesNew[index].liked;
    this.setState({
      movies: moviesNew
    });
  };
  handleChange = page => {
    this.setState({
      currPage: page
    });
  };
  handleGenre = genrePassed => {
    this.setState({ genreSelected: genrePassed,searchQuery:"", currPage: 1 });
  };
  handleSort = sortPassed => {
    this.setState({ sortColumn: sortPassed });
  };
  handleSearch=query=>{
   this.setState({searchQuery:query,genreSelected:null,currPage:1})
  }
  
  getPageData = () => {
    const {
      movies:allMovies,
      currPage,
      pageSize,
      genreSelected,
      searchQuery,
      sortColumn
    } = this.state;
    let filtered =allMovies;
    if(searchQuery)
      filtered=allMovies.filter(m=>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    
    else if (genreSelected && genreSelected._id)
      filtered = allMovies.filter(m => m.genre._id === genreSelected._id);
      
 
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const moviePaginated = Paginate(sorted, currPage, pageSize);
    return { count: filtered.length, moviePaginated };
  };
  render() {
    const {user} =this.props;
    const {
      movies,
      searchQuery,
      sortColumn
    } = this.state;
    if (movies.length === 0) return <span>The table consists of no data</span>;

    const { count, moviePaginated } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onhandleItem={this.handleGenre}
            onItemSelected={this.state.genreSelected}
          />
        </div>

        <div className="col">
          <div>
            {user&&(<Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>)}
          </div>
          <div>
            <Search value={searchQuery} onSearch={this.handleSearch}/>
          </div>
          <span>The consists of {count} Movies</span>

          <MoviesTable
            moviePaginated={moviePaginated}
            deleteMovie={this.deleteMovie}
            changeLike={this.changeLike}
            column={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            pageSize={this.state.pageSize}
            count={count}
            current={this.state.currPage}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

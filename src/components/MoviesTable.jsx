import React, { Component } from "react";
import Like from "./common/Like";
import auth from '../services/authService';
import { Link } from "react-router-dom";

import Table from "./common/Table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: movie => (
        <Like status={movie.liked} click={() => this.props.changeLike(movie)} />
      )
    },
    
  ];
deleteColumn={
  key: "Delete",
  content: item => (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => this.props.deleteMovie(item._id)}
    >
      Delete
    </button>
  )
}



  constructor(){
    super();
   const user=auth.getCurrentUser();
   if(user && user.isAdmin)
   this.columns.push(this.deleteColumn)
  }
 
  render() {
    const { moviePaginated,onSort, column } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={column}
        onSort={onSort}
        data={moviePaginated}
      />
    );
  }
}

export default MoviesTable;

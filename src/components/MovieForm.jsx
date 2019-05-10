import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
//import { getGenres } from "../services/fakeGenreService";
import {getGenres} from '../services/genreService';
import { saveMovie, getMovie } from "../services/movieService";
class MovieForm extends Form {
  state = {
    data: {title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: ""},
    genres: [],
    errors: {}
  };

  Schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

       async populateGenre(){
         const {data:genres}=await getGenres()
        this.setState({ genres: genres });

       }
       async populateMovie(){
         try{
           const movieId = this.props.match.params.id;
           if (movieId === "new") return;
         const {data:movie} = await getMovie(movieId); 
         
         this.setState({
           data: this.mapViewModel(movie)
         }); }
         catch(ex){
         if (ex.response && ex.response.status==404)  this.props.history.replace("/not-found");
         }
       }

   async componentDidMount() {
     await this.populateGenre();
     await this.populateMovie();
    
  }
  mapViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
   async doSubmit() {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number in Stock", "number", false)}
        {this.renderInput(
          "dailyRentalRate",
          "Daily Rental Rate",
          "number",
          false
        )}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default MovieForm;

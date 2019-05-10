import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import Register from "./components/Register";
import NotFound from "./components/Not-found";
import LoginForm from "./components/LoginForm";
import LogOut from './components/LogOut';
import auth from './services/authService';
import MovieForm from "./components/MovieForm";
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {

  state={

  }

  componentDidMount(){
    const user=auth.getCurrentUser();
    this.setState({
     user 
     })
  }
    
  
  render() {
    
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user}/>
        <main className="container">
          <Switch>
            <Route path="/Login" component={LoginForm} />
            <Route path="/Logout" component={LogOut} />
            <Route path="/Register" component={Register} />
            <Route path="/Customers" component={Customers} />
            <Route path="/Rentals" component={Rentals} />
            <Route path="/movies" exact render={props=><Movies {...props} user={this.state.user}/>} />
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute path="/movies/:id" component={MovieForm}/> }}/>

            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

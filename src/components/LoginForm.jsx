import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from '../services/authService';
import {Redirect} from 'react-router-dom';
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  Schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async() => {
    try{
      const {data}=this.state
      await auth.login(data.username,data.password);
      const {state}=this.props.location;
      window.location=state?state.from.pathname:'/';
      window.location='/';    }
    catch(ex){
      if(ex.response&&ex.response.status==400){
        const error={...this.state.errors};
        error.username=ex.response.data;
        console.log("fff",ex.response.data)
        this.setState({
          errors:error
        })
      }
    }
  };
  render() {
    if(auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password", false)}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

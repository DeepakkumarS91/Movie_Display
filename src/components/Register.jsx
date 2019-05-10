import React, { Component } from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import * as User from '../services/userService';
import auth from '../services/authService';

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };
  Schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .alphanum()
      .min(5)
      .max(15)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };
  doSubmit = async() => {
    try{
      const data=await User.registerUser(this.state.data)
      auth.loginWithJwt(data.headers['x-auth-token']);
      window.location='/';    
}catch(ex){
      if(ex.response&&ex.response.status==400){
        const error={...this.state.errors};
        error.username=ex.response.data;
        this.setState({
          errors:error
        })
      }
    }

  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password", false)}
          {this.renderInput("name", "Name", "text", false)}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;

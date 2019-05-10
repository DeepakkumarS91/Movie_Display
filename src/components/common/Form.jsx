import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  propertyChange = item => {
    const field = { [item.name]: item.value };
    const schema = { [item.name]: this.Schema[item.name] };
    const { error } = Joi.validate(field, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = ({ currentTarget: item }) => {
    const data = { ...this.state.data };
    data[item.name] = item.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.propertyChange(item);
    if (errorMessage) errors[item.name] = errorMessage;
    else delete errors[item.name];
    this.setState({
      data: data,
      errors: errors
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors: errors || {}
    });
    if (errors) return;
    this.doSubmit();
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.Schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn-primary btn-sm">
        {label}
      </button>
    );
  };
  renderSelect(name, label, options) {
    return (
      <Select
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={this.state.errors[name]}
        value={this.state.data[name]}
      />
    );
  }
  renderInput(name, label, type = "text", autoFocus = true) {
    return (
      <Input
        autoFocus={autoFocus}
        type={type}
        name={name}
        label={label}
        onChange={this.handleChange}
        error={this.state.errors[name]}
        value={this.state.data[name]}
      />
    );
  }
}

export default Form;

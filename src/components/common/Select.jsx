import React, { Component } from "react";
const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={name}> {label} </label>

        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;

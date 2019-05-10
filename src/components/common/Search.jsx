import React, { Component } from 'react';
const Search = ({searchQuery,onSearch}) => {
    return ( <input type="text" className="form-control my-3" name="query" placeholder="Search..." value={searchQuery} onChange={(e)=>onSearch(e.currentTarget.value)} ></input> );
}
 
export default Search;
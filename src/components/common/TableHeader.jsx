import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const { columns, onSort } = this.props;
    const sortColumn = { ...columns };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else  {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };
  createIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead className="thead-dark">
        <tr>
          {columns.map(eachColumn => (
            <th
              key={eachColumn.path || eachColumn.key}
              className="curpointer"
              onClick={() => this.raiseSort(eachColumn.path)}
            >
              {eachColumn.label}
              {this.createIcon(eachColumn)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

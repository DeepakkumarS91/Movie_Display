import React from "react";

const ListGroup = ({
  items,
  onhandleItem,
  valueProp,
  textProp,
  onItemSelected
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onhandleItem(item)}
          key={item[valueProp]}
          className={
            item === onItemSelected
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProp]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  valueProp: "_id",
  textProp: "name"
};

export default ListGroup;

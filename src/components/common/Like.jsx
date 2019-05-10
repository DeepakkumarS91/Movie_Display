import React from "react";
const Like = ({ status, click }) => {
  let buttonClass = "fa fa-heart";

  if (!status) buttonClass += "-o";

  return (
    <i className={buttonClass} onClick={click} style={{ cursor: "pointer" }} />
  );
};

export default Like;

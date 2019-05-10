import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = ({ pageSize, count, current, onChange }) => {
  const pages = Math.ceil(count / pageSize);
  if (pages === 1) return null;
  const pageRange = _.range(1, pages + 1);

  return (
    <nav>
      <ul className="pagination">
        {pageRange.map(page => (
          <li
            className={page === current ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              onClick={() => {
                onChange(page);
              }}
              className="page-link"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Pagination;

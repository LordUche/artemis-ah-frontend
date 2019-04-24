import React from 'react';
import { Link } from 'react-router-dom';
import { number, func } from 'prop-types';

/**
 * @method Pagination
 * @returns {JSX} JSX markup
 */
const Pagination = ({ currentPage, numberOfPages, handlePagination }) => (
  <div className="pagination">
    <div className={`page__first ${currentPage <= 1 ? 'disabled' : ''}`}>
      <Link
        to="./page?currentPage"
        data-page="1"
        onClick={handlePagination}
        className="page__arrow-first"
      >
        <i id="first-page" className="fas fa-angle-double-left" />
      </Link>
      <p>First</p>
    </div>
    <div className={`page__previous ${currentPage <= 1 ? 'disabled' : ''}`}>
      <Link
        to="./page?currentPage"
        data-page={currentPage > 1 ? currentPage - 1 : 1}
        onClick={handlePagination}
        className="page__arrow-previous"
      >
        <i id="previous-page" className="fas fa-angle-left" />
      </Link>
      <p>Previous</p>
    </div>
    <div className="page__number">
      <p>
        {currentPage}
        {' '}
of
        {` ${numberOfPages}`}
      </p>
    </div>
    <div className={`page__next ${currentPage >= numberOfPages ? 'disabled' : ''}`}>
      <Link
        to="./page?currentPage"
        data-page={currentPage < numberOfPages ? currentPage + 1 : numberOfPages}
        onClick={handlePagination}
        className="page__arrow-next"
      >
        <i id="next-page" className="fas fa-angle-right" />
      </Link>
      <p>Next</p>
    </div>
    <div className={`page__last ${currentPage >= numberOfPages ? 'disabled' : ''}`}>
      <Link
        to="./page?currentPage"
        data-page={numberOfPages}
        onClick={handlePagination}
        className="page__arrow-last"
      >
        <i id="last-page" className="fas fa-angle-double-right" />
      </Link>
      <p>Last</p>
    </div>
  </div>
);

export default Pagination;

Pagination.propTypes = {
  currentPage: number.isRequired,
  numberOfPages: number.isRequired,
  handlePagination: func.isRequired
};

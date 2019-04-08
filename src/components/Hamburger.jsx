import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Hamburger component
 * @param {object} props
 * @returns {undefined}
 */
const Hamburger = (props) => {
  const {
    openMenu, closeMenu, hamburgerStateOpen, hamburgerStateClose
  } = props;

  return (
    <Fragment>
      <i
        className="fas fa-bars"
        id="hamburger"
        style={{ display: hamburgerStateClose }}
        role="presentation"
        onClick={() => openMenu()}
      />
      <span
        id="hamburger-ex"
        style={{ display: hamburgerStateOpen }}
        role="presentation"
        onClick={() => closeMenu()}
      >
        &times;
      </span>
    </Fragment>
  );
};

Hamburger.propTypes = {
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  hamburgerStateOpen: PropTypes.string,
  hamburgerStateClose: PropTypes.string
};

Hamburger.defaultProps = {
  hamburgerStateOpen: 'inline-block',
  hamburgerStateClose: 'none'
};

export default Hamburger;

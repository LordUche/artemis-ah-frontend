import React, { Fragment } from 'react';
import { func, string } from 'prop-types';

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
  openMenu: func.isRequired,
  closeMenu: func.isRequired,
  hamburgerStateOpen: string,
  hamburgerStateClose: string
};

Hamburger.defaultProps = {
  hamburgerStateOpen: 'inline-block',
  hamburgerStateClose: 'none'
};

export default Hamburger;

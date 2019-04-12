import React from 'react';
import { node, bool, func } from 'prop-types';

/**
 * @description Hamburger component
 * @param {object} props
 * @returns {undefined}
 */
const Hamburger = ({
  children, open, toggleMenu
}) => (
  <div className="hamburger_div">
    <i
      className="fas fa-bars"
      id="hamburger"
      role="presentation"
      onClick={toggleMenu}
    />

    <section className="hamburger_div_menu">
      { open && <div className="hamburger_div_menu_backdrop" onClick={toggleMenu} role="presentation" /> }
      <aside className={`hamburger_div_menu_aside ${open ? 'hamburger_div_menu_aside_show' : 'hamburger_div_menu_aside_hide'}`}>
        <span
          id="hamburger-ex"
          role="presentation"
          onClick={toggleMenu}
        >
        &times;
        </span>
        <ul onClick={toggleMenu} role="presentation">
          {children}
        </ul>
      </aside>
    </section>
  </div>
);

Hamburger.propTypes = {
  children: node.isRequired,
  open: bool.isRequired,
  toggleMenu: func.isRequired
};


export default Hamburger;

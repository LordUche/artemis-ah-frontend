import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @description NavDrowndown - Navigation Dropdown component for view
 * @param {object} event - React SyntheticEvent object
 * @returns {JSX} - JSX component
 */
class NavDropdown extends Component {
  state = {
    dropdownShown: false
  }

  /**
   * @description toggleDropdown - Show dropdown
   * @param {object} event - React SyntheticEvent object
   * @returns {undefined}
   */
  toggleDropdown = (event) => {
    if (event.type === 'click' || event.type === 'mouseenter') {
      event.preventDefault();
      this.setState({ dropdownShown: true });
    } else {
      this.setState({ dropdownShown: false });
    }
  }

  /**
 * @description Render - Render method for Navigation Dropdown component for view
 * @param {object} props - Props object
 * @returns {JSX} - JSX component
 */
  render() {
    const { dropdownShown } = this.state;
    const {
      parentLinkName, icon, children
    } = this.props;
    return (
      <li className="dropdown__trigger">
        <Router>
          <Link id="explore" onMouseLeave={this.toggleDropdown} onClick={this.toggleDropdown} to="./explore">
            {parentLinkName}
            {' '}
            <i className={`fas fa-${icon}`} />
          </Link>
          <ul onMouseEnter={this.toggleDropdown} onMouseLeave={this.toggleDropdown} className={`dropdown__body ${dropdownShown ? 'open' : ''}`}>
            {children}
          </ul>
        </Router>
      </li>
    );
  }
}

export default NavDropdown;

NavDropdown.propTypes = {
  parentLinkName: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object).isRequired
};

NavDropdown.defaultProps = {
  icon: 'angle-down'
};

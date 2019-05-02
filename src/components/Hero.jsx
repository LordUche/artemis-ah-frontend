import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
  object, shape, func, bool, string, number
} from 'prop-types';
import logo from '../assets/img/logo.svg';
import illustration from '../assets/img/illustration.svg';
import NavDropdown from './NavDropdown';
import AHLoginModal from '../views/LoginModal';
import Hamburger from './Hamburger';
import Button from './Button';
/**
 * @description Hero - Hero component for Landing Page view
 * @param {object} e event object
 * @returns {JSX} - JSX component
 */
class Hero extends Component {
  state = {
    displaySearchBar: false,
    searchQuery: '',
    showResponsiveNav: false
  };

  toggleResponsiveNav = () => {
    const { showResponsiveNav } = this.state;
    this.setState({
      showResponsiveNav: !showResponsiveNav
    });
  };

  searchButtonOnclick = () => {
    this.setState({
      displaySearchBar: true
    });
  };

  hideSearchField = (e) => {
    if (
      e.target.name !== 'searchQuery'
      && e.target.id !== 'search'
      && (e.target.id !== 'searchIconChild' && e.target.id !== 'searchIcon')
    ) {
      this.setState({ displaySearchBar: false });
    }
  };

  searchKeyword = () => {
    const { searchQuery } = this.state;

    if (searchQuery) {
      this.setState({ searchQuery: 'Redirects to the search page' });
    }
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchKeyword();
    }
  };

  handleSearchBarChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**
   * @description Hero - Hero component for Landing Page view
   * @returns {JSX} - JSX component
   */
  render() {
    const { displaySearchBar, showResponsiveNav, searchQuery } = this.state;
    const {
      smoothScrollListener,
      showLoginModal,
      revealLoginModal,
      hideLoginModal,
      isLoggedIn,
      history,
      toggleSignUpModal
    } = this.props;

    return (
      <section className="hero" onClick={this.hideSearchField} role="presentation">
        {showLoginModal && (
          <AHLoginModal onClose={hideLoginModal} toggleSignUpModal={toggleSignUpModal} />
        )}
        <div className="hero__description">
          <div className="hero__header">
            <Router>
              <Link to="./" className="hero__logo">
                <img src={logo} alt="Authors Haven Logo" />
              </Link>
            </Router>
            <Hamburger open={showResponsiveNav} toggleMenu={this.toggleResponsiveNav}>
              <li>
                <span
                  id="login-link"
                  className="link_lookalike"
                  role="presentation"
                  onClick={revealLoginModal}
                >
                  Login
                </span>
              </li>
              <li>
                <span
                  id="signup-link"
                  className="link_lookalike"
                  role="presentation"
                  onClick={toggleSignUpModal}
                >
                  Register
                </span>
              </li>
              <li>
                <Router>
                  <Link to="./register">Explore</Link>
                </Router>
              </li>
            </Hamburger>
          </div>
          <div className="hero__text">
            <h2 className="hero__text--large">Authors Haven</h2>
            <p className="hero__text--normal">Building a community of like minded authors.</p>
          </div>
          <div className="hero__cta">
            <Button
              btnText="Explore Stories"
              customClass="btn btn-explore"
              btnType="button"
              onClick={() => history.push('./explore')}
            />

            <Button
              btnText="Start Writing"
              customClass="btn btn-write"
              btnType="button"
              onClick={isLoggedIn ? () => history.push('./create-article') : revealLoginModal}
            />
          </div>
        </div>
        <div className="hero__illustration">
          <nav className="hero__nav">
            {!displaySearchBar ? (
              <ul className="hero__nav--links">
                {!isLoggedIn && (
                  <Fragment>
                    <li>
                      <span
                        id="login-link"
                        className="link_lookalike"
                        role="presentation"
                        onClick={revealLoginModal}
                      >
                        Login
                      </span>
                    </li>
                    <li>
                      <span
                        id="signup-link"
                        className="link_lookalike"
                        role="presentation"
                        onClick={toggleSignUpModal}
                      >
                        Register
                      </span>
                    </li>
                  </Fragment>
                )}
                <NavDropdown parentLinkName="Explore">
                  <li>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => history.push('./explore/Food')}
                      onClick={() => history.push('./explore/Food')}
                    >
                      <span className="link_lookalike">Food</span>
                    </div>
                  </li>
                  <li>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => history.push('./explore/Technology')}
                      onClick={() => history.push('./explore/Technology')}
                    >
                      <span className="link_lookalike">Technology</span>
                    </div>
                  </li>
                  <li>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => history.push('./explore/Health')}
                      onClick={() => history.push('./explore/Technology')}
                    >
                      <span className="link_lookalike">Health</span>
                    </div>
                  </li>
                  <li>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => history.push('./explore/Finance')}
                      onClick={() => history.push('./explore/Finance')}
                    >
                      <span className="link_lookalike">Finance</span>
                    </div>
                  </li>
                  <li>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => history.push('./explore/Arts')}
                      onClick={() => history.push('./explore/Arts')}
                    >
                      <span className="link_lookalike">Arts</span>
                    </div>
                  </li>
                </NavDropdown>
                <li>
                  <span role="presentation" onClick={this.searchButtonOnclick} id="searchIcon">
                    <i className="fas fa-search hero__nav--search" id="searchIconChild" />
                  </span>
                </li>
              </ul>
            ) : (
              <span className="hero__nav--search_wrapper" role="presentation">
                <input
                  className="hero__nav--search_input"
                  placeholder="Type a keyword..."
                  type="text"
                  onChange={this.handleSearchBarChange}
                  onKeyPress={this.handleKeyPress}
                  name="searchQuery"
                  value={searchQuery}
                />
                <i
                  className="fas fa-search hero__nav--search"
                  id="search"
                  onClick={this.searchKeyword}
                  role="presentation"
                />
              </span>
            )}
            <img src={illustration} alt="Illustration of a reader" />
          </nav>
        </div>
        <button type="button" className="scroll" onClick={smoothScrollListener}>
          <i className="fas fa-angle-down" />
        </button>
      </section>
    );
  }
}

Hero.propTypes = {
  smoothScrollListener: func.isRequired,
  showLoginModal: bool.isRequired,
  revealLoginModal: func.isRequired,
  hideLoginModal: func.isRequired,
  isLoggedIn: bool.isRequired,
  toggleSignUpModal: func.isRequired,
  history: shape({
    action: string,
    block: func,
    createHref: func,
    go: func,
    goBack: func,
    goForward: func,
    length: number,
    listen: func,
    location: object,
    push: func,
    replace: func
  }).isRequired
};

export default Hero;

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
            <button
              className="btn btn-explore"
              type="button"
              onClick={() => history.push('./explore')}
            >
              Explore Stories
            </button>
            <button
              className="btn btn-write"
              type="button"
              onClick={() => history.push('./create-article')}
            >
              Start Writing
            </button>
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
                    <Router>
                      <Link to="./filter?tag=Food">Food</Link>
                    </Router>
                  </li>
                  <li>
                    <Router>
                      <Link to="./filter?tag=Technology">Technology</Link>
                    </Router>
                  </li>
                  <li>
                    <Router>
                      <Link to="./filter?tag=Health">Health</Link>
                    </Router>
                  </li>
                  <li>
                    <Router>
                      <Link to="./filter?tag=Finance">Finance</Link>
                    </Router>
                  </li>
                  <li>
                    <Router>
                      <Link to="./filter?tag=Arts">Arts</Link>
                    </Router>
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

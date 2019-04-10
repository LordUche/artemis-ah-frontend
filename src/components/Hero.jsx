import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { func, bool } from 'prop-types';
import logo from '../assets/img/logo.svg';
import illustration from '../assets/img/illustration.svg';
// import InputField from './InputField';
import NavDropdown from './NavDropdown';
import AHLoginModal from '../views/LoginModal';

/**
 * @description Hero - Hero component for Landing Page view
 * @param {object} e event object
 * @returns {JSX} - JSX component
 */
class Hero extends Component {
  state = {
    displaySearchBar: false,
    searchQuery: ''
  }

  searchButtonOnclick = () => {
    this.setState(state => ({
      ...state,
      displaySearchBar: true
    }));
  }

  hideSearchField = (e) => {
    if ((e.target.name !== 'searchQuery' && e.target.id !== 'search') && (e.target.id !== 'searchIconChild' && e.target.id !== 'searchIcon')) {
      this.setState({ displaySearchBar: false });
    }
  }

  searchKeyword = () => {
    const input = document.querySelector('input');
    const { searchQuery } = this.state;

    if (searchQuery) {
      input.value = 'Redirects to the search page';
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchKeyword();
    }
  }

  handleSearchBarChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description Hero - Hero component for Landing Page view
   * @returns {JSX} - JSX component
   */
  render() {
    const { displaySearchBar } = this.state;
    const {
      smoothScrollListener, showLoginModal, revealLoginModal, hideLoginModal
    } = this.props;

    return (
      <section className="hero" onClick={this.hideSearchField} role="presentation">
        {showLoginModal && <AHLoginModal onClose={hideLoginModal} />}
        <div className="hero__description">
          <div className="hero__header">
            <Router>
              <Link to="./" className="hero__logo">
                <img src={logo} alt="Authors Haven Logo" />
              </Link>
            </Router>
            <button type="button" className="hero__nav--mobile">
              <span className="hamburger"><i className="fas fa-bars" /></span>
            </button>
          </div>
          <div className="hero__text">
            <h2 className="hero__text--large">Authors Haven</h2>
            <p className="hero__text--normal">Building a community of like minded authors.</p>
          </div>
          <div className="hero__cta">
            <Router>
              <Link to="./explore" className="btn">
                Explore Stories
              </Link>
            </Router>
            <Router>
              <Link to="./create-story" className="btn">
                Start Writing
              </Link>
            </Router>
          </div>
        </div>
        <div className="hero__illustration">
          <nav className="hero__nav">
            { !displaySearchBar ? (
              <ul className="hero__nav--links">
                <li><span id="login-link" className="link_lookalike" role="presentation" onClick={revealLoginModal}>Login</span></li>
                <li><Router><Link to="./register">Register</Link></Router></li>
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
                <input className="hero__nav--search_input" placeholder="Type a keyword..." type="text" onChange={this.handleSearchBarChange} onKeyPress={this.handleKeyPress} name="searchQuery" />
                <i className="fas fa-search hero__nav--search" id="search" onClick={this.searchKeyword} role="presentation" />
              </span>
            )
            }
            <img src={illustration} alt="Illustration of a reader" />
          </nav>
        </div>
        <button type="button" className="scroll" onClick={smoothScrollListener}><i className="fas fa-angle-down" /></button>
      </section>
    );
  }
}

Hero.propTypes = {
  smoothScrollListener: func.isRequired,
  showLoginModal: bool.isRequired,
  revealLoginModal: func.isRequired,
  hideLoginModal: func.isRequired,
};

export default Hero;

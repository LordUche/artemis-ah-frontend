import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { func } from 'prop-types';
import logo from '../assets/img/logo.svg';
import illustration from '../assets/img/illustration.svg';
import NavDropdown from './NavDropdown';

/**
 * @param {object} smoothScrollListener - Callback when the down arrow is clicked
 * @description Hero - Hero component for Landing Page view
 * @returns {JSX} - JSX component
 */
const Hero = ({ smoothScrollListener }) => (
  <section className="hero">
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
        <ul className="hero__nav--links">
          <li><Router><Link to="./login">Login</Link></Router></li>
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
            <Router>
              <Link to="./search">
                <i className="fas fa-search" />
              </Link>
            </Router>
          </li>
        </ul>
        <img src={illustration} alt="Illustration of a reader" />
      </nav>
    </div>
    <button type="button" className="scroll" onClick={smoothScrollListener}><i className="fas fa-angle-down" /></button>
  </section>
);

Hero.propTypes = {
  smoothScrollListener: func.isRequired,
};

export default Hero;

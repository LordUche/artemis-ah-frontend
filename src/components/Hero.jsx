import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.svg';
import illustration from '../assets/img/illustration.svg';

/**
 * @param {object} smoothScrollListener - Callback when the down arrow is clicked
 * @description Hero - Hero component for Landing Page view
 * @returns {JSX} - JSX component
 */
const Hero = ({ smoothScrollListener }) => (
  <section className="hero">
    <div className="hero__description">
      <div className="hero__header">
        <Link to="./" className="hero__logo">
          <img src={logo} alt="Authors Haven Logo" />
        </Link>
        <button type="button" className="hero__nav--mobile">
          <span className="hamburger"><i className="fas fa-bars" /></span>
        </button>
      </div>
      <div className="hero__text">
        <h2 className="hero__text--large">Authors Haven</h2>
        <p className="hero__text--normal">Building a community of like minded authors.</p>
      </div>
      <div className="hero__cta">
        <Link to="./explore" className="btn">
          Explore Stories
        </Link>
        <Link to="./create-story" className="btn">
          Start Writing
        </Link>
      </div>
    </div>
    <div className="hero__illustration">
      <nav className="hero__nav">
        <ul className="hero__nav--links">
          <li><Link to="./login">Login</Link></li>
          <li><Link to="./register">Register</Link></li>
          <li>
            <Link to="./explore">
              Explore
              {' '}
              <i className="fas fa-angle-down" />
            </Link>
          </li>
          <li>
            <Link to="./search">
              <i className="fas fa-search" />
            </Link>
          </li>
        </ul>
      </nav>
      <img src={illustration} alt="Illustration of a reader" />
    </div>
    <button type="button" className="scroll" onClick={smoothScrollListener}><i className="fas fa-angle-down" /></button>
  </section>
);

Hero.propTypes = {
  smoothScrollListener: PropTypes.func.isRequired,
};

export default Hero;

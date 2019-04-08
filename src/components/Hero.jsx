import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.svg';
import illustration from '../assets/img/illustration.svg';
import InputField from './InputField';

/**
 * @description Hero - Hero component for Landing Page view
 * @returns {JSX} - JSX component
 */
class Hero extends Component {
  state = {
    displaySearchBar: false
  }

  /**
  * @description componentWillMount method
  * @returns {object} - state
  */
  componentWillMount() {
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
      if (e.target.name !== 'input' && e.target.id !== 'search') {
        this.setState({ displaySearchBar: false });
      }
    });
  }

  /**
  * @description componentWillMount method
  * @returns {object} - state
  */
  searchButtonOnclick = () => {
    this.setState(state => ({
      ...state,
      displaySearchBar: true
    }));
  }

  /**
  * @description searchKeyword method
  * @returns {JSX} - JSX component
  */
  searchKeyword = () => {
    const input = document.querySelector('input');
    const btn = document.querySelector('.fa-search');

    input.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        input.value = 'Redirects to the search page';
        return input.value;
      }
    });

    btn.addEventListener('click', (e) => {
      if (e.target.id === 'search') {
        input.value = 'Redirects to the search page';
        return input.value;
      }
    });
  }

  /**
   * @description Hero - Hero component for Landing Page view
   * @returns {JSX} - JSX component
   */
  render() {
    const { displaySearchBar } = this.state;
    return (
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
            { !displaySearchBar ? (
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
                  <span role="presentation" onClick={this.searchButtonOnclick}>
                    <i className="fas fa-search hero__nav--search" />
                  </span>
                </li>
              </ul>
            ) : (
              <div className="hero__nav--search_wrapper">
                <InputField customClass="hero__nav--search_input" placeHolder="Type a keyword..." onChange={this.searchKeyword} inputName="input" />
                <i className="fas fa-search hero__nav--search" id="search" />
              </div>
            )
            }
          </nav>
          <img src={illustration} alt="Illustration of a reader" />
        </div>
        <button type="button" className="scroll"><i className="fas fa-angle-down" /></button>
      </section>
    );
  }
}

export default Hero;

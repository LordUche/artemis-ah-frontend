/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeNameAction from '../redux/actions';
import Hero from '../components/Hero';
import AboutAH from '../components/AboutAH';
import FeaturedCategories from '../components/FeaturedCategories';
import Footer from '../components/Footer';

/**
 * @description landing page
 * @returns {HTMLDivElement} landing page
 */
class LandingPage extends Component {
  // eslint-disable-next-line react/prop-types
  login = () => this.props.changeName();

  /**
   * @description Fired when the down button is pressed on the homepage to scroll smoothly to 
   *              the "How it Works" section.
   */
  smoothScrollToAbout() {
    const heroSectionHeight = document.querySelector('.hero').clientHeight;

    try {
      window.scrollTo({
        left: 0,
        top: heroSectionHeight,
        behavior: 'smooth'
      });
    } catch (err) {
      window.scrollTo(0, heroSectionHeight);
    }
  }

  /**
   * @returns {HTMLElement} div
   */
  render() {
    return (
      <React.Fragment>
        <Hero smoothScrollListener={() => this.smoothScrollToAbout()} />
        <AboutAH />
        <FeaturedCategories />
        <Footer />
      </React.Fragment>
    );
  }
}

/**
 * @param {object} dispatch
 * @returns {Function} changeName
 */
function mapDispatchToProps(dispatch) {
  return {
    changeName: () => dispatch(changeNameAction())
  };
}

/**
 * @description mpa state to props
 * @param {*} param0
 * @returns {object} state
 */
function mapStateToProps({ name }) {
  return { name: name.name };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

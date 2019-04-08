/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hero from '../components/Hero';
import AboutAH from '../components/AboutAH';
import FeaturedCategories from '../components/FeaturedCategories';
import Footer from '../components/Footer';

/**
 * @description landing page
 * @returns {HTMLDivElement} landing page
 */
class LandingPage extends Component {
  /**
   * @description Fired when the down button is pressed on the homepage to scroll smoothly to
   *              the "How it Works" section.
   * @returns {undefined}
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

export default connect()(LandingPage);

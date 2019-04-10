import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hero from '../components/Hero';
import AboutAH from '../components/AboutAH';
import FeaturedCategories from '../components/FeaturedCategories';
import Footer from '../components/Footer';

/**
 * @description landing page
 * @param {object} e
 * @returns {HTMLDivElement} landing page
 */
class LandingPage extends Component {
  state = {
    showLoginModal: false
  }

  hideLoginModal = () => {
    this.setState({
      showLoginModal: false
    });
  }

  revealLoginModal = () => {
    this.setState({
      showLoginModal: true
    });
  }

  /**
   * @description Fired when the down button is pressed on the homepage to scroll smoothly to
   *  the "How it Works" section.
   * @returns {undefined}
   */
  smoothScrollToAbout = () => {
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
  };

  /**
   * @returns {HTMLElement} div
   */
  render() {
    const { revealLoginModal, hideLoginModal, state } = this;
    const { showLoginModal } = state;
    return (
      <React.Fragment>
        <Hero
          smoothScrollListener={() => this.smoothScrollToAbout()}
          showLoginModal={showLoginModal}
          revealLoginModal={revealLoginModal}
          hideLoginModal={hideLoginModal}
        />
        <AboutAH />
        <FeaturedCategories />
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect()(LandingPage);

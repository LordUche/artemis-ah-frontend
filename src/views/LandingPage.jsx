import React, { Component } from 'react';
import Hero from '../components/Hero';
import AboutAH from '../components/AboutAH';
import FeaturedCategories from '../components/FeaturedCategories';
import Footer from '../components/Footer';
import SignupModal from '../components/SignupModal';
import VerifyEmailModal from '../components/SignupVerification';
import LoginUserModal from './LoginModal';

/**
 * @description landing page
 * @param {object} e
 * @returns {HTMLDivElement} landing page
 */
export default class LandingPage extends Component {
  state = {
    showLoginModal: false,
    showSignup: false,
    showVerify: false
  }

  // hideLoginModal = () => {
  //   this.setState({
  //     showLoginModal: false
  //   });
  // }

  // revealLoginModal = () => {
  //   this.setState({
  //     showLoginModal: true
  //   });
  // }

  toggleLoginModal = () => {
    const { showLoginModal } = this.state;
    // console.log(showLoginModal);
    this.setState({ showLoginModal: !showLoginModal });
  }

  toggleModal = () => {
    const { showSignup } = this.state;
    this.setState({ showSignup: !showSignup });
  }

  toggleVerify = () => {
    const { showVerify } = this.state;
    this.setState({ showVerify: !showVerify });
  }

  /**
   * @description Fired when the down button is pressed on the homepage to scroll smoothly to
   *              the "How it Works" section.
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
    const { showLoginModal, showSignup, showVerify } = state;
    // const {  } = this.state;
    return (
      <React.Fragment>
        <Hero
          smoothScrollListener={() => this.smoothScrollToAbout()}
          showLoginModal={showLoginModal}
          revealLoginModal={revealLoginModal}
          hideLoginModal={hideLoginModal}
          toggleModal={this.toggleModal}
          toggleLoginModal={this.toggleLoginModal}
        />
        <SignupModal
          toggleVerify={this.toggleVerify}
          toggleModal={this.toggleModal}
          showSignup={showSignup}
        />
        <VerifyEmailModal
          toggleVerify={this.toggleVerify}
          showVerify={showVerify}
        />
        <LoginUserModal
          toggleLoginModal={this.toggleLoginModal}
          showLoginModal={showLoginModal}
        />
        <AboutAH />
        <FeaturedCategories />
        <Footer />
      </React.Fragment>
    );
  }
}

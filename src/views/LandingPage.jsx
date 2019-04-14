import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func } from 'prop-types';
import Hero from '../components/Hero';
import AboutAH from '../components/AboutAH';
import FeaturedCategories from '../components/FeaturedCategories';
import Footer from '../components/Footer';
import HelperUtils from '../utils/helperUtils';
import { socialLoginUserAction } from '../redux/actions/authActions';
import SignUpViewModal from './SignUpView';

/**
 * @description landing page
 * @param {object} e
 * @returns {HTMLDivElement} landing page
 */
export class LandingPage extends Component {
  state = {
    showLoginModal: false,
    showSignUpModal: false
  };

  hideLoginModal = () => {
    this.setState({
      showLoginModal: false
    });
  };

  revealLoginModal = () => {
    this.setState({
      showLoginModal: true,
      showSignUpModal: false
    });
  };

  toggleSignUpModal = () => {
    const { showSignUpModal } = this.state;
    this.setState({ showSignUpModal: !showSignUpModal, showLoginModal: false });
  }

  /**
   * @description component will mount
   * @param {object} data
   * @returns {undefined}
   */
  componentWillMount = (data) => {
    data = this.validateURLPayload();
    const { location } = window;
    const { loginUserViaSocialMedia } = this.props;
    if (data) {
      loginUserViaSocialMedia(data);
      location.assign(`${location.origin}/profile`);
    }
  };

  validateURLPayload = () => {
    const { location } = window;
    const params = new URLSearchParams(location.search);
    const paramsToken = params.get('userData');
    if (typeof paramsToken === 'string') {
      const payload = HelperUtils.verifyToken(paramsToken);
      return payload;
    }
    return false;
  };

  /**
   * @description Fired when the down button is pressed on the homepage to scroll smoothly to
   *  the "How it Works" section.
   * @returns {undefined}
   */
  smoothScrollToAbout = () => {
    const heroSectionHeight = window.innerHeight;

    window.scrollBy({
      left: 0,
      top: heroSectionHeight,
      behavior: 'smooth'
    });
  };

  /**
   * @returns {HTMLElement} div
   */
  render() {
    const {
      revealLoginModal, hideLoginModal, state, props, toggleSignUpModal
    } = this;
    const { showLoginModal, showSignUpModal } = state;
    const { isLoggedIn, signedUp, email } = props;
    return (
      <React.Fragment>
        <Hero
          smoothScrollListener={() => this.smoothScrollToAbout()}
          showLoginModal={showLoginModal}
          revealLoginModal={revealLoginModal}
          hideLoginModal={hideLoginModal}
          isLoggedIn={isLoggedIn}
          showSignUpModal={showLoginModal}
          toggleSignUpModal={toggleSignUpModal}
        />
        {showSignUpModal && (
        <SignUpViewModal
          revealLoginModal={revealLoginModal}
          showSignUpModal={showSignUpModal}
          toggleSignUpModal={toggleSignUpModal}
          signedUp={signedUp}
          email={email}
        />
        )}
        <AboutAH />
        <FeaturedCategories />
        <Footer />
      </React.Fragment>
    );
  }
}

/**
 * @description function to map dispatch to component as props
 * @param {object} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginUserViaSocialMedia: socialLoginUserAction
  },
  dispatch
);

/**
 * @description function to map store to component as props
 * @param {object} store The redux store
 * @returns {object} props
 */
export const mapStateToProps = ({ auth, user }) => {
  const { isLoggedIn, signedUp } = auth;
  const { email } = user;
  return {
    email,
    isLoggedIn,
    signedUp,
    user
  };
};

LandingPage.propTypes = {
  loginUserViaSocialMedia: func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);

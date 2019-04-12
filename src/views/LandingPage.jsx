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

/**
 * @description landing page
 * @param {object} e
 * @returns {HTMLDivElement} landing page
 */
export class LandingPage extends Component {
  state = {
    showLoginModal: false
  };

  hideLoginModal = () => {
    this.setState({
      showLoginModal: false
    });
  };

  revealLoginModal = () => {
    this.setState({
      showLoginModal: true
    });
  };

  /**
   * @description component will mount
   * @returns {undefined}
   */
  componentWillMount = () => {
    const data = this.validateURLPayload();
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
      revealLoginModal, hideLoginModal, state, props, componentWillMount
    } = this;
    const { showLoginModal } = state;
    const { isLoggedIn } = props;
    componentWillMount();
    return (
      <React.Fragment>
        <Hero
          smoothScrollListener={() => this.smoothScrollToAbout()}
          showLoginModal={showLoginModal}
          revealLoginModal={revealLoginModal}
          hideLoginModal={hideLoginModal}
          isLoggedIn={isLoggedIn}
        />
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
export const mapStateToProps = ({ auth }) => {
  const { isLoggedIn } = auth;
  return {
    isLoggedIn
  };
};

LandingPage.propTypes = {
  loginUserViaSocialMedia: func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);

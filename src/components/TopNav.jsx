import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { bool, string } from 'prop-types';
import { connect } from 'react-redux';
import { createArticleIcon, notificationIcon } from '../assets/img__func/icons_svg';
import Logo from './logo';

// Components
import UserNavAvatar from './userNavAvartar';
import Hamburger from './Hamburger';
import AHLoginModal from '../views/LoginModal';
import AHSignUpModal from '../views/SignUpView';

/**
 * @description top nav
 * @returns {JSX} top nav
 */
class TopNav extends Component {
  state = {
    display: '',
    menuClassStyleName: 'link-wrapper',
    showResponsiveNav: false,
    showLoginModal: false,
    showSignUpModal: false
  };

  toggleResponsiveNav = () => {
    const { showResponsiveNav } = this.state;
    this.setState({
      showResponsiveNav: !showResponsiveNav
    });
  };

  toggleLoginModal = () => {
    const { showLoginModal } = this.state;
    this.setState({
      showLoginModal: !showLoginModal,
      showSignUpModal: false
    });
  };

  toggleSignUpModal = () => {
    const { showSignUpModal } = this.state;
    this.setState({
      showSignUpModal: !showSignUpModal,
      showLoginModal: false
    });
  };

  /**
   * @description returns nav children
   * @returns {JSX} JSX
   */
  renderNavChildren = () => {
    const {
      display, menuClassStyleName, showResponsiveNav, showLoginModal, showSignUpModal
    } = this.state;
    const { isLoggedIn, username, image } = this.props;
    if (isLoggedIn) {
      return (
        <Fragment>
          <div className="nav-component-container-online1">
            <Logo containerCustomClass="logoContainerClass" logoCustomClass="logoCustomClass" />
            <li>
              <NavLink to="/create-article">{createArticleIcon(30, 30)}</NavLink>
            </li>
          </div>

          <ul className="nav-component-container-online2">
            <li>
              <NavLink to="/explore">Explore &nbsp;</NavLink>
            </li>
            <li>
              <NavLink to="/notifications">
                {display === 'desktop' ? notificationIcon(20, 20) : notificationIcon(30, 30)}
              </NavLink>
            </li>
            <li>
              <UserNavAvatar
                username={username}
                imgSrc={image}
                customImageClassName="ah-profile-images"
                customLinkClassName="ah-profile-link"
              />
            </li>
          </ul>
        </Fragment>
      );
    }
    return (
      <Fragment>
        {showLoginModal && (
          <AHLoginModal
            onClose={this.toggleLoginModal}
            toggleSignUpModal={this.toggleSignUpModal}
          />
        )}
        {showSignUpModal && (
          <AHSignUpModal
            toggleSignUpModal={this.toggleSignUpModal}
            revealLoginModal={this.toggleLoginModal}
          />
        )}
        <div className="nav-component-container-offline1">
          <Logo containerCustomClass="logoContainerClass" logoCustomClass="logoCustomClass" />
        </div>
        <ul className="nav-component-container-offline2">
          <span className={menuClassStyleName}>
            <li className="nav-component-container-offline2_link">
              <span id="top-nav-login" className="link_lookalike" onClick={this.toggleLoginModal} role="presentation">
                Login
              </span>
            </li>
            <li className="nav-component-container-offline2_link">
              <span id="top-nav-signup" className="link_lookalike" onClick={this.toggleSignUpModal} role="presentation">
               Register
              </span>
            </li>
            <li className="nav-component-container-offline2_link">
              <NavLink to="/explore">
                Explore &nbsp;
                <i className="fas fa-angle-down" id="hide-angle-down" />
              </NavLink>
            </li>
            <li className="nav-component-container-offline2_link">
              <NavLink to="/search" id="#search">
                <span className="ah-search">Search</span>
                {' '}
                <i className="fas fa-search" />
              </NavLink>
            </li>
          </span>
          <Hamburger open={showResponsiveNav} toggleMenu={this.toggleResponsiveNav}>
            <li className="nav-component-container-offline2_link">
              <span className="link_lookalike" onClick={this.toggleLoginModal} role="presentation">
                Login
              </span>
            </li>
            <li className="nav-component-container-offline2_link">
              <span className="link_lookalike" onClick={this.toggleSignUpModal} role="presentation">
               Register
              </span>
            </li>
            <li className="nav-component-container-offline2_link">
              <NavLink to="/explore">
                Explore
                <i className="fas fa-angle-down" id="hide-angle-down" />
              </NavLink>
            </li>
          </Hamburger>
        </ul>
      </Fragment>
    );
  };

  /**
   * @description top nav
   * @returns {JSX} top nav
   */
  render() {
    return (
      <header className="ah-header">
        <nav className="top-nav">{this.renderNavChildren()}</nav>
      </header>
    );
  }
}

TopNav.propTypes = {
  username: string,
  isLoggedIn: bool,
  image: string
};

TopNav.defaultProps = {
  image: 'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png',
  username: 'Default',
  isLoggedIn: false
};

/**
 *
 * @param {object} store redux store
 * @returns {object} TopNav props
 */
export const mapStateToProps = ({ auth, user }) => {
  const { isLoggedIn } = auth;
  const { image, username } = user;
  return {
    isLoggedIn,
    image,
    username
  };
};

export default connect(mapStateToProps)(TopNav);

export { TopNav };

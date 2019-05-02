import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  bool, string, number, array as arrayProp, func
} from 'prop-types';
import { connect } from 'react-redux';
import dotenv from 'dotenv';
import Pusher from 'pusher-js';
import HelperUtils from '../utils/helperUtils';
import { createArticleIcon, notificationIcon } from '../assets/img__func/icons_svg';
import NotificationComp from './Notifications';
import { getNotificationAction, notifyPopup } from '../redux/actions/notificationAction';
import Logo from './logo';

// Components
import UserNavAvatar from './userNavAvartar';
import Hamburger from './Hamburger';
import AHLoginModal from '../views/LoginModal';
import AHSignUpModal from '../views/SignUpView';

dotenv.config();

/**
 * @description top nav
 * @param {string} urlPath - slug path for an aticle
 * @returns {JSX} top nav
 */
class TopNav extends Component {
  state = {
    display: '',
    menuClassStyleName: 'link-wrapper',
    showResponsiveNav: false,
    showLoginModal: false,
    showSignUpModal: false,
    showNotification: false
  };

  componentDidMount = () => {
    const { token, dispatch } = this.props;
    setTimeout(() => {
      getNotificationAction(token, dispatch);
    }, 1000);
  };

  componentWillMount = () => {
    const { dispatch, token } = this.props;

    // Instantiate Pusher
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: 'eu',
      forceTLS: true
    });

    // Get users id from token
    const userObject = HelperUtils.verifyToken(token);
    const { id } = userObject;

    // Subscribe to an event
    const channel = pusher.subscribe(`channel-${id}`);
    channel.bind('notification', (info) => {
      const { data } = info;
      const { title, message } = data;

      if (window.Notification.permission !== 'granted') {
        window.Notification.requestPermission().then((permission) => {
          notifyPopup(`Notification set to ${permission}`);
        });
      }
      notifyPopup(title, message);
      getNotificationAction(token, dispatch);
    });
  };

  toggleResponsiveNav = () => {
    const { showResponsiveNav } = this.state;
    this.setState({
      showResponsiveNav: !showResponsiveNav
    });
  };

  handleNotificationClick = () => {
    const { showNotification } = this.state;
    if (showNotification) {
      this.setState({ showNotification: false });
    } else {
      this.setState({ showNotification: true });
    }
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
      display,
      menuClassStyleName,
      showResponsiveNav,
      showLoginModal,
      showSignUpModal,
      showNotification
    } = this.state;
    const {
      isLoggedIn,
      username,
      image,
      hasNewNotifications,
      notificationNumber,
      notificationsData
    } = this.props;
    if (isLoggedIn) {
      return (
        <Fragment>
          <div className="nav-component-container-online1">
            <Logo containerCustomClass="logoContainerClass" logoCustomClass="logoCustomClass" />
            <li>
              <Link to="/create-article">{createArticleIcon(30, 30)}</Link>
            </li>
          </div>

          <ul className="nav-component-container-online2">
            <li>
              <Link to="/explore">Explore &nbsp;</Link>
            </li>
            <li>
              <NavLink
                to="#"
                onClick={this.handleNotificationClick}
                className="notificationBellLink"
              >
                {display === 'desktop' ? notificationIcon(20, 20) : notificationIcon(30, 30)}
                {hasNewNotifications && (
                  <div className="notificationBeep">{notificationNumber}</div>
                )}
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
          {showNotification
            && (notificationsData.length > 0 ? (
              <div
                className="notifications-div-wrapper"
                id="notifications-wrapper"
                role="presentation"
                onClick={this.handleNotificationClick}
              >
                <div id="notify-div-wrapper">
                  <i className="fas fa-caret-up" id="notification-triangle" />
                  <div className="notifications-div" id="notifications-div">
                    {notificationsData.map((notify, index) => {
                      const key = index;
                      return (
                        <NotificationComp
                          key={key}
                          message={notify.message}
                          title={notify.title}
                          time={notify.updatedAt}
                          url={notify.url}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="notifications-div-wrapper"
                id="notifications-wrapper"
                onClick={this.handleNotificationClick}
                role="presentation"
              >
                <div id="notify-div-wrapper">
                  <i className="fas fa-caret-up" id="notification-triangle" />
                  <div className="notifications-div" id="notifications-div">
                    <span className="notifications-div-item" style={{ cursor: 'auto' }}>
                      <p className="notifications-div-item-info">
                        <span className="notifications-div-item-info-name">
                          You are all caught up :)
                        </span>
                        <br />
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
              <span
                id="top-nav-login"
                className="link_lookalike"
                onClick={this.toggleLoginModal}
                role="presentation"
              >
                Login
              </span>
            </li>
            <li className="nav-component-container-offline2_link">
              <span
                id="top-nav-signup"
                className="link_lookalike"
                onClick={this.toggleSignUpModal}
                role="presentation"
              >
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
    const { navID } = this.props;
    return (
      <header className="ah-header">
        <nav className="top-nav" id={`${navID}`}>
          {this.renderNavChildren()}
        </nav>
      </header>
    );
  }
}

TopNav.propTypes = {
  username: string,
  isLoggedIn: bool,
  image: string,
  navID: string,
  hasNewNotifications: bool.isRequired,
  notificationNumber: number.isRequired,
  notificationsData: arrayProp.isRequired,
  dispatch: func.isRequired,
  token: string.isRequired
};

TopNav.defaultProps = {
  image: 'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png',
  username: 'Default',
  isLoggedIn: false,
  navID: ''
};

/**
 *
 * @param {object} store redux store
 * @returns {object} TopNav props
 */
export const mapStateToProps = ({ auth, user, notifications }) => {
  const { isLoggedIn, token } = auth;
  const { image, username } = user;
  const { hasNewNotifications, notificationNumber, notificationsData } = notifications;
  return {
    isLoggedIn,
    image,
    username,
    hasNewNotifications,
    notificationNumber,
    notificationsData,
    token
  };
};

export default connect(mapStateToProps)(TopNav);

export { TopNav };

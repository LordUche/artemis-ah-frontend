import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { createArticleIcon, notificationIcon } from '../assets/img__func/icons_svg';
import Logo from './logo';
import UserNavAvatar from './userNavAvartar';
import Hamburger from './Hamburger';

/**
 * @description top nav
 * @returns {JSX} top nav
 */
class TopNav extends Component {
  state = {
    display: '',
    auth: false,
    menuClassStyleName: 'link-wrapper',
    showResponsiveNav: false
  };

  toggleResponsiveNav = () => {
    const { showResponsiveNav } = this.state;
    this.setState({
      showResponsiveNav: !showResponsiveNav
    });
  }

  /**
   * @description returns nav children
   * @returns {JSX} JSX
   */
  renderNavChildren = () => {
    const {
      display,
      auth,
      menuClassStyleName,
      showResponsiveNav
    } = this.state;
    if (auth) {
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
              <NavLink to="/explore">
                Explore &nbsp;
                <i className="fas fa-angle-down" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications">
                {display === 'desktop' ? notificationIcon(20, 20) : notificationIcon(30, 30)}
              </NavLink>
            </li>
            <li>
              <UserNavAvatar
                username="Shaolinmkz"
                imgSrc="https://res.cloudinary.com/artemisah/image/upload/v1554335316/authorshaven/ARSENAL_ME.jpg"
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
        <div className="nav-component-container-offline1">
          <Logo containerCustomClass="logoContainerClass" logoCustomClass="logoCustomClass" />
        </div>
        <ul className="nav-component-container-offline2">
          <span className={menuClassStyleName}>
            <li className="nav-component-container-offline2_link">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav-component-container-offline2_link">
              <NavLink to="/register">Register</NavLink>
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
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav-component-container-offline2_link">
              <NavLink to="/register">Register</NavLink>
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

export default TopNav;

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { createArticleIcon, notificationIcon } from '../assets/img__func/icons_svg';
import Logo from './logo';
import UserNavAvatar from './userNavAvartar';
// import Hamburger from './Hamburger';

/**
 * @description top nav
 * @returns {JSX} top nav
 */
class TopNav extends Component {
  /**
   * @description top nav contructor
   * @param {object} props
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      mobile: 768,
      display: '',
      auth: false,
      hamburgerStateClose: 'inline-block',
      hamburgerStateOpen: 'none',
      reset: false,
      menuClassStyleName: 'link-wrapper'
    };
    this.renderNavChildren = this.renderNavChildren.bind(this);
    this.renderHamburgerMenu = this.renderHamburgerMenu.bind(this);
  }

  /**
   * @description top nav life cycle method
   * @returns {undefined}
   */
  componentWillMount() {
    document.body.onresize = () => {
      const { mobile } = this.state;
      if (window.innerWidth <= mobile) {
        this.setState({
          display: 'mobile'
        });
      } else {
        this.setState({ display: 'desktop' });
      }
    };
  }

  /**
   * @description Hamburger life cycle method
   * @returns {undefined}
   */
  componentDidMount() {
    const { mobile, reset } = this.state;
    document.body.onresize = () => {
      if (window.innerWidth > mobile && reset === false) {
        return this.setState({
          hamburgerStateClose: 'none',
          hamburgerStateOpen: 'none',
          menuClassStyleName: 'link-wrapper',
          reset: true
        });
      }
      this.setState({ hamburgerStateClose: 'inline-block', hamburgerStateOpen: 'none', menuClassStyleName: 'link-wrapper' });
    };

    document.body.onload = () => {
      if (window.innerWidth <= mobile) {
        this.setState({ hamburgerStateClose: 'inline-block' });
      }
      if (window.innerWidth > mobile) {
        this.setState({ hamburgerStateClose: 'none' });
      }
    };
    if (window.innerWidth > mobile) {
      this.setState({ hamburgerStateClose: 'none' });
    }
  }

  /**
   * @description render hamburger menu method
   * @returns {undefined}
   */
  renderHamburgerMenu() {
    const { hamburgerStateOpen, hamburgerStateClose } = this.state;
    return (
      <React.Fragment>
        <i
          className="fas fa-bars"
          id="hamburger"
          style={{ display: hamburgerStateClose }}
          role="presentation"
          onClick={() => {
            this.setState({
              hamburgerStateOpen: 'inline-block',
              hamburgerStateClose: 'none',
              menuClassStyleName: 'showHamburgerMenu'
            });
          }}
        />
        <span
          id="hamburger-ex"
          style={{ display: hamburgerStateOpen }}
          role="presentation"
          onClick={() => {
            this.setState({
              hamburgerStateOpen: 'none',
              hamburgerStateClose: 'inline-block',
              menuClassStyleName: 'link-wrapper'
            });
          }}
        >
          &times;
        </span>
      </React.Fragment>
    );
  }

  /**
   * @description returns nav children
   * @returns {JSX} JSX
   */
  renderNavChildren() {
    const { display, auth, menuClassStyleName } = this.state;
    if (auth) {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="nav-component-container-offline1">
          <Logo containerCustomClass="logoContainerClass" logoCustomClass="logoCustomClass" />
        </div>
        <ul className="nav-component-container-offline2">
          <span className={menuClassStyleName}>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/explore">
                Explore &nbsp;
                <i className="fas fa-angle-down" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" id="#search">
                <span className="ah-search">Search</span>
                {' '}
                <i className="fas fa-search" />
              </NavLink>
            </li>
          </span>
          {this.renderHamburgerMenu()}
        </ul>
      </React.Fragment>
    );
  }

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

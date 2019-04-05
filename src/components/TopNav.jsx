import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { createArticleIcon, notificationIcon } from '../assets/img__func/icons_svg';
import Logo from './logo';
import UserNavAvatar from './userNavAvartar';

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
      display: ''
    };
  }

  /**
   * @description top nav life cycle method
   * @returns {undefined}
   */
  componentWillMount() {
    document.body.onresize = () => {
      const { mobile } = this.state;
      if (window.innerWidth <= mobile) {
        this.setState({ display: 'mobile' });
      } else {
        this.setState({ display: 'desktop' });
      }
    };
  }

  /**
   * @description top nav
   * @returns {JSX} top nav
   */
  render() {
    const { display } = this.state;
    return (
      <header className="ah-header">
        <nav className="top-nav">
          <div className="nav-component-container1">
            <Logo
              logoContainerStyle={{
                padding: '25px 71px'
              }}
              logoStyle={{
                width: '50px'
              }}
            />
            <li>
              <NavLink to="/create-article">{createArticleIcon(40, 40)}</NavLink>
            </li>
          </div>

          <ul className="nav-component-container2">
            <li>
              <NavLink to="/explore">
                Explore &nbsp;
                <i className="fas fa-angle-down" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications">
                {display === 'desktop' ? notificationIcon(20, 20) : notificationIcon(40, 40)}
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
        </nav>
      </header>
    );
  }
}

export default TopNav;

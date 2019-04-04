import React from 'react';
import { NavLink } from 'react-router-dom';
import { createArticleIcon, notificationIcon } from '../assets/images/icons_svg';
import Logo from './logo';
import UserNavAvatar from './userNavAvartar';

/**
 * @description top nav
 * @returns {JSX} top nav
 */
const TopNav = () => (
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
          <NavLink to="/create-article">{createArticleIcon(40, 40, 'ah-nav-article')}</NavLink>
        </li>
      </div>

      <ul className="nav-component-container2">
        <li>
          <NavLink to="#">
            Explore &nbsp;
            <i className="fas fa-angle-down" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications">{notificationIcon(20, 20)}</NavLink>
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

export default TopNav;

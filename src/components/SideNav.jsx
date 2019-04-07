import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  settingsIcon,
  historyIcon,
  readingStatsIcon,
  bookmarkIcon
} from '../assets/img__func/icons_svg';

/**
 * @description side nav class component
 * @returns {undefined}
 */
const SideNav = () => (
  <aside className="side-nav-parent">
    <nav className="side-nav">
      <ul className="side-nav__first-child">
        <li id="bookmarkLink" className="side-nav__first-child__children">
          <NavLink to="/bookmarks">
            {bookmarkIcon(40, 40)}
            {' '}
            <div>
              Bookmarked
              {' '}
              <br />
              Article
            </div>
          </NavLink>
        </li>
        <li id="reading-stats-Link" className="side-nav__first-child__children">
          <NavLink to="/reading-stats">
            {readingStatsIcon(40, 40)}
            {' '}
            <div>
              Reading
              {' '}
              <br />
              Stats
            </div>
          </NavLink>
        </li>
        <li id="historyLink" className="side-nav__first-child__children">
          <NavLink to="/history">
            {historyIcon(40, 40)}
            {' '}
            <div>History</div>
          </NavLink>
        </li>
        <li id="settingsLink" className="side-nav__first-child__children">
          <NavLink to="/settings">
            {settingsIcon(40, 40)}
            {' '}
            <div>Settings</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
);

export default SideNav;

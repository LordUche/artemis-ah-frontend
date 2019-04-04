import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  settingsIcon,
  historyIcon,
  readingStatsIcon,
  bookmarkIcon
} from '../assets/images/icons_svg';

/**
 * @description side nav class component
 * @returns {undefined}
 */
class SideNav extends Component {
  /**
   * @description side nav class constructor
   * @param {object} props
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      hoverBookmark: false,
      hoverHistory: false,
      hoverReadingStats: false,
      hoverSettings: false
    };
    this.handleBookmarkHover = this.handleBookmarkHover.bind(this);
    this.handleReadingStatsHover = this.handleReadingStatsHover.bind(this);
    this.handleHistoryHover = this.handleHistoryHover.bind(this);
    this.handleSettingHover = this.handleSettingHover.bind(this);
  }

  /**
   * @description bookmark hover
   * @returns {JSX} JSX
   */
  handleBookmarkHover() {
    const { hoverBookmark } = this.state;
    if (hoverBookmark) {
      return bookmarkIcon(40, 40, 'white');
    }
    return bookmarkIcon(40, 40);
  }

  /**
   * @description reading stats hover
   * @returns {JSX} JSX
   */
  handleReadingStatsHover() {
    const { hoverReadingStats } = this.state;
    if (hoverReadingStats) {
      return readingStatsIcon(40, 40, 'white');
    }
    return readingStatsIcon(40, 40);
  }

  /**
   * @description history hover
   * @returns {JSX} JSX
   */
  handleHistoryHover() {
    const { hoverHistory } = this.state;
    if (hoverHistory) {
      return historyIcon(40, 40, 'white');
    }
    return historyIcon(40, 40);
  }

  /**
   * @description setting hover
   * @returns {JSX} JSX
   */
  handleSettingHover() {
    const { hoverSettings } = this.state;
    if (hoverSettings) {
      return settingsIcon(40, 40, 'white');
    }
    return settingsIcon(40, 40);
  }

  /**
   * @description side nav render life cycle method
   * @returns {JSX} JSX
   */
  render() {
    return (
      <aside className="side-nav-parent">
        <nav className="side-nav">
          <ul className="side-nav__first-child">
            <li
              className="side-nav__first-child__children"
              onMouseEnter={() => this.setState({ hoverBookmark: true })}
              onMouseLeave={() => this.setState({ hoverBookmark: false })}
            >
              <NavLink to="/bookmarks">
                {this.handleBookmarkHover()}
                {' '}
                <div>
                  Bookmarked
                  {' '}
                  <br />
                  Article
                </div>
              </NavLink>
            </li>
            <li
              className="side-nav__first-child__children"
              onMouseEnter={() => this.setState({ hoverReadingStats: true })}
              onMouseLeave={() => this.setState({ hoverReadingStats: false })}
            >
              <NavLink to="/reading-stats">
                {this.handleReadingStatsHover()}
                {' '}
                <div>
                  Reading
                  {' '}
                  <br />
                  Stats
                </div>
              </NavLink>
            </li>
            <li
              className="side-nav__first-child__children"
              onMouseEnter={() => this.setState({ hoverHistory: true })}
              onMouseLeave={() => this.setState({ hoverHistory: false })}
            >
              <NavLink to="/history">
                {this.handleHistoryHover()}
                {' '}
                <div>History</div>
              </NavLink>
            </li>
            <li
              className="side-nav__first-child__children"
              onMouseEnter={() => this.setState({ hoverSettings: true })}
              onMouseLeave={() => this.setState({ hoverSettings: false })}
            >
              <NavLink to="/settings">
                {this.handleSettingHover()}
                {' '}
                <div>Settings</div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default SideNav;

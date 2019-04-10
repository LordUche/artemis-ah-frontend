/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { object as objectProp, func as funcProp } from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchUserDetails,
  fetchUserArticles,
  fetchUserFollowers,
  fetchUserFollowing
} from '../redux/actions/profileActions';
import ArticleItem from '../components/ArticleItem';
import UserListItem from '../components/UserListItem';
import Button from '../components/Button';
import UserDetailsSkeletonScreen from '../skeletonscreens/ProfilePageUserDetails';
import ArticleItemSkeletonScreen from '../skeletonscreens/ArticleItem';
import UserItemSkeletonScreen from '../skeletonscreens/UserItem';
import '../assets/scss/ProfilePage.scss';

const TAB_ARTICLES = 'tab.articles';
const TAB_FOLLOWING = 'tab.following';
const TAB_FOLLOWERS = 'tab.followers';

const CONTENT_STATE_FETCHED = 'content-state.fetched';
const CONTENT_STATE_FETCHING = 'content-state.fetching';
const CONTENT_STATE_FETCHING_FAILED = 'content-state.failed';

/**
 * @class ProfilePage
 * @description Component for profile page
 */
class ProfilePage extends Component {
  /**
   * @param {object} props Props
   */
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      activeTab: TAB_ARTICLES,
    };
  }

  /**
   * @returns {undefined}
   */
  componentWillMount() {
    const { match, user, dispatch } = this.props;

    const viewingUsername = (match.params.username || user.username);
    fetchUserDetails(viewingUsername, user.authToken, dispatch);
  }

  /**
   * @description Called when a tab Menu is clicked.
   * @param {string} tab - The tab that was clicked.
   * @param {object} event - The event object.
   * @returns {undefined}
   */
  onTabClick(tab, event) {
    this.setState({
      activeTab: tab,
    });

    event.preventDefault();
  }

  /**
   * @returns {Node} The view for the users details.
   */
  getUserDetailsView() {
    const { profile } = this.props;

    const { user } = profile;

    const { editMode } = this.state;

    if (user.contentState === CONTENT_STATE_FETCHING) {
      return <UserDetailsSkeletonScreen />;
    }

    if (user.contentState === CONTENT_STATE_FETCHED) {
      const aboutProps = {
        className: 'profile-section__blue-bg__data__about',
      };
      if (editMode) {
        aboutProps.className += ` ${aboutProps.className}--edit`;
        aboutProps.contentEditable = true;
      }

      return (
        <div className="profile-section__blue-bg__user-wrapper">
          <div className="profile-section__blue-bg__picture-section">
            <img src={user.profilePic} alt={user.fullname} />
            {editMode && (
              <div className="profile-section__blue-bg__picture-section__edit-wrapper">
                <div className="profile-section__blue-bg__picture-section__edit-wrapper__edit">
                  <button type="button"><i className="fa fa-camera" /></button>
                </div>
              </div>
            )}
          </div>
          <div className="profile-section__blue-bg__data">
            <div className="profile-section__blue-bg__data__fullname">{user.fullname}</div>
            <div className="profile-section__blue-bg__data__username">{user.username}</div>
            <div {...aboutProps}>{user.about}</div>
            <div className="profile-section__blue-bg__data__btn-wrapper">
              {!editMode ? (
                <Button onClick={() => this.startEditProfile()} btnText="Edit Profile" />
              ) : (
                <Button onClick={() => this.saveUpdate()} btnText="Save Changes" />
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  /**
   * @param {string} label The label of the tab.
   * @param {number} number The number to display on the tab.
   * @param {string} icon Font awesome icon classname.
   * @returns {Node} The tab view.
   */
  getTabMenuView() {
    const { activeTab } = this.state;

    const { profile } = this.props;
    const { tabContent } = profile;

    return (
      <div className="profile-section__body__tab-container">
        {Object.keys(tabContent).map((tab, index) => {
          const tabData = tabContent[tab];
          let className = 'profile-section__body__tab-container__tab';
          if (tab === activeTab) {
            className += ` ${className}--active`;
          }

          return (
            <a
              href="#"
              key={index.toString()}
              onClick={event => this.onTabClick(tab, event)}
              className={className}
            >
              <span className="profile-section__body__tab-container__tab__inner">
                <span className="profile-section__body__tab-container__tab__inner__icon"><i className={`fa ${tabData.icon} fa-2x`} /></span>
                <span className="profile-section__body__tab-container__tab__inner__body">
                  <span className="profile-section__body__tab-container__tab__inner__body__num">{tabData.count}</span>
                  <br />
                  <span className="profile-section__body__tab-container__tab__inner__body__label">{tabData.menuLabel}</span>
                </span>
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  /**
   * @description Returns the current selected tab (articles, followers or following) content.
   * @returns {Node} Returns the current selected tab (articles, followers or following) content.
   */
  getProfileBody() {
    const { activeTab } = this.state;

    switch (activeTab) {
      case TAB_ARTICLES:
        return this.getArticles();
      case TAB_FOLLOWERS:
        return this.getFollowers();
      case TAB_FOLLOWING:
        return this.getFollowing();
      default:
        return null;
    }
  }

  /**
   * @returns {Node} The view for articles the user has publishes.
   */
  getArticles() {
    const { profile, dispatch } = this.props;
    const { tabContent } = profile;

    const { articles, contentState } = tabContent[TAB_ARTICLES];

    fetchUserArticles(profile.user.username, dispatch);

    let content = '';

    if (contentState === CONTENT_STATE_FETCHING) {
      content = <ArticleItemSkeletonScreen />;
    } else if (contentState === CONTENT_STATE_FETCHING_FAILED) {
      content = 'An error occurred. Please refresh';
    } else if (contentState === CONTENT_STATE_FETCHED) {
      content = articles.map((article, index) => (
        <ArticleItem
          key={index.toString()}
          tag={(article.Tag || 'no tag')}
          title={article.title}
          description={article.description}
          slug={article.slug}
          coverUrl={(article.coverUrl || '')}
          rating={article.rating}
          readTime={article.readTime.text}
          author={article.User.username}
        />
      ));
    }

    return this.bodyTemplate(
      'Your Articles',
      <div className="article-list">{content}</div>
    );
  }

  /**
   * @returns {Node} The view for people following the user.
   */
  getFollowers() {
    const { profile, dispatch } = this.props;
    const { tabContent } = profile;

    const { followers, contentState } = tabContent[TAB_FOLLOWERS];

    fetchUserFollowers(profile.user.username, dispatch);

    let content = '';

    if (contentState === CONTENT_STATE_FETCHING) {
      content = <UserItemSkeletonScreen />;
    } else if (contentState === CONTENT_STATE_FETCHING_FAILED) {
      content = 'An error occurred. Please refresh';
    } else if (contentState === CONTENT_STATE_FETCHED) {
      content = followers.map((user, index) => (
        <UserListItem
          key={index.toString()}
          fullname={user.fullname}
          username={user.username}
          pictureUrl={user.profilePic}
          about={user.about}
        />
      ));
    }

    return this.bodyTemplate(
      'Your followers',
      <div className="user-list">{content}</div>,
    );
  }

  /**
   * @returns {Node} The view for people the user is following
   */
  getFollowing() {
    const { profile, dispatch } = this.props;
    const { tabContent } = profile;

    const { following, contentState } = tabContent[TAB_FOLLOWING];

    fetchUserFollowing(profile.user.username, dispatch);

    let content = '';

    if (contentState === CONTENT_STATE_FETCHING) {
      content = <UserItemSkeletonScreen />;
    } else if (contentState === CONTENT_STATE_FETCHING_FAILED) {
      content = 'An error occurred. Try again later.';
    } else if (contentState === CONTENT_STATE_FETCHED) {
      content = following.map((user, index) => (
        <UserListItem
          key={index.toString()}
          fullname={user.fullname}
          username={user.username}
          pictureUrl={user.profilePic}
          about={user.about}
        />
      ));
    }

    return this.bodyTemplate(
      'People you follow',
      <div className="user-list">{content}</div>,
    );
  }

  /**
   * @param {string} title Title of current tab content
   * @param {Node} body The body of the tab content.
   * @returns {Node} template
   */
  bodyTemplate = (title, body) => (
    <div className="profile-section__body__content">
      <div className="profile-section__body__content__title">{title}</div>
      {body}
    </div>
  );

  /**
   * @method startEditProfile
   * @description Called when the "Edit Profile" button is clicked
   * @returns {undefined}
   */
  startEditProfile() {
    this.setState({
      editMode: true
    });
  }

  /**
   * @method saveUpdate
   * @description Called when the "Save Changes" button is clicked
   * @returns {undefined}
   */
  saveUpdate() {
    this.setState({
      editMode: false,
    });
  }

  /**
   * @method render
   * @returns {HTMLElement} Returns the profile page
   */
  render() {
    const { profile } = this.props;

    const { user } = profile;

    return user.contentState === CONTENT_STATE_FETCHING_FAILED ? (
      <div>
        <h2>An error occurred</h2>
        <div>
          <Button onClick={() => window.location.reload()} btnText="Retry" />
        </div>
      </div>
    ) : (
      <div className="profile-section">
        <div className="profile-section__blue-bg">
          <div className="profile-section__container-center">{this.getUserDetailsView()}</div>
        </div>

        <div className="profile-section__body">
          <div className="profile-section__container-center">
            {user.contentState === CONTENT_STATE_FETCHED && this.getTabMenuView()}
            {user.contentState === CONTENT_STATE_FETCHED && this.getProfileBody()}
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  match: objectProp.isRequired,
  user: objectProp.isRequired,
  profile: objectProp.isRequired,
  dispatch: funcProp.isRequired,
};

/**
 * @param {object} state The state of the application from redux store
 * @return {object} Props for ProfilePage component.
 */
const state2props = (state) => {
  const { auth, user, profile } = state;
  return {
    user: {
      isLoggedIn: auth.isLoggedIn,
      authToken: auth.token,
      username: user.username,
    },
    profile,
  };
};

export default connect(state2props)(ProfilePage);

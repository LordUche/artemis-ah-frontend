/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      user: {
        fullname: 'JK Rowling',
        username: 'jkrowling',
        about: 'I am the author of harry porter',
        profilePic: 'https://librarykv4jal.files.wordpress.com/2018/04/pkhkqpju402jii5i53t7vru84r-_ux250_.jpg',
        contentState: CONTENT_STATE_FETCHED,
      },
      editMode: false,
      activeTab: TAB_ARTICLES,
      tabContent: {
        [TAB_ARTICLES]: {
          count: 0,
          icon: 'fa-sticky-note',
          menuLabel: 'Articles',
          articles: [...Array(10)].map(() => ({
            title: 'Harry porter and the philosopher\'s stone',
            slug: 'harry-porter-1',
            description: 'Harry porter and the philosopher\'s stone',
            coverUrl: 'https://img.washingtonpost.com/wp-apps/imrs.php?src=https://img.washingtonpost.com/news/morning-mix/wp-content/uploads/sites/21/2014/07/9781408855713.jpg&w=1484',
            tag: 'HEALTH',
          })),
          contentState: CONTENT_STATE_FETCHING,
        },
        [TAB_FOLLOWING]: {
          count: 0,
          icon: 'fa-user',
          menuLabel: 'Following',
          following: [...Array(10)].map(() => ({
            fullname: 'JK Rowling',
            username: 'jkrowling',
            profilePic: 'https://librarykv4jal.files.wordpress.com/2018/04/pkhkqpju402jii5i53t7vru84r-_ux250_.jpg',
            about: 'I am the author of harry potter.',
          })),
          contentState: CONTENT_STATE_FETCHING,
        },
        [TAB_FOLLOWERS]: {
          count: 0,
          icon: 'fa-user',
          menuLabel: 'Followers',
          followers: [...Array(10)].map(() => ({
            fullname: 'JK Rowling',
            username: 'jkrowling',
            profilePic: 'https://librarykv4jal.files.wordpress.com/2018/04/pkhkqpju402jii5i53t7vru84r-_ux250_.jpg',
            about: 'I am the author of harry potter.',
          })),
          contentState: CONTENT_STATE_FETCHING,
        }
      },
    };
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
    const { user, editMode } = this.state;

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
    const { tabContent, activeTab } = this.state;

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
    const { tabContent } = this.state;

    const { articles, contentState } = tabContent[TAB_ARTICLES];

    let content = '';

    if (contentState === CONTENT_STATE_FETCHING) {
      content = <ArticleItemSkeletonScreen />;
    } else if (contentState === CONTENT_STATE_FETCHING_FAILED) {
      content = 'An error occurred. Please refresh';
    } else if (contentState === CONTENT_STATE_FETCHED) {
      content = articles.map((article, index) => (
        <ArticleItem
          key={index.toString()}
          tag={article.tag}
          title={article.title}
          description={article.description}
          slug={article.slug}
          coverUrl={article.coverUrl}
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
    const { tabContent } = this.state;

    const { followers, contentState } = tabContent[TAB_FOLLOWERS];

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
    const { tabContent } = this.state;

    const { following, contentState } = tabContent[TAB_FOLLOWING];

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
    const { user } = this.state;

    return (
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

export default connect()(ProfilePage);

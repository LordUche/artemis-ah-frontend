/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { object as objectProp, func as funcProp } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchUserDetails,
  fetchUserArticles,
  fetchUserFollowers,
  fetchUserFollowing,
  updateUserDetails,
  resetEditState,
} from '../redux/actions/profileActions';
import Template from '../components/Template';
import ArticleItem from '../components/ArticleItem';
import UserListItem from '../components/UserListItem';
import Button from '../components/Button';
import BodyError from '../components/PageContentLoadError';
import UserDetailsSkeletonScreen from '../skeletonscreens/ProfilePageUserDetails';
import ArticleItemSkeletonScreen from '../skeletonscreens/ArticleItem';
import UserItemSkeletonScreen from '../skeletonscreens/UserItem';
import {
  TAB_ARTICLES,
  TAB_FOLLOWING,
  TAB_FOLLOWERS,
  CONTENT_STATE_DEFAULT,
  CONTENT_STATE_FETCHED,
  CONTENT_STATE_FETCHING,
  CONTENT_STATE_FETCHING_FAILED,
  CONTENT_STATE_UPDATING,
  CONTENT_STATE_UPDATED,
} from '../constants/profileConstants';
import '../assets/scss/ProfilePage.scss';

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
      selectedImage: null,
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
   * @param {object} nextProps Props about to be passed by redux.
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { editMode } = this.state;

    const { dispatch } = this.props;

    if (editMode && nextProps.profile.editState === CONTENT_STATE_UPDATED) {
      this.setState({ editMode: false });

      dispatch(resetEditState());
    }
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
   * @method onImageSelected
   * @description Called when the selects a picture from their browser's image chooser.
   * @returns {undefined}
   */
  onImageSelected = ({ target }) => {
    const [image] = target.files;
    this.showSelectedImage(image);

    this.setState({
      selectedImage: image,
    });
  }

  /**
   * @returns {Node} The view for the users details.
   */
  getUserDetailsView() {
    const { profile } = this.props;

    const { user, editState } = profile;

    const { editMode } = this.state;

    if (user.contentState === CONTENT_STATE_FETCHING) {
      return <UserDetailsSkeletonScreen />;
    }

    if (user.contentState === CONTENT_STATE_FETCHED) {
      const aboutProps = {
        className: 'profile-section__blue-bg__data__about',
        'data-gramm_editor': 'false',
      };
      if (editMode) {
        aboutProps.className += ` ${aboutProps.className}--edit`;

        if (editState !== CONTENT_STATE_UPDATING) {
          aboutProps.contentEditable = true;
        }
      }

      return (
        <div className="profile-section__blue-bg__user-wrapper">
          <div className="profile-section__blue-bg__picture-section">
            <img
              src={user.profilePic}
              alt={user.fullname}
              ref={(ref) => { this.profileImgElement = ref; }}
            />
            {this.getProfilePictureEditOverlay()}
          </div>
          <div className="profile-section__blue-bg__data">
            <div className="profile-section__blue-bg__data__fullname">{user.fullname}</div>
            <div className="profile-section__blue-bg__data__username">{user.username}</div>
            <div
              {...aboutProps}
              ref={(ref) => { this.aboutUserElement = ref; }}
            >
              {user.about}
            </div>
            <div className="profile-section__blue-bg__data__btn-wrapper">
              {this.getUserProfileButton()}
            </div>
          </div>
        </div>
      );
    }
  }

  /**
   * @descriptions Returns overlay for profile picture which has a button to change profile picture.
   *               It will return nothing if it is not in edit mode.
   * @returns {HTMLDivElement} Overlay to update image.
   */
  getProfilePictureEditOverlay() {
    const { editMode } = this.state;

    const { profile } = this.props;

    if (!editMode) {
      return null;
    }

    return (
      <div className="profile-section__blue-bg__picture-section__edit-wrapper">
        {profile.editState !== CONTENT_STATE_UPDATING && (
        <div className="profile-section__blue-bg__picture-section__edit-wrapper__inner">
          <span className="profile-section__blue-bg__picture-section__edit-wrapper__inner__image-chooser">
            <span className="profile-section__blue-bg__picture-section__edit-wrapper__inner__image-chooser__inner">
              <span className="profile-section__blue-bg__picture-section__edit-wrapper__inner__image-chooser__inner__btn">
                <i className="fa fa-camera" />
              </span>
              <input type="file" accept="image/*" onChange={event => this.onImageSelected(event)} />
            </span>
          </span>
        </div>
        )}
      </div>
    );
  }

  /**
   * @description Get button to "follow/unfollow", "edit profile" or "login to follow".
   * @returns {Button} A button component.
   */
  getUserProfileButton() {
    const { user, profile } = this.props;

    if (user.isLoggedIn) {
      // If user is viewing their own profile.
      if (user.username === profile.user.username) {
        const { editMode } = this.state;

        if (editMode) {
          const saveBtnProps = {
            btnText: 'Save Changes',
          };
          if (profile.editState === CONTENT_STATE_UPDATING) {
            saveBtnProps.btnText = 'Updating ...';
          } else {
            saveBtnProps.onClick = this.saveUpdate.bind(this);
          }

          return <Button {...saveBtnProps} />;
        }

        return <Button onClick={() => this.startEditProfile()} btnText="Edit Profile" />;
      }

      return profile.user.isFollowing ? (
        <Button btnText="Unfollow" onClick={() => alert('This is a separate feature story.')} />
      ) : (
        <Button btnText="Follow" onClick={() => alert('This is a separate feature story.')} />
      );
    }

    return <Button onClick={() => { window.location = '/'; }} btnText="Log In to Follow" />;
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

    if (contentState === CONTENT_STATE_DEFAULT) {
      fetchUserArticles(profile.user.username, dispatch);
    }

    let content = '';

    if (contentState === CONTENT_STATE_FETCHING) {
      content = <ArticleItemSkeletonScreen />;
    } else if (contentState === CONTENT_STATE_FETCHING_FAILED) {
      content = (
        <BodyError
          onRetry={() => { fetchUserArticles(profile.user.username, dispatch); }}
        />
      );
    } else if (contentState === CONTENT_STATE_FETCHED) {
      if (articles.length < 1) {
        content = 'No article found.';
      } else {
        content = articles.map((article, index) => (
          <ArticleItem
            key={index.toString()}
            tag={(article.Tag ? article.Tag.name : 'no tag')}
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

    if (contentState === CONTENT_STATE_DEFAULT) {
      fetchUserFollowers(profile.user.username, dispatch);
    }

    let content = '';

    if (contentState === CONTENT_STATE_FETCHING) {
      content = <UserItemSkeletonScreen />;
    } else if (contentState === CONTENT_STATE_FETCHING_FAILED) {
      content = (
        <BodyError
          onRetry={() => { fetchUserFollowers(profile.user.username, dispatch); }}
        />
      );
    } else if (contentState === CONTENT_STATE_FETCHED) {
      if (followers.length < 1) {
        content = 'No followers';
      } else {
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

    if (contentState === CONTENT_STATE_DEFAULT) {
      fetchUserFollowing(profile.user.username, dispatch);
    }

    let content = '';

    if (contentState === CONTENT_STATE_FETCHING) {
      content = <UserItemSkeletonScreen />;
    } else if (contentState === CONTENT_STATE_FETCHING_FAILED) {
      content = (
        <BodyError
          onRetry={() => { fetchUserFollowing(profile.user.username, dispatch); }}
        />
      );
    } else if (contentState === CONTENT_STATE_FETCHED) {
      if (following.length < 1) {
        content = 'Not following anyone.';
      } else {
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
   * @param {File} image The image the user selected from the file chooser.
   * @returns {undefined}
   */
  showSelectedImage(image) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.profileImgElement.src = e.target.result;
    };
    reader.readAsDataURL(image);
  }

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
    const { dispatch, user } = this.props;

    const { selectedImage } = this.state;

    updateUserDetails(
      user.authToken,
      this.aboutUserElement.innerText,
      selectedImage,
      dispatch,
    );
  }

  /**
   * @description Returns true if the user is not logged in and there is no username in
   *              the URL.
   * @returns {bool} Returns true if user should be redirected to homepage.
   */
  shouldRedirectToHome() {
    const { user, match } = this.props;

    return (!user.isLoggedIn && !match.params.username);
  }

  /**
   * @method render
   * @returns {HTMLElement} Returns the profile page
   */
  render() {
    if (this.shouldRedirectToHome()) {
      return <Redirect to="/" />;
    }

    const { profile } = this.props;

    const { user } = profile;

    return user.contentState === CONTENT_STATE_FETCHING_FAILED ? (
      <Template>
        <div className="main-content-section">
          <BodyError
            onRetry={() => window.location.reload()}
          />
        </div>
      </Template>
    ) : (
      <Template>
        <div className="profile-section main-content-section">
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
      </Template>
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
 * @description Maps redux state to the component's props.
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

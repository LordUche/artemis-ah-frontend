import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  bool, string, func, shape, number, object
} from 'prop-types';

// Components
import { SideNav } from '../components';
import TopNavBar from '../components/TopNav';
import ProfileOptionCard from '../components/ProfileOptionCard';
import Button from '../components/Button';
import AHLoginModal from './LoginModal';
import AHSignUpModal from './SignUpView';
import BodyError from '../components/PageContentLoadError';

// Images
import { settingsIcon } from '../assets/img__func/icons_svg';

// Actions
import {
  fetchUserDetails,
  updateUserNotificationDetails,
  resetEditState
} from '../redux/actions/profileActions';

import { confirmUserPassword, changeExistingPassword } from '../redux/actions/authActions';
import {
  CONTENT_STATE_UPDATE_FAILED,
  CONTENT_STATE_FETCHING_FAILED,
  CONTENT_STATE_UPDATING,
  CONTENT_STATE_UPDATED
} from '../constants/profileConstants';

// Utils
import notifyUser from '../utils/Toast';
import InputField from '../components/InputField';
import HelperUtils from '../utils/helperUtils';

/**
 * @description setttings page view method
 * @param {object} e event object
 * @returns {HTMLDivElement} profile
 */
export class Settings extends Component {
  state = {
    activeTab: 'Notifications',
    newEmailNotification: null,
    newInAppNotification: null,
    showLoginModal: false,
    showSignUpModal: false
  };

  /**
   * @description lifecycle method that runs when the component mounts
   * @returns {undefined}
   */
  componentDidMount() {
    this.checkLoginStatus();
    const {
      username, dispatch, token, isLoggedIn
    } = this.props;
    dispatch(resetEditState());
    if (isLoggedIn) {
      fetchUserDetails(username, token, dispatch);
    }
  }

  /**
   * @description Checking login status and displaying login modal if user is not logged in
   * @returns {undefined}
   */
  checkLoginStatus = () => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.toggleLoginModal();
    }
  };

  handlePasswordChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    this.setState({ passwordChangeLoading: true });
    const { currentPassword, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      this.setState({ passwordChangeLoading: false });
      return notifyUser(
        toast('The supplied password doesn\'t match', {
          className: 'error-toast'
        })
      );
    }
    const { token } = this.props;
    const { email, username } = HelperUtils.verifyToken(token);
    const hashedEmail = HelperUtils.hashPasswordOrEmail(email);
    const verifyUsersCurrentPassword = await confirmUserPassword(username, currentPassword);

    if (verifyUsersCurrentPassword === 200) {
      const response = await changeExistingPassword(
        newPassword,
        confirmPassword,
        email,
        hashedEmail
      );
      if (response[1] === 200) {
        form.reset();
        this.setState({
          passwordChangeLoading: false,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        toast(<div>{response[0]}</div>);
      } else {
        this.setState({ passwordChangeLoading: false });
        const [errorMessage] = response.errors.newPassword;
        notifyUser(
          toast(errorMessage, {
            className: 'error-toast'
          })
        );
      }
    } else {
      this.setState({ passwordChangeLoading: false });
      notifyUser(
        toast('Invalid current password', {
          className: 'error-toast'
        })
      );
    }
  };

  toggleActiveTab = (e) => {
    this.setState({
      activeTab: e.target.id
    });
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

  toggleInAppNotification = () => {
    const { newInAppNotification } = this.state;
    const { inAppNotification } = this.props;
    this.setState({
      newInAppNotification:
        newInAppNotification === null ? !inAppNotification : !newInAppNotification
    });
  };

  toggleEmailNotification = () => {
    const { newEmailNotification } = this.state;
    const { emailNotification } = this.props;
    this.setState({
      newEmailNotification:
        newEmailNotification === null ? !emailNotification : !newEmailNotification
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { newInAppNotification, newEmailNotification } = this.state;
    const {
      inAppNotification, emailNotification, dispatch, token
    } = this.props;
    this.state.inAppNotification = newInAppNotification === null
      ? inAppNotification : newInAppNotification;
    this.state.emailNotification = newEmailNotification === null
      ? emailNotification : newEmailNotification;
    updateUserNotificationDetails(token, this.state, dispatch);
  };

  /**
   * @returns {undefined}
   */
  render() {
    const {
      state,
      toggleActiveTab,
      toggleInAppNotification,
      toggleEmailNotification,
      toggleLoginModal,
      toggleSignUpModal,
      handleSubmit
    } = this;
    const {
      activeTab,
      newEmailNotification,
      newInAppNotification,
      showLoginModal,
      showSignUpModal,
      passwordChangeLoading
    } = state;
    const {
      inAppNotification,
      emailNotification,
      history,
      editState,
      dispatch,
      contentState,
      username,
      token,
      isLoggedIn
    } = this.props;
    const inAppNotificationStatus = newInAppNotification === null
      ? inAppNotification : newInAppNotification;
    const emailNotificationStatus = newEmailNotification === null
      ? emailNotification : newEmailNotification;

    const isLoading = editState === CONTENT_STATE_UPDATING;

    if (contentState === CONTENT_STATE_FETCHING_FAILED) {
      return (
        <BodyError
          onRetry={() => {
            fetchUserDetails(username, token, dispatch);
          }}
        />
      );
    }

    if (editState === CONTENT_STATE_UPDATED) {
      notifyUser(toast('Successfully updated your settings'));
      dispatch(resetEditState());
    }

    if (editState === CONTENT_STATE_UPDATE_FAILED) {
      notifyUser(
        toast('Could not update your settings, please check your connection and try again later', {
          className: 'error-toast'
        })
      );
      dispatch(resetEditState());
    }

    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        {showLoginModal && (
          <AHLoginModal onClose={() => history.push('/')} toggleSignUpModal={toggleSignUpModal} />
        )}
        {showSignUpModal && (
          <AHSignUpModal
            toggleSignUpModal={() => history.push('/')}
            revealLoginModal={toggleLoginModal}
          />
        )}
        <TopNavBar />
        <ProfileOptionCard headerText="Settings" headerImg={settingsIcon(40, 40)}>
          <section className="settings_section">
            <nav className="settings_section_nav">
              <ul className="settings_section_nav_list">
                <li
                  className={activeTab === 'Notifications' ? 'active' : ''}
                  id="Notifications"
                  onClick={toggleActiveTab}
                  role="presentation"
                >
                  Notifications
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </li>
                <li
                  className={activeTab === 'Password' ? 'active' : ''}
                  id="Password"
                  onClick={toggleActiveTab}
                  role="presentation"
                >
                  Change Password
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </li>
                <li
                  className={activeTab === 'Deactivate' ? 'active' : ''}
                  id="Deactivate"
                  onClick={toggleActiveTab}
                  role="presentation"
                >
                  Deactivate Account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </li>
              </ul>
            </nav>
            <section className="settings_section_body">
              {activeTab === 'Notifications'
                && inAppNotificationStatus !== null
                && emailNotification !== null && (
                  <form onSubmit={handleSubmit} id="notification-settings-form">
                    <div className="settings_section_notification_item">
                      <div className="settings_section_notification_item_text">
                        <h6>In app notification</h6>
                        {inAppNotificationStatus && (
                          <p>You will receive notifications when you’re online</p>
                        )}
                        {!inAppNotificationStatus && (
                          <p>You will not receive notifications when you’re online</p>
                        )}
                      </div>
                      {inAppNotificationStatus && (
                        <input
                          onChange={toggleInAppNotification}
                          name="newInAppNotification"
                          type="checkbox"
                          checked="checked"
                        />
                      )}
                      {!inAppNotificationStatus && (
                        <input
                          onChange={toggleInAppNotification}
                          name="newInAppNotification"
                          type="checkbox"
                        />
                      )}
                    </div>
                    <div className="settings_section_notification_item">
                      <div className="settings_section_notification_item_text">
                        <h6>Email notification</h6>
                        {emailNotificationStatus && (
                          <p>Notifications will be sent to your email address</p>
                        )}
                        {!emailNotificationStatus && (
                          <p>Notifications will not be sent to your email address</p>
                        )}
                      </div>
                      {emailNotificationStatus && (
                        <input
                          onChange={toggleEmailNotification}
                          name="newEmailNotification"
                          type="checkbox"
                          checked="checked"
                        />
                      )}
                      {!emailNotificationStatus && (
                        <input
                          onChange={toggleEmailNotification}
                          name="newEmailNotification"
                          type="checkbox"
                        />
                      )}
                    </div>
                    <Button
                      btnText={isLoading ? 'Saving' : 'Save'}
                      btnType="submit"
                      customClass="settings_section_notification_btn"
                      isDisabled={isLoading}
                    />
                  </form>
              )}
              {activeTab === 'Password' && (
                <form
                  className="change_existing_password_form"
                  onSubmit={this.handlePasswordChangeSubmit}
                >
                  <div>
                    <h2>
                      Current Password
                      {' '}
                      <span className="red_required_star">*</span>
                    </h2>
                    <InputField
                      required
                      inputType="password"
                      inputName="currentPassword"
                      customClass="change_existing_password_input"
                      placeHolder="Current Password"
                      onChange={this.handlePasswordChange}
                    />
                  </div>
                  <div>
                    <h2>
                      New Password
                      {' '}
                      <span className="red_required_star">*</span>
                    </h2>
                    <InputField
                      minLength="8"
                      required
                      inputType="password"
                      inputName="newPassword"
                      maxLength="30"
                      onChange={this.handlePasswordChange}
                      customClass="change_existing_password_input"
                      placeHolder="New Password"
                    />
                  </div>
                  <div>
                    <h2>
                      Confirm Password
                      {' '}
                      <span className="red_required_star">*</span>
                    </h2>
                    <InputField
                      minLength="8"
                      required
                      inputType="password"
                      inputName="confirmPassword"
                      maxLength="30"
                      onChange={this.handlePasswordChange}
                      customClass="change_existing_password_input"
                      placeHolder="Confirm Password"
                    />
                  </div>
                  <Button
                    btnText={passwordChangeLoading ? 'Saving' : 'Save'}
                    btnType="submit"
                    customClass="settings_section_notification_btn"
                    btnId="settings_section_notification_password_btn"
                    isDisabled={passwordChangeLoading}
                  />
                </form>
              )}
            </section>
          </section>
        </ProfileOptionCard>
        <SideNav isLoggedIn />
      </Fragment>
    );
  }
}

/**
 * @description Function for mapping redux store to component props
 * @param {object} store redux store
 * @returns {object} component props
 */
export const mapStateToProps = ({ auth, profile, user }) => {
  const { isLoggedIn, token } = auth;
  const { username } = user;
  const { user: userProfile, editState } = profile;
  const { inAppNotification, emailNotification, contentState } = userProfile;
  return {
    isLoggedIn,
    username,
    inAppNotification,
    emailNotification,
    token,
    editState,
    contentState
  };
};

Settings.propTypes = {
  isLoggedIn: bool.isRequired,
  inAppNotification: bool,
  emailNotification: bool,
  username: string,
  token: string.isRequired,
  dispatch: func.isRequired,
  history: shape({
    action: string,
    block: func,
    createHref: func,
    go: func,
    goBack: func,
    goForward: func,
    length: number,
    listen: func,
    location: object,
    push: func,
    replace: func
  }).isRequired,
  editState: string.isRequired,
  contentState: string.isRequired
};

Settings.defaultProps = {
  username: '',
  emailNotification: null,
  inAppNotification: null
};

export default connect(mapStateToProps)(Settings);

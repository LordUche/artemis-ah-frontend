import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  bool, func, objectOf, object
} from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { post } from 'axios';
import { post } from 'axios';

// Social Media Auth URL's
import BASE_URL, {
  GOOGLE_SOCIAL_LOGIN_URL,
  FACEBOOK_SOCIAL_LOGIN_URL,
  TWITTER_SOCIAL_LOGIN_URL,
} from '../redux/actions';

// Components
import Modal from '../components/Modal';
import Button from '../components/Button';
import InputField from '../components/InputField';

// Images
import faceBookLogo from '../assets/img/facebooklogo.svg';
import twitterLogo from '../assets/img/twitterlogo.svg';
import googleLogo from '../assets/img/googlelogo.svg';

// Actions
import {
  loginUserAction,
  loadingAuthAction,
  clearAuthErrorAction
} from '../redux/actions/authActions';

/**
 * @description loginmodal
 * @param {object} e event object
 * @returns {HTMLDivElement} login modal
 */
export class LoginModal extends Component {
  state = {
    name: '',
    password: '',
    rememberMe: false,
    resetPasswordModal: false,
    email: '',
    message: '',
    fetching: false
  };

  clearErrors = () => {
    const { clearAuthError, errorMessages } = this.props;
    if (errorMessages.errors) {
      clearAuthError();
    }
  };

  componentWillMount = () => {
    this.clearErrors();
  };

  handleInputChange = (e) => {
    this.clearErrors();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { loginUser, loadingAuth } = this.props;
    loadingAuth();
    loginUser(this.state);
  };

  doNothing = () => ({ message: 'Processing Request' });

  handleErrorMessages = () => {
    const { errorMessages } = this.props;
    return errorMessages.errors
      ? {
        nameError: errorMessages.errors.name ? errorMessages.errors.name[0] : '',
        passwordError: errorMessages.errors.password ? errorMessages.errors.password[0] : '',
        generalError: errorMessages.errors.general || ''
      }
      : {
        nameError: '',
        passwordError: '',
        generalError: ''
      };
  };

  modalName = () => {
    const { resetPasswordModal } = this.state;
    if (resetPasswordModal) {
      return 'Forgot Password';
    }
    return 'Login';
  }

  submitReset = async (e) => {
    this.setState({ fetching: true });
    e.preventDefault();
    const { email } = this.state;
    try {
      const response = await post(`${BASE_URL}/users/reset-password`, {
        email
      });
      const { message } = response.data;
      this.setState({ message, fetching: false });
    } catch (error) {
      const { message } = error.response.data;
      if (message === 'user not found in our records') {
        this.setState({
          message: 'Please, verify password reset link in your email box',
          fetching: false
        });
      }
    }
  }

  /**
   * @description social Login
   * @param {string} URL
   * @returns {null} null
   */
  socialMediaLogin = (URL) => {
    window.location.assign(URL);
  };

  /**
   * @returns {HTMLElement} div
   */
  render() {
    const {
      state, doNothing, handleSubmit, handleInputChange, handleErrorMessages, modalName, submitReset
    } = this;
    const {
      rememberMe,
      resetPasswordModal,
      message,
      fetching
    } = state;
    const {
      onClose,
      isLoggedIn,
      loading,
      toggleSignUpModal
    } = this.props;
    const { nameError, passwordError, generalError } = handleErrorMessages();
    return isLoggedIn ? (
      <Redirect to="/profile" />
    ) : (
      <Modal customClass="login_body_modal" modalHeader={modalName()} onClose={onClose}>
        { resetPasswordModal && (
          <div className="login_body">
            <p className="login_body_required_text">*(Required fields)</p>
            <p className="login_body_instruction">PLEASE ENTER YOUR REGISTERED EMAIL ADDRESS</p>
            <section className="login_body_reset_section">
              <form onSubmit={submitReset}>
                <InputField
                  placeHolder="Enter Email"
                  showRequiredAsterisk
                  required
                  inputType="email"
                  customClass="login_body_reset_input"
                  inputName="email"
                  onChange={handleInputChange}
                />
                <br />
                <p className="login_body_required_text login_body_response_text">{ message }</p>
                <Button
                  customClass="login_body_form_submit_btn login_body_reset_btn"
                  btnText="Recover"
                  btnType="submit"
                  isDisabled={fetching}
                />
              </form>
            </section>
          </div>
        )}
        { !resetPasswordModal && (
          <div className="login_body">
            <p className="login_body_required_text">*(Required fields)</p>
            <section className="login_body_info">
              <section className="login_body_socials">
                <Button
                  btnText="Sign in with Facebook"
                  customClass="login_body_socials_btn login_body_socials_facebook facebookDesktop"
                  imgSrc={faceBookLogo}
                  imgAltText="facebook logo"
                  imgCustomClass="login_body_socials_btn_img"
                  onClick={() => this.socialMediaLogin(FACEBOOK_SOCIAL_LOGIN_URL)}
                />
                <Button
                  btnText="Sign in with Twitter"
                  customClass="login_body_socials_btn login_body_socials_twitter twitterDesktop"
                  imgSrc={twitterLogo}
                  imgAltText="twitter logo"
                  imgCustomClass="login_body_socials_btn_img"
                  onClick={() => this.socialMediaLogin(TWITTER_SOCIAL_LOGIN_URL)}
                />
                <Button
                  btnText="Sign in with Google"
                  customClass="login_body_socials_btn login_body_socials_google googleDesktop"
                  imgSrc={googleLogo}
                  imgAltText="google logo"
                  imgCustomClass="login_body_socials_btn_img"
                  onClick={() => this.socialMediaLogin(GOOGLE_SOCIAL_LOGIN_URL)}
                />
              </section>
              <section className="login_body_socials_responsive">
                <p className="login_body_socials_responsive_text">Sign in with</p>
                <Button
                  btnText=""
                  customClass="login_body_socials_btn login_body_socials_facebook facebookMobile"
                  imgSrc={faceBookLogo}
                  imgAltText="facebook logo"
                  imgCustomClass="login_body_socials_responsive_btn_img"
                  onClick={() => this.socialMediaLogin(FACEBOOK_SOCIAL_LOGIN_URL)}
                />
                <Button
                  btnText=""
                  customClass="login_body_socials_btn login_body_socials_twitter twitterMobile"
                  imgSrc={twitterLogo}
                  imgAltText="twitter logo"
                  imgCustomClass="login_body_socials_responsive_btn_img"
                  onClick={() => this.socialMediaLogin(TWITTER_SOCIAL_LOGIN_URL)}
                />
                <Button
                  btnText=""
                  customClass="login_body_socials_btn login_body_socials_google googleMobile"
                  imgSrc={googleLogo}
                  imgAltText="google logo"
                  imgCustomClass="login_body_socials_responsive_btn_img"
                  onClick={() => this.socialMediaLogin(GOOGLE_SOCIAL_LOGIN_URL)}
                />
              </section>
              <section className="login_body_divider">
                <hr className="login_body_divider_line" />
                <span className="login_body_divider_span">OR</span>
              </section>
              <form
                className="login_body_form"
                id="loginForm"
                onSubmit={loading ? doNothing : handleSubmit}
              >
                {generalError && <p className="login_body_form_error_general">{generalError}</p>}
                <InputField
                  placeHolder="Email or Username"
                  showRequiredAsterisk
                  required
                  inputType="text"
                  customClass="login_body_form_input"
                  inputName="name"
                  onChange={handleInputChange}
                />
                {nameError && (
                  <p className="login_body_form_error login_body_form_error_name">{nameError}</p>
                )}
                <InputField
                  placeHolder="Password"
                  showRequiredAsterisk
                  required
                  inputType="password"
                  customClass="login_body_form_input"
                  inputName="password"
                  onChange={handleInputChange}
                />
                {passwordError && <p className="login_body_form_error">{passwordError}</p>}
                <div className="login_body_form_rem_div">
                  <InputField
                    inputType="checkbox"
                    customClass="login_body_form_rem_div_input"
                    inputName="rememberMe"
                    onChange={() => this.setState({ rememberMe: !rememberMe })}
                  />
                  <p className="login_body_form_rem_div_text">Remember me</p>
                </div>
                <Button
                  customClass="login_body_form_submit_btn"
                  btnText="Login"
                  isDisabled={loading}
                  btnType="submit"
                  onClick={doNothing}
                />
                <div className="login_body_form_links">
                  <button type="button" className="ah_signup_registered-link hasAccount" onClick={toggleSignUpModal}>Register Now</button>
                  <button type="button" className="ah_signup_registered-link hasAccount" onClick={() => this.setState({ resetPasswordModal: !resetPasswordModal })}>Forgot Password?</button>
                </div>
              </form>
            </section>
          </div>
        )}
      </Modal>
    );
  }
}

/**
 * @description function to map dispatch to component as props
 * @param {object} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginUser: loginUserAction,
    loadingAuth: loadingAuthAction,
    clearAuthError: clearAuthErrorAction
  },
  dispatch
);

/**
 * @description function to map store to component as props
 * @param {object} store The redux store
 * @returns {object} props
 */
export const mapStateToProps = ({ auth }) => {
  const { isLoggedIn, errorMessages, loading } = auth;
  return {
    isLoggedIn,
    errorMessages,
    loading
  };
};

LoginModal.propTypes = {
  onClose: func.isRequired,
  loginUser: func.isRequired,
  loadingAuth: func.isRequired,
  clearAuthError: func.isRequired,
  loading: bool.isRequired,
  isLoggedIn: bool.isRequired,
  errorMessages: objectOf(object).isRequired,
  toggleSignUpModal: func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);

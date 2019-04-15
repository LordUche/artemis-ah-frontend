/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, bool, objectOf, object, string
} from 'prop-types';

// Social Media Auth URL's
import {
  GOOGLE_SOCIAL_LOGIN_URL,
  FACEBOOK_SOCIAL_LOGIN_URL,
  TWITTER_SOCIAL_LOGIN_URL
} from '../redux/actions';

// Actions
import { loadingAuthAction, clearAuthErrorAction, signUp } from '../redux/actions/authActions';

// Components
import InputField from './InputField';
import Button from './Button';

// images
import message from '../assets/img/message.png';
import faceBookLogo from '../assets/img/facebooklogo.svg';
import twitterLogo from '../assets/img/twitterlogo.svg';
import googleLogo from '../assets/img/googlelogo.svg';
import or from '../assets/img/Frame.png';

/**
 * SignUp Form
 * @returns {object} is signed up
 */
export class SignUp extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmPasswordError: '',
  }

  clearErrors = () => {
    const { clear, errorMessages } = this.props;
    if (errorMessages.errors) {
      clear();
    }
  }

  componentWillMount = () => {
    this.clearErrors();
  };

  handleErrorMessages = () => {
    const {
      errorMessages
    } = this.props;
    return errorMessages.errors ? {
      firstnameError: errorMessages.errors.firstname ? errorMessages.errors.firstname[0] : '',
      lastnameError: errorMessages.errors.lastname ? errorMessages.errors.lastname[0] : '',
      usernameError: errorMessages.errors.username ? errorMessages.errors.username[0] : '',
      emailError: errorMessages.errors.email ? errorMessages.errors.email[0] : '',
      passwordError: errorMessages.errors.password ? errorMessages.errors.password[0] : ''
    } : {
      firstnameError: '',
      lastnameError: '',
      usernameError: '',
      emailError: '',
      passwordError: ''
    };
  };


  /**
   * @description onChange method
   * @param {*} e
   * @returns {object} name-value pair
   */
  onInputChange = (e) => {
    this.clearErrors();
    const { target } = e;
    const { value } = target;
    const { name } = target;
    this.setState({ [name]: value }, () => { this.handleConfirmPassword(); });
  }

  /**
   * @description handle confirmPassword method
   * @returns {object} checks password against confirmPassword
   */
  handleConfirmPassword = () => {
    const { password, confirmPassword } = this.state;
    if (confirmPassword !== password) this.setState({ confirmPasswordError: 'password does not match' });
    else this.setState({ confirmPasswordError: '' });
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
   * @description onChange method
   * @param {*} e
   * @returns {object} dispatch action
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      loadingAuth, signUpUser
    } = this.props;
    loadingAuth();
    signUpUser(this.state);
  }

  /**
   * @returns {HTMLElement} modal child
   */
  render() {
    const { confirmPasswordError } = this.state;
    const valid = confirmPasswordError === '';
    const {
      firstnameError,
      lastnameError,
      passwordError,
      usernameError,
      emailError
    } = this.handleErrorMessages();

    const {
      signedUp,
      email,
      loading,
      revealLoginModal,
      clear
    } = this.props;
    return signedUp ? (
      <div className="verification">
        <strong><p className="verification__text">One more step for you, One giant leap for readers everywhere!</p></strong>
        <div>
          <img src={message} className="verification__image" alt="verify" />
        </div>
        <p className="verification__text">
          <span>Verification email has been sent to </span>
          <strong>{email}</strong>
          .
        </p>
        <p className="verification__text">
        Please check your inbox and verify your email and login to begin writing awesome articles!
          <br />
          <button type="button" className="ah_signup_registered-link hasAccount" onClick={clear}> Not You?</button>
        </p>
      </div>
    ) : (
      <div className="ah_signup_body">
        <p className="login_body_required_text">*(Required fields)</p>

        <form className="ah_signup_form" onSubmit={this.handleSubmit}>
          <div className="ah_signup_form__input">
            <InputField
              customClass="ah_signup_form__input--signup firstname"
              placeHolder="Enter Firstname"
              onChange={this.onInputChange}
              inputType="text"
              inputName="firstname"
              required
              showRequiredAsterisk
            />
            <span className="error">{firstnameError}</span>
          </div>
          <div className="ah_signup_form__input">
            <InputField
              customClass="ah_signup_form__input--signup"
              placeHolder="Enter Lastname"
              onChange={this.onInputChange}
              inputType="text"
              inputName="lastname"
              required
              showRequiredAsterisk
            />
            <span className="error">{lastnameError}</span>
          </div>
          <div className="ah_signup_form__input">
            <InputField
              customClass="ah_signup_form__input--signup"
              placeHolder="Enter Username"
              onChange={this.onInputChange}
              inputType="text"
              inputName="username"
              required
              showRequiredAsterisk
            />
            <span className="error">{usernameError}</span>
          </div>
          <div className="ah_signup_form__input">
            <InputField
              customClass="ah_signup_form__input--signup"
              placeHolder="Enter Email"
              onChange={this.onInputChange}
              inputType="text"
              inputName="email"
              required
              showRequiredAsterisk
            />
            <span className="error">{emailError}</span>
          </div>
          <div className="ah_signup_form__input">
            <InputField
              customClass="ah_signup_form__input--signup"
              placeHolder="Enter Password"
              onChange={this.onInputChange}
              inputType="password"
              inputName="password"
              required
              showRequiredAsterisk
            />
            <span className="error">{passwordError}</span>
          </div>
          <div className="ah_signup_form__input">
            <InputField
              customClass="ah_signup_form__input--signup"
              placeHolder="Confirm Password"
              onChange={this.onInputChange}
              inputType="password"
              inputName="confirmPassword"
              required
              showRequiredAsterisk
            />
            <span className="error">{confirmPasswordError}</span>
          </div>
          <div className="ah_signup_form_wrapper">
            <Button
              customClass="ah_signup_form_wrapper__button"
              btnText="Sign Up"
              isDisabled={!valid || loading}
              btnType="submit"
            />
          </div>
        </form>
        <div>
          <p className="ah_signup_registered">
            Already have an account?
            <button type="button" className="ah_signup_registered-link hasAccount" onClick={revealLoginModal}> Login Here</button>
          </p>
        </div>
        <div>
          <img src={or} alt="" className="ah_signup_or" />
        </div>
        <div className="ah_signup_social">
          <Button
            customClass="ah_signup_social--facebook"
            imgSrc={faceBookLogo}
            imgCustomClass="ah_signup_social_img"
            btnText="Sign in with Facebook"
            onClick={() => this.socialMediaLogin(FACEBOOK_SOCIAL_LOGIN_URL)}
          />
          <Button
            customClass="ah_signup_social--twitter"
            imgSrc={twitterLogo}
            imgCustomClass="ah_signup_social_img"
            btnText="Sign in with Twitter"
            onClick={() => this.socialMediaLogin(TWITTER_SOCIAL_LOGIN_URL)}
          />
          <Button
            customClass="ah_signup_social--google"
            imgSrc={googleLogo}
            imgCustomClass="ah_signup_social_img"
            btnText="Sign in with Google+"
            onClick={() => this.socialMediaLogin(GOOGLE_SOCIAL_LOGIN_URL)}
          />
        </div>
        <div className="ah_signup_social_small">
          <p className="ah_signup_social_small_text">Sign in with</p>
          <Button
            customClass="ah_signup_social_small--facebook"
            imgCustomClass="login_body_socials_responsive_btn_img"
            imgSrc={faceBookLogo}
            btnText=""
            onClick={() => this.socialMediaLogin(FACEBOOK_SOCIAL_LOGIN_URL)}
          />
          <Button
            customClass="ah_signup_social_small--twitter"
            imgSrc={twitterLogo}
            imgCustomClass="login_body_socials_responsive_btn_img"
            btnText=""
            onClick={() => this.socialMediaLogin(TWITTER_SOCIAL_LOGIN_URL)}
          />
          <Button
            customClass="ah_signup_social_small--google"
            imgSrc={googleLogo}
            imgCustomClass="login_body_socials_responsive_btn_img"
            btnText=""
            onClick={() => this.socialMediaLogin(GOOGLE_SOCIAL_LOGIN_URL)}
          />
        </div>
      </div>
    );
  }
}

/**
 * @description pass state to props
 * @param {*} state
 * @returns {object} state
 */
export function mapStateToProps({ auth }) {
  const { errorMessages, loading } = auth;
  return {
    errorMessages,
    loading,
  };
}

/**
 * @param {object} dispatch
 * @returns {promise} user
 */
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUpUser: signUp,
    loadingAuth: loadingAuthAction,
    clear: clearAuthErrorAction
  }, dispatch);
}

SignUp.propTypes = {
  signUpUser: func.isRequired,
  loadingAuth: func.isRequired,
  errorMessages: objectOf(object).isRequired,
  loading: bool.isRequired,
  clear: func.isRequired,
  signedUp: bool.isRequired,
  email: string.isRequired,
  revealLoginModal: func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

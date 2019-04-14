import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, bool, objectOf, object, string
} from 'prop-types';

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
    valid: false
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
    this.setState({ [name]: value });
  }

  /**
   * @description onChange method
   * @param {*} e
   * @returns {object} name-value pair
   */
  handleConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    const { password } = this.state;
    if (confirmPassword !== password) this.setState({ confirmPasswordError: 'password does not match' });
    else this.setState({ confirmPasswordError: '' });
    this.setValid();
  }

  setValid = () => {
    const { valid, confirmPasswordError } = this.state;
    if (confirmPasswordError === '') this.setState({ valid: !valid });
  }

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
    // console.log(this.props);
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
      revealLoginModal
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
        <p className="verification__text">Please check your inbox and verify your email to begin writing awesome articles!</p>
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
              onChange={this.handleConfirmPassword}
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
              onClick={this.onSubmit}
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
            onClick={this.onClick}
          />
          <Button
            customClass="ah_signup_social--twitter"
            imgSrc={twitterLogo}
            btnText="Sign in with Twitter"
            onClick={this.onClick}
          />
          <Button
            customClass="ah_signup_social--google"
            imgSrc={googleLogo}
            btnText="Sign in with Google+"
            onClick={this.onClick}
          />
        </div>
        <div className="ah_signup_social_small">
          <Button
            customClass="ah_signup_social_small--facebook"
            imgCustomClass="login_body_socials_responsive_btn_img"
            imgSrc={faceBookLogo}
            btnText=""
            onClick={this.onClick}
          />
          <Button
            customClass="ah_signup_social_small--twitter"
            imgSrc={twitterLogo}
            imgCustomClass="login_body_socials_responsive_btn_img"
            btnText=""
            onClick={this.onClick}
          />
          <Button
            customClass="ah_signup_social_small--google"
            imgSrc={googleLogo}
            imgCustomClass="login_body_socials_responsive_btn_img"
            btnText=""
            onClick={this.onClick}
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

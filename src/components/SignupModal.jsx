import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, bool } from 'prop-types';
import signUpUser from '../redux/actions/signUp';
import InputField from './InputField';
import Button from './Button';
import or from '../assets/img/Frame.png';
import Modal from './Modal';

// Images
import faceBookLogo from '../assets/img/facebooklogo.svg';
import twitterLogo from '../assets/img/twitterlogo.svg';
import googleLogo from '../assets/img/googlelogo.svg';

/**
 * @description Sign up a user
 */
export class SignUp extends Component {
  /**
   * @description constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    formErrors: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    firstnameValid: false,
    lastnameValid: false,
    usernameValid: false,
    emailValid: false,
    passwordValid: false,
    confirmPasswordValid: false,
    formValid: false,
  };

  /**
   * @description onChange method
   * @param {*} event
   * @returns {object} dunno
   */
  onInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    // this.setState({term: event.target.value});
    this.setState({ [name]: value }, () => { this.validateField(name, value); });
    // console.log(this.state);
  }

  /**
   * @description onSubmit method
   * @param {*} event
   * @returns {object} dunno
   */
  onSubmit(event) {
    event.preventDefault();
    const { signUp, toggleSignupModal, toggleVerify } = this.props;
    signUp(this.state, toggleSignupModal, toggleVerify);
  }

  /**
   * @description onClick method
   * @param {*} event
   * @returns {object} dunno
   */
  onClick(event) {
    event.preventDefault(this);
  }

  /**
   * @description validate input
   * @param {*} fieldName
   * @param {*} value
   * @returns {object} state
   */
  validateField(fieldName, value) {
    const {
      firstnameValid,
      lastnameValid,
      usernameValid,
      formErrors,
      emailValid,
      passwordValid,
      confirmPasswordValid,
      password
    } = this.state;
    const fieldValidationErrors = formErrors;
    let isEmailValid = emailValid;
    let isPasswordValid = passwordValid;
    let isConfirmPassword = confirmPasswordValid;
    let isFirstnameValid = firstnameValid;
    let isLastnameValid = lastnameValid;
    let isUsernameValid = usernameValid;

    switch (fieldName) {
      case 'firstname':
        isFirstnameValid = value.length >= 2 && value.match((/^[A-Za-z]+$/));
        fieldValidationErrors.firstname = isFirstnameValid ? '' : 'Firstname is invalid';
        break;
      case 'lastname':
        isLastnameValid = value.length >= 2 && value.match((/^[A-Za-z]+$/));
        fieldValidationErrors.lastname = isLastnameValid ? '' : 'Lastname is invalid';
        break;
      case 'username':
        isUsernameValid = value.length >= 2 && value.match((/^[A-Za-z]+$/));
        fieldValidationErrors.username = isUsernameValid ? '' : 'Username is invalid';
        break;
      case 'email':
        isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = isEmailValid ? '' : 'Email is invalid';
        break;
      case 'password':
        isPasswordValid = value.length >= 8;
        fieldValidationErrors.password = isPasswordValid ? '' : 'Password must be 8 characters long';
        break;
      case 'confirmPassword':
        isConfirmPassword = value === password;
        formErrors.confirmPassword = isConfirmPassword ? '' : 'Password does not match';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      firstnameValid: isFirstnameValid,
      lastnameValid: isLastnameValid,
      usernameValid: isUsernameValid,
      emailValid: isEmailValid,
      passwordValid: isPasswordValid,
      confirmPasswordValid: isConfirmPassword,
    }, this.validateForm);
  }

  /**
   * @returns {HTMLElement} login
   */
  showLogin() {
    this.toggleSignupModal();
  }

  /**
   * @returns {object} state
   */
  validateForm() {
    const {
      emailValid, firstnameValid, lastnameValid, usernameValid, passwordValid, confirmPasswordValid
    } = this.state;
    if (
      firstnameValid
      && lastnameValid
      && usernameValid
      && emailValid
      && passwordValid
      && confirmPasswordValid
    ) {
      this.setState({ formValid: true });
    }
  }

  /**
   * @returns {HTMLElement} home
   */
  // redirect() {
  //   const { history } = this.props;
  //   history.push('/');
  // }

  /**
   * @description sign up form
   * @returns {object} sign up object
   */
  render() {
    const { formErrors, formValid } = this.state;
    const { showSignup, toggleSignupModal, toggleLoginModal } = this.props;
    return (
      <Modal
        customClass="ah_signup"
        modalHeader="SIGN UP"
        showModal={showSignup}
        onClose={toggleSignupModal}
      >
        <div className="ah_signup__body">
          <p className="login_body_required_text">*(Required fields)</p>
          <form className="ah_signup__form" onSubmit={this.onSubmit}>
            <div className="ah_signup__form__input">
              <InputField
                customClass="ah_signup__form__input--signup firstname"
                placeHolder="Enter Firstname"
                onChange={this.onInputChange}
                inputType="text"
                inputName="firstname"
                required
                showRequiredAsterisk
              />
              <span className="error">{formErrors.firstname}</span>
            </div>
            <div className="ah_signup__form__input">
              <InputField
                customClass="ah_signup__form__input--signup"
                placeHolder="Enter Lastname"
                onChange={this.onInputChange}
                inputType="text"
                inputName="lastname"
                required
                showRequiredAsterisk
              />
              <span className="error">{formErrors.lastname}</span>
            </div>
            <div className="ah_signup__form__input">
              <InputField
                customClass="ah_signup__form__input--signup"
                placeHolder="Enter Username"
                onChange={this.onInputChange}
                inputType="text"
                inputName="username"
                required
                showRequiredAsterisk
              />
              <span className="error">{formErrors.username}</span>
            </div>
            <div className="ah_signup__form__input">
              <InputField
                customClass="ah_signup__form__input--signup"
                placeHolder="Enter Email"
                onChange={this.onInputChange}
                inputType="text"
                inputName="email"
                required
                showRequiredAsterisk
              />
              <span className="error">{formErrors.email}</span>
            </div>
            <div className="ah_signup__form__input">
              <InputField
                customClass="ah_signup__form__input--signup"
                placeHolder="Enter Password"
                onChange={this.onInputChange}
                inputType="password"
                inputName="password"
                required
                showRequiredAsterisk
              />
              <span className="error">{formErrors.password}</span>
            </div>
            <div className="ah_signup__form__input">
              <InputField
                customClass="ah_signup__form__input--signup"
                placeHolder="Confirm Password"
                onChange={this.onInputChange}
                inputType="password"
                inputName="confirmPassword"
                required
                showRequiredAsterisk
              />
              <span className="error">{formErrors.confirmPassword}</span>
            </div>
            <div className="ah_signup__form__wrapper">
              <Button
                customClass="ah_signup__form__button"
                btnText="Sign Up"
                // onClick={this.onSubmit}
                btnType="submit"
                isDisabled={!formValid}
              />
            </div>
          </form>
          <div>
            <p className="ah_signup__has-account">
              Already have an account?
              <button type="button" onClick={toggleLoginModal} className="ah_signup__has-account--link hasAccount"> Login Here</button>
            </p>
          </div>
          <div>
            <img src={or} alt="" className="ah_signup__or-tag" />
          </div>
          <div className="ah_signup__social">
            <Button
              customClass="ah_signup__social__facebook"
              imgSrc={faceBookLogo}
              btnText="Sign in with Facebook"
              onClick={this.onClick}
            />
            <Button
              customClass="ah_signup__social__twitter"
              imgSrc={twitterLogo}
              btnText="Sign in with Twitter"
              onClick={this.onClick}
            />
            <Button
              customClass="ah_signup__social__google"
              imgSrc={googleLogo}
              btnText="Sign in with Google+"
              onClick={this.onClick}
            />
          </div>
          <div className="ah_signup__social--small">
            <Button
              customClass="ah_signup__social__facebook"
              imgSrc={faceBookLogo}
              btnText=""
              onClick={this.onClick}
            />
            <Button
              customClass="ah_signup__social__twitter"
              imgSrc={twitterLogo}
              imgCustomClass="ah_signup__social__img"
              btnText=""
              onClick={this.onClick}
            />
            <Button
              customClass="ah_signup__social__google"
              imgSrc={googleLogo}
              btnText=""
              onClick={this.onClick}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

SignUp.propTypes = {
  showSignup: bool.isRequired,
  toggleSignupModal: func.isRequired,
  toggleLoginModal: func.isRequired,
  toggleVerify: func.isRequired,
  signUp: func.isRequired,
};


/**
 * @description pass state to props
 * @param {*} state
 * @returns {object} state
 */
export function mapStateToProps(state) {
  return { state };
}

/**
 * @param {object} dispatch
 * @returns {promise} user
 */
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp: signUpUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

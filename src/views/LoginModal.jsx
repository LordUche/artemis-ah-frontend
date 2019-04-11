import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  bool, func, objectOf, object
} from 'prop-types';
import { Redirect } from 'react-router-dom';

// Components
import Modal from '../components/Modal';
import Button from '../components/Button';
import InputField from '../components/InputField';

// Images
import faceBookLogo from '../assets/img/facebooklogo.svg';
import twitterLogo from '../assets/img/twitterlogo.svg';
import googleLogo from '../assets/img/googlelogo.svg';

// Actions
import { loginUserAction, loadingAuthAction, clearAuthErrorAction } from '../redux/actions/authActions';

/**
 * @description loginmodal
 * @param {object} e event object
 * @returns {HTMLDivElement} login modal
 */
export class LoginModal extends Component {
    state = {
      name: '',
      password: '',
      rememberMe: false
    }

    clearErrors = () => {
      const { clearAuthError, errorMessages } = this.props;
      if (errorMessages.errors) {
        clearAuthError();
      }
    }

    componentWillMount = () => {
      this.clearErrors();
    }

    handleInputChange = (e) => {
      this.clearErrors();
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const {
        loginUser, loadingAuth
      } = this.props;
      loadingAuth();
      loginUser(this.state);
    }

    doNothing = () => ({ message: 'Processing Request' })

    handleErrorMessages = () => {
      const {
        errorMessages
      } = this.props;
      return errorMessages.errors ? {
        nameError: errorMessages.errors.name ? errorMessages.errors.name[0] : '',
        passwordError: errorMessages.errors.password ? errorMessages.errors.password[0] : '',
        generalError: errorMessages.errors.general || '',
      } : {
        nameError: '',
        passwordError: '',
        generalError: ''
      };
    };

  /**
   * @returns {HTMLElement} div
   */
    render() {
      const {
        state, doNothing, handleSubmit, handleInputChange, handleErrorMessages
      } = this;
      const { rememberMe } = state;
      const {
        toggleLoginModal, toggleSignupModal, showLoginModal, isLoggedIn, loading
      } = this.props;
      const { nameError, passwordError, generalError } = handleErrorMessages();
      return isLoggedIn ? <Redirect to="/profile" /> : (
        <Modal
          customClass="login_body_modal"
          modalHeader="Login"
          showModal={showLoginModal}
          onClose={toggleLoginModal}
        >
          <div className="login_body">
            <p className="login_body_required_text">*(Required fields)</p>
            <section className="login_body_info">
              <section className="login_body_socials">
                <Button
                  btnText="Sign in with Facebook"
                  customClass="login_body_socials_btn login_body_socials_facebook"
                  imgSrc={faceBookLogo}
                  imgAltText="facebook logo"
                  imgCustomClass="login_body_socials_btn_img"
                  onClick={doNothing}
                />
                <Button
                  btnText="Sign in with Twitter"
                  customClass="login_body_socials_btn login_body_socials_twitter"
                  imgSrc={twitterLogo}
                  imgAltText="twitter logo"
                  imgCustomClass="login_body_socials_btn_img"
                  onClick={doNothing}
                />
                <Button
                  btnText="Sign in with Google"
                  customClass="login_body_socials_btn login_body_socials_google"
                  imgSrc={googleLogo}
                  imgAltText="google logo"
                  imgCustomClass="login_body_socials_btn_img"
                  onClick={doNothing}
                />
              </section>
              <section className="login_body_socials_responsive">
                <p className="login_body_socials_responsive_text">Sign in with</p>
                <Button
                  btnText=""
                  customClass="login_body_socials_btn login_body_socials_facebook"
                  imgSrc={faceBookLogo}
                  imgAltText="facebook logo"
                  imgCustomClass="login_body_socials_responsive_btn_img"
                  onClick={doNothing}
                />
                <Button
                  btnText=""
                  customClass="login_body_socials_btn login_body_socials_twitter"
                  imgSrc={twitterLogo}
                  imgAltText="twitter logo"
                  imgCustomClass="login_body_socials_responsive_btn_img"
                  onClick={doNothing}
                />
                <Button
                  btnText=""
                  customClass="login_body_socials_btn login_body_socials_google"
                  imgSrc={googleLogo}
                  imgAltText="google logo"
                  imgCustomClass="login_body_socials_responsive_btn_img"
                  onClick={doNothing}
                />
              </section>
              <section className="login_body_divider">
                <hr className="login_body_divider_line" />
                <span className="login_body_divider_span">OR</span>
              </section>
              <form className="login_body_form" id="loginForm" onSubmit={loading ? doNothing : handleSubmit}>
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
                {nameError && <p className="login_body_form_error login_body_form_error_name">{nameError}</p>}
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
                <Button customClass="login_body_form_submit_btn" btnText="Login" isDisabled={loading} btnType="submit" />
                <div className="login_body_form_links">
                  <button type="button" onClick={toggleSignupModal} className="login_body_form_link hasAccount">Register now</button>
                  <a href="/" className="login_body_form_link">Forgot password?</a>
                </div>
              </form>
            </section>
          </div>
        </Modal>
      );
    }
}

/**
 * @description function to map dispatch to component as props
 * @param {object} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser: loginUserAction,
  loadingAuth: loadingAuthAction,
  clearAuthError: clearAuthErrorAction
}, dispatch);

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
  toggleLoginModal: func.isRequired,
  toggleSignupModal: func.isRequired,
  showLoginModal: bool.isRequired,
  loginUser: func.isRequired,
  loadingAuth: func.isRequired,
  clearAuthError: func.isRequired,
  loading: bool.isRequired,
  isLoggedIn: bool.isRequired,
  errorMessages: objectOf(object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

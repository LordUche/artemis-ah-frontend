import React, { Component } from 'react';
import { patch } from 'axios';
import TopNavBar from '../components/TopNav';
import Footer from '../components/Footer';
import Button from '../components/Button';
import InputField from '../components/InputField';
import BASE_URL from '../redux/actions/index';

/**
 * @description ResetPasswordPage view page method
 * @returns {HTMLDivElement} profile
 * @param {object} e event object
 */
class ResetPassword extends Component {
  state = {
    newPassword: '',
    confirmPassword: '',
    message: '',
    fetching: false
  }

  /**
 * @param {object} str event object
 * @returns {object} state
 */
  handleChange = str => (e) => {
    this.setState({ [str]: e.currentTarget.value });
  }

  handleSubmit = async (e) => {
    this.setState({ fetching: true });
    e.preventDefault();
    const params = new URLSearchParams(document.location.search.substring(1));
    const email = params.get('email');
    const hash = params.get('hash');
    const { newPassword, confirmPassword } = this.state;
    try {
      const response = await patch(`${BASE_URL}/users/reset-password?email=${email}&hash=${hash}`, {
        newPassword,
        confirmPassword
      });
      const { message } = response.data;
      this.setState({ message, fetching: false });
    } catch (error) {
      this.setState({ fetching: false });
      const { data } = error.response;
      if (data.errors) {
        this.setState({
          message: data.errors.newPassword[0]
        });
      } else {
        this.setState({
          message: data.message
        });
      }
    }
  }

  /**
   * @returns {HTMLElement} div
   */
  render() {
    const { message, fetching } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <TopNavBar />
        <section className="reset_body">
          <div className="reset_body_content">
            <p className="reset_body_reset_header">Reset Password</p>
            <form onSubmit={handleSubmit}>
              <InputField
                placeHolder="New Password"
                showRequiredAsterisk
                required
                inputType="password"
                customClass="reset_body_reset_input"
                inputName="newPassword"
                data-testid="newPassword"
                onChange={handleChange('newPassword')}
              />
              <br />
              <InputField
                placeHolder="Re-enter new Password"
                showRequiredAsterisk
                required
                inputType="password"
                customClass="reset_body_reset_input"
                inputName="confirmPassword"
                data-testid="confirmPassword"
                onChange={handleChange('confirmPassword')}
              />
              <br />
              <p className="reset_body_response_text">{ message }</p>
              <Button
                customClass="reset_body_btn_save"
                btnText="Save"
                isDisabled={fetching}
                btnType="submit"
              />
            </form>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default ResetPassword;

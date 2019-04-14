/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';

// Components
import { func, bool, string } from 'prop-types';
import Modal from '../components/Modal';
import SignUpBody from '../components/signUp';

/**
 * @description SignUp view
 * @returns {HTMLElement} view modal
 */
const SignUpView = ({
  toggleSignUpModal,
  signedUp,
  email,
  revealLoginModal
}) => (
  <Modal
    customClass="ah_signup"
    modalHeader={signedUp ? 'EMAIL VERIFICATION' : 'SIGNUP'}
    onClose={toggleSignUpModal}
  >
    <SignUpBody
      revealLoginModal={revealLoginModal}
      signedUp={signedUp}
      email={email}
    />
  </Modal>
);

SignUpView.propTypes = {
  revealLoginModal: func.isRequired,
  toggleSignUpModal: func.isRequired,
  signedUp: bool.isRequired,
  email: string.isRequired
};

export default SignUpView;

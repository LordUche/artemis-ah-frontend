/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import { func, bool, string } from 'prop-types';
import Modal from './Modal';
import message from '../assets/img/message.png';


/**
 * @description Verify email component
 * @returns {HTMLElement} VerifyModal
 */
export const VerifyModal = ({
  toggleVerify, showVerify, user
}) => {
  return (
    <Modal
      customClass="verify__modal"
      modalHeader="EMAIL VERIFICATION"
      onClose={toggleVerify}
      showModal={showVerify}
    >
      <div>
        <strong><p className="verification__text">One more step for you, One giant leap for readers everywhere!</p></strong>
        <div>
          <img src={message} className="verification__image" alt="verify" />
        </div>
        <p className="verification__text">
          <span>Verification email has been sent to </span>
          <strong>{user.email}</strong>
          .
        </p>
        <p className="verification__text">Please check your inbox and verify your email to begin writing awesome articles!</p>
      </div>
    </Modal>
  );
};


/**
 * @param {object} state
 * @returns {object} state
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth
  };
}

VerifyModal.propTypes = {
  toggleVerify: func.isRequired,
  showVerify: bool.isRequired,
  user: string.isRequired,
};

export default connect(mapStateToProps)(VerifyModal);

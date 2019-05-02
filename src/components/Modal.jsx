import React from 'react';
import {
  string, func, node, bool
} from 'prop-types';

/**
 * @description reusable modal component
 * @returns {HTMLDivElement} modal div
 */
const Modal = ({
  onClose, modalHeader, customClass, children, showLogo
}) => (
  <div className="ah_modal_backdrop_wrapper">
    <div
      className="ah_modal_backdrop"
      onClick={onClose}
      onKeyPress={onClose}
      role="button"
      tabIndex="0"
    />
    <div className={`ah_modal ${customClass}`}>
      <button id="ah-modal-close" type="button" className="ah_modal_close" onClick={onClose}>
        &times;
      </button>
      <header className="ah_modal_header">
        {showLogo && (
          <img
            src="https://res.cloudinary.com/artemisah/image/upload/v1554320883/authorshaven/AH_logo_white.png"
            className="ah_modal_header_img"
            alt="authors haven logo"
          />
        )}
        <h2 className="ah_modal_header_text">{modalHeader}</h2>
      </header>
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  /**
   * The custom class containing extra styles for the modal
   */
  customClass: string,
  /**
   * The inner html to be rendered in the modal
   */
  children: node.isRequired,
  /**
   * The function to be fired on close
   */
  onClose: func.isRequired,
  /**
   * The modal's header
   */
  modalHeader: string.isRequired,
  /**
   * The modal's header logo Id
   */
  showLogo: bool
};

Modal.defaultProps = {
  customClass: '',
  showLogo: true
};

export default Modal;

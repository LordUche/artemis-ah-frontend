import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description reusable modal component
 * @returns {HTMLDivElement} modal div
 */
const Modal = ({
  onClose, modalHeader, customClass, children
}) => (
  <div className="ah_modal_backdrop_wrapper">
    <div className="ah_modal_backdrop" onClick={onClose} onKeyPress={onClose} role="button" tabIndex="0" />
    <div className={`ah_modal ${customClass}`}>
      <button type="button" className="ah_modal_close" onClick={onClose}>X</button>
      <header className="ah_modal_header">
        <img src="https://res.cloudinary.com/artemisah/image/upload/v1554320883/authorshaven/AH_logo_white.png" className="ah_modal_header_img" alt="authors haven logo" />
        <h2 className="ah_modal_header_text">
          {modalHeader}
        </h2>
      </header>
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  /**
   * The custom class containing extra styles for the modal
   */
  customClass: PropTypes.string,
  /**
   * The inner html to be rendered in the modal
   */
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
  /**
   * The function to be fired on close
   */
  onClose: PropTypes.func.isRequired,
  /**
   * The modal's header
   */
  modalHeader: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  customClass: '',
};

export default Modal;

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description reusable button component
 * @returns {HTMLButtonElement} button
 */
const Button = ({
  btnText, onClick, customClass, imgSrc, imgCustomClass, imgAltText
}) => (
  <button type="button" onClick={onClick} className={`ah-btn ${customClass}`}>
    {imgSrc && (
    <img
      src={imgSrc}
      className={imgCustomClass}
      alt={imgAltText || `${btnText} Image`}
    />
    )}
    {btnText}
  </button>
);

Button.propTypes = {
  /**
   * The custom class containing extra styles for the button
   */
  customClass: PropTypes.string,
  /**
   * The source for the image on the button if any
   */
  imgSrc: PropTypes.string,
  /**
   * Custom class with extra styles for the image
   */
  imgCustomClass: PropTypes.string,
  /**
   * Alt text for the image
   */
  imgAltText: PropTypes.string,
  /**
   * Text to be dispayed on the button
   */
  btnText: PropTypes.string.isRequired,
  /**
   * Function to be fired when clicked
   */
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  customClass: '',
  imgSrc: '',
  imgCustomClass: '',
  imgAltText: '',
};

export default Button;

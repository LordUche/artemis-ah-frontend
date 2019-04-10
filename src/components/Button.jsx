import React from 'react';
import { func, string, bool } from 'prop-types';

/**
 * @description reusable button component
 * @returns {HTMLButtonElement} button
 */
const Button = ({
  btnText, onClick, customClass, imgSrc, imgCustomClass, imgAltText, isDisabled, btnType
}) => (
  // eslint-disable-next-line react/button-has-type
  <button type={btnType} onClick={onClick} className={`ah-btn ${customClass}`} disabled={isDisabled}>
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
  customClass: string,
  /**
   * The source for the image on the button if any
   */
  imgSrc: string,
  /**
   * Custom class with extra styles for the image
   */
  imgCustomClass: string,
  /**
   * Alt text for the image
   */
  imgAltText: string,
  /**
   * Text to be dispayed on the button
   */
  btnText: string.isRequired,
  /**
   * Function to be fired when clicked
   */
  onClick: func.isRequired,
  /**
   * Disable and enable button
   */
  isDisabled: bool,
  /**
   * button type
   */
  btnType: string,
};

Button.defaultProps = {
  customClass: '',
  imgSrc: '',
  imgCustomClass: '',
  imgAltText: '',
  isDisabled: false,
  btnType: 'text'
};

export default Button;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// <InputField customClass="hfhf" />


/**
 * @description reusable input component
 * @returns {HTMLInputElement} input
 */
const InputField = ({
  customClass, placeHolder, required, inputType, inputName, onChange, showRequiredAsterisk
}) => (
  <Fragment>
    {showRequiredAsterisk && <span className="ah-input-required-asterisk">*</span>}
    { required && (
    <input
      type={inputType}
      className={`ah-input ${customClass}`}
      placeholder={placeHolder}
      onChange={onChange}
      name={inputName}
      required
    />
    )}
    { !required && (
    <input
      type={inputType}
      className={`ah-input ${customClass}`}
      placeholder={placeHolder}
      onChange={onChange}
      name={inputName}
    />
    )}
  </Fragment>
);

InputField.propTypes = {
  customClass: PropTypes.string,
  placeHolder: PropTypes.string,
  required: PropTypes.bool,
  showRequiredAsterisk: PropTypes.bool,
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputField.defaultProps = {
  customClass: '',
  placeHolder: '',
  required: false,
  inputType: 'text',
  inputName: '',
  showRequiredAsterisk: false,
};

export default InputField;

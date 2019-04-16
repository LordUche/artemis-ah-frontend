import React, { Fragment } from 'react';
import { func, string, bool } from 'prop-types';

/**
 * @description reusable input component
 * @returns {HTMLInputElement} input
 */
const InputField = ({
  customClass,
  minLength,
  maxLength,
  placeHolder,
  required,
  inputType,
  inputName,
  onChange,
  showRequiredAsterisk
}) => (
  <Fragment>
    {showRequiredAsterisk && (
      <span className="ah-input-required-asterisk">*</span>
    )}
    {required && (
      <input
        type={inputType}
        className={`ah-input ${customClass}`}
        placeholder={placeHolder}
        onChange={onChange}
        name={inputName}
        required
        minLength={minLength}
        maxLength={maxLength}
      />
    )}
    {!required && (
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
  customClass: string,
  placeHolder: string,
  required: bool,
  showRequiredAsterisk: bool,
  inputType: string,
  inputName: string,
  onChange: func.isRequired,
  minLength: string,
  maxLength: string
};

InputField.defaultProps = {
  customClass: '',
  placeHolder: '',
  required: false,
  inputType: 'text',
  inputName: '',
  showRequiredAsterisk: false,
  minLength: '',
  maxLength: ''
};

export default InputField;

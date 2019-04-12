import React from 'react';
import { func as funcProp } from 'prop-types';
import Button from './Button';
import '../assets/scss/components/PageContentLoadError.scss';

/**
 * @param {function} onRetry Callback function fired when onRetry is clicked.
 * @returns {HtmlDivElement} The error component.
 */
const ErrorComponent = ({ onRetry }) => (
  <div className="page-content-load-error">
    <div className="page-content-load-error__icon"><i className="fa fa-cloud" /></div>
    <div className="page-content-load-error__title">Oops! Something went wrong. Please try again.</div>
    <div className="page-content-load-error__btn-area">
      <Button btnText="Retry" onClick={onRetry} />
    </div>
  </div>
);

ErrorComponent.propTypes = {
  onRetry: funcProp.isRequired,
};

export default ErrorComponent;

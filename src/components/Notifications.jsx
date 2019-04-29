import React from 'react';
import { string } from 'prop-types';

/**
 * @description Notifications component
 * @param {object} props
 * @returns {JSX} JSX
 */
const Notifications = (props) => {
  const {
    message, title, type, url
  } = props;
  return (
    <div
      onClick={() => window.location.assign(`/article${url}`)}
      className="notifications-div-item"
      role="presentation"
    >
      <p className="notifications-div-item-info">
        <span className="notifications-div-item-info-name">{`${title}`}</span>
        <br />
        {message}
      </p>
      <span className="notifications-div-item-time">
        {`New ${type}`.replace(/article.published/g, 'Article')}
      </span>
    </div>
  );
};

Notifications.propTypes = {
  message: string,
  title: string,
  type: string,
  url: string
};

Notifications.defaultProps = {
  message: '',
  title: '',
  type: '',
  url: ''
};

export default Notifications;

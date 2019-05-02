import React from 'react';
import { string } from 'prop-types';
import moment from 'moment';

/**
 * @description Notifications component
 * @param {object} props
 * @returns {JSX} JSX
 */
const Notifications = (props) => {
  const {
    message, title, time, url
  } = props;
  return (
    <div
      onClick={() => {
        window.location.assign(`/article${url}`);
      }}
      className="notifications-div-item"
      role="presentation"
    >
      <p className="notifications-div-item-info">
        <span className="notifications-div-item-info-name">{`${title}`.slice(0, 30)}</span>
        <br />
        {`${message}`.slice(0, 50)}
      </p>
      <span className="notifications-div-item-time">{`${moment(time).format('lll')}`}</span>
    </div>
  );
};

Notifications.propTypes = {
  message: string,
  title: string,
  time: string,
  url: string
};

Notifications.defaultProps = {
  message: '',
  title: '',
  time: '',
  url: ''
};

export default Notifications;

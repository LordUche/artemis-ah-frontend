import React from 'react';
import { Link } from 'react-router-dom';
import { string, func } from 'prop-types';

/**
 * @description Notifications component
 * @param {object} props
 * @returns {JSX} JSX
 */
const Notifications = (props) => {
  const {
    message, title, type, url, onClick
  } = props;
  return (
    <div
      className="notifications-div-wrapper"
      id="notifications-wrapper"
      role="presentation"
      onClick={onClick}
    >
      <div id="notify-div-wrapper">
        <i className="fas fa-caret-up" id="notification-triangle" />
        <div className="notifications-div" id="notifications-div">
          <Link to={`/article${url}`} className="notifications-div-item">
            <p className="notifications-div-item-info">
              <span className="notifications-div-item-info-name">
                {`${String(title).slice(0, 30)}...`}
              </span>
              <br />
              {`${String(message).slice(0, 30)}...`}
            </p>
            <span className="notifications-div-item-time">{`${type} notification`}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  message: string,
  title: string,
  type: string,
  url: string,
  onClick: func.isRequired
};

Notifications.defaultProps = {
  message: '',
  title: '',
  type: '',
  url: ''
};

export default Notifications;

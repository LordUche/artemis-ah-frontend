import React from 'react';
import { string as stringProp } from 'prop-types';
import { Link } from 'react-router-dom';
import '../assets/scss/components/UserListItem.scss';

/**
 * @param {string} pictureUrl - The URL to the user's profile picture.
 * @param {string} fullname - The fullname of the user.
 * @param {string} username - The username of the user
 * @param {string} about - The short bio of the user.
 * @returns {Node} The list item for the user.
 */
const UserListItem = ({
  pictureUrl,
  fullname,
  username,
  about,
}) => (
  <div className="user-list-item">
    <div className="user-list-item__inner">
      <img src={pictureUrl} alt={fullname} />
      <div className="user-list-item__inner__details_wrapper">
        <div className="user-list-item__inner__details_wrapper__fullname"><Link to="/profile">{fullname}</Link></div>
        <div className="user-list-item__inner__details_wrapper__username"><Link to={`/profile/${username}`}>{`@${username}`}</Link></div>
        <div className="user-list-item__inner__details_wrapper__about">{about}</div>
      </div>
    </div>
  </div>
);

UserListItem.propTypes = {
  pictureUrl: stringProp.isRequired,
  fullname: stringProp.isRequired,
  username: stringProp.isRequired,
  about: stringProp.isRequired,
};

export default UserListItem;

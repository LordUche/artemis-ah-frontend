import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * @description top nav
 * @param {object} props
 * @returns {JSX} top nav
 */
const UserNavAvatar = (props) => {
  const {
    username, imgSrc, customImageClassName, customLinkClassName
  } = props;
  return (
    <NavLink to="/profile" className={customLinkClassName}>
      <img src={imgSrc} alt="profile avatar" className={customImageClassName} />
      &nbsp;
      {username}
      &nbsp;
      <i className="fas fa-angle-down" />
    </NavLink>
  );
};

UserNavAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  customLinkClassName: PropTypes.string,
  customImageClassName: PropTypes.string
};

UserNavAvatar.defaultProps = {
  customImageClassName: 'default-avatar-class',
  imgSrc:
    'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png',
  customLinkClassName: ''
};

export default UserNavAvatar;

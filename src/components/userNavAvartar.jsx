import React from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';

// Components
import NavDropdown from './NavDropdown';

// Actions
import { logoutUserAction } from '../redux/actions/authActions';

/**
 * @description top nav
 * @param {object} props
 * @returns {JSX} top nav
 */
export const UserNavAvatar = (props) => {
  const {
    username, imgSrc, customImageClassName, customLinkClassName, dispatch
  } = props;
  return (
    <div to="/profile" className={customLinkClassName}>
      <img src={imgSrc} alt="profile avatar" className={customImageClassName} />
      &nbsp;
      <NavDropdown parentLinkName={username} icon="angle-down">
        <li>
          <span className="link_lookalike" onClick={() => window.location.assign('/profile')} role="presentation">
            <i className="fas fa-user" />
          Profile
          </span>
        </li>
        <li>
          <span className="link_lookalike" onClick={() => logoutUserAction(dispatch)} role="presentation">
            <i className="fas fa-sign-out-alt" />
          Logout
          </span>
        </li>
      </NavDropdown>
    </div>
  );
};

UserNavAvatar.propTypes = {
  username: string,
  imgSrc: string,
  customLinkClassName: string,
  customImageClassName: string,
  dispatch: func.isRequired
};

UserNavAvatar.defaultProps = {
  username: 'AH',
  customImageClassName: 'default-avatar-class',
  imgSrc:
    'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png',
  customLinkClassName: ''
};

export default connect(null, null)(UserNavAvatar);

import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @description top nav site logo
 * @param {object} props - properties of Logo
 * @returns {JSX} logo
 */
const Logo = (props) => {
  const { containerCustomClass, linkCustomClass, logoCustomClass } = props;
  return (
    <div className={containerCustomClass}>
      <Link to="/" className={linkCustomClass}>
        <img
          src="https://res.cloudinary.com/artemisah/image/upload/v1554320883/authorshaven/AH_logo_white.png"
          alt="ah-logo-white"
          className={logoCustomClass}
        />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  containerCustomClass: string,
  linkCustomClass: string,
  logoCustomClass: string
};

Logo.defaultProps = {
  containerCustomClass: 'defaultContainerClass',
  linkCustomClass: 'defaultLinkClass',
  logoCustomClass: 'defaultLogoClass'
};

export default Logo;

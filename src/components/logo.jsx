import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Default Style for logo container
const logoContainerDefaultStyle = {
  padding: '20px',
  background: '#5863F8',
  display: 'inline-block'
};

// Default Style for logo
const logoDefaultStyle = {
  width: '50px'
};

// Default Style for for links and NavLinks
export const linkDefaultStyle = {
  display: 'flex',
  alignItems: 'center'
};

/**
 * @description top nav site logo
 * @param {object} props - properties of Logo
 * @returns {JSX} logo
 */
const Logo = (props) => {
  const { logoContainerStyle, logoStyle } = props;
  return (
    <div style={{ ...logoContainerDefaultStyle, ...logoContainerStyle }}>
      <Link to="/" style={linkDefaultStyle}>
        <img
          src="https://res.cloudinary.com/artemisah/image/upload/v1554320883/authorshaven/AH_logo_white.png"
          alt="ah-logo-white"
          style={{ ...logoDefaultStyle, ...logoStyle }}
        />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  logoContainerStyle: PropTypes.objectOf(Logo),
  logoStyle: PropTypes.objectOf(Logo)
};

Logo.defaultProps = {
  logoContainerStyle: logoContainerDefaultStyle,
  logoStyle: logoDefaultStyle
};

export default Logo;

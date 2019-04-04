import React from 'react';

/**
 * @description Footer - Authors Haven footer component
 * @returns {JSX} - JSX component
 */
const Footer = () => (
  <footer>
    &copy;
    {' '}
    {new Date().getFullYear()}
    {' '}
    Authors Haven
  </footer>
);

export default Footer;

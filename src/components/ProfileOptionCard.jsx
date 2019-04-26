import React from 'react';
import { string, node } from 'prop-types';

/**
 * @description reusable component for all profile option pages
 * @returns {HTMLSelectElement} profile option card
 */
const ProfileOptionCard = ({
  headerText, headerImg, children, customClass
}) => (
  <div className="profile_option_card_wrapper">
    <section className="profile_option_card">
      <div className={`profile_option_card_header ${customClass || ''}`}>
        {headerImg}
        <h3>{headerText}</h3>
      </div>
      {children}
    </section>
  </div>
);

ProfileOptionCard.propTypes = {
  headerText: string.isRequired,
  headerImg: node.isRequired,
  customClass: string,
  children: node
};

ProfileOptionCard.defaultProps = {
  children: '',
  customClass: '',
};

export default ProfileOptionCard;

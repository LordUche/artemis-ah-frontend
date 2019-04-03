import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description profile page view
 * @returns {HTMLDivElement} profile
 */
const ProfilePage = () => (
  <div>
    <header>
        This is your profile page!!
    </header>
    <section>
      <Link to="/">
          Home
      </Link>
    </section>
  </div>
);

export default ProfilePage;

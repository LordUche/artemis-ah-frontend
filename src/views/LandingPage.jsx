import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description landing page
 * @returns {HTMLDivElement} landing page
 */
const LandingPage = () => (
  <div>
    <header>Welcome to Author&apos;s haven frontend</header>
    <section>
      <Link to="profile">Profile</Link>
    </section>
  </div>
);

export default LandingPage;

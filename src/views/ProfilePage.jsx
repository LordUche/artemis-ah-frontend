import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { TopNav, SideNav } from '../components';

/**
 * @description profile page view
 * @returns {HTMLDivElement} profile
 */
const ProfilePage = () => {
  const test = _.times(40, _.constant(<h1>This is your profile page!!</h1>));
  return (
    <div>
      <TopNav />
      <section style={{ textAlign: 'center' }}>
        {test}
        <Link to="/">Home</Link>
      </section>
      <SideNav />
    </div>
  );
};

export default ProfilePage;

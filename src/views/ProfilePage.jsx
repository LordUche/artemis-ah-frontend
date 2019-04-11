import React from 'react';
import { Link } from 'react-router-dom';
import { SideNav } from '../components';
import TopNavBar from '../components/TopNav';

/**
 * @description profile page view
 * @returns {HTMLDivElement} profile
 */
const ProfilePage = () => {
  const test = Array(40)
    .fill(undefined)
    .map((val, index) => {
      const i = index;
      return <h1 key={i}>This is your PROFILE page!!</h1>;
    });
  return (
    <div>
      <TopNavBar />
      <section style={{ textAlign: 'center' }}>
        {test}
        <Link to="/">Home</Link>
      </section>
      <SideNav isLoggedIn />
    </div>
  );
};

export default ProfilePage;

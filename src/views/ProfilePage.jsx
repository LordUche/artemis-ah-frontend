import React from 'react';
import { Link } from 'react-router-dom';
import { TopNav, SideNav } from '../components';
/**
 * @description profile page view
 * @returns {HTMLDivElement} profile
 */
const ProfilePage = () => (
  <div>
    <TopNav />
    <section style={{ padding: '20px 210px' }}>
      <h1>This is your profile page!!</h1>
      <Link to="/">Home</Link>
    </section>
    <SideNav />
  </div>
);

export default ProfilePage;

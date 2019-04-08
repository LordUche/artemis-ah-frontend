import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { TopNav, SideNav } from '../components';
/**
 * @description setttings page view method
 * @returns {HTMLDivElement} profile
 */
const Settings = () => {
  const test = _.times(40, _.constant(<h1>This is your Settings page!!</h1>));
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

export default Settings;

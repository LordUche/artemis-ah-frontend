import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { TopNav, SideNav } from '../components';
/**
 * @description bookmark view page method
 * @returns {HTMLDivElement} profile
 */
const Bookmark = () => {
  const test = _.times(40, _.constant(<h1>This is your BOOKMARK page!!</h1>));
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

export default Bookmark;

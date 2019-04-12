import React from 'react';
import { Link } from 'react-router-dom';
import { SideNav } from '../components';
import TopNavBar from '../components/TopNav';
/**
 * @description bookmark view page method
 * @returns {HTMLDivElement} profile
 */
const Bookmark = () => {
  const test = Array(40)
    .fill(undefined)
    .map((val, index) => {
      const i = index;
      return <h1 key={i}>This is your BOOKMARK page!!</h1>;
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

export default Bookmark;

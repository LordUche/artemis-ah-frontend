import React from 'react';
import { Link } from 'react-router-dom';
import { TopNav, SideNav } from '../components';

/**
 * @description Reading stats view
 * @returns {HTMLDivElement} profile
 */
const ReadingStats = () => {
  const test = Array(40)
    .fill(undefined)
    .map((val, index) => {
      const i = index;
      return <h1 key={i}>This is your ReadingStats page!!</h1>;
    });
  return (
    <div>
      <TopNav />
      <section
        style={{
          textAlign: 'center'
        }}
      >
        {test}
        <Link to="/">Home</Link>
      </section>
      <SideNav />
    </div>
  );
};

export default ReadingStats;

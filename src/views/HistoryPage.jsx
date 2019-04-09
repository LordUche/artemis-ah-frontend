import React from 'react';
import { Link } from 'react-router-dom';
import { TopNav, SideNav } from '../components';
/**
 * @description history page view method
 * @returns {HTMLDivElement} profile
 */
const History = () => {
  const test = Array(40)
    .fill(undefined)
    .map((val, index) => {
      const i = index;
      return <h1 key={i}>This is your History page!!</h1>;
    });
  return (
    <div>
      <TopNav />
      <section style={{ textAlign: 'center' }}>
        <h1>This is your History page!!</h1>
        {test}
        <Link to="/">Home</Link>
      </section>
      <SideNav />
    </div>
  );
};

export default History;

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description FeaturedCategories - Featured categories component for Landing Page view
 * @returns {JSX} - JSX component
 */
const FeaturedCategories = () => (
  <section className="segment featured">
    <h3 className="segment__title">Featured Categories</h3>
    <p className="segment__text">
      Create and share your story with an amazing community of authors and avid readers.
    </p>
    <div className="featured__articles">
      <div className="featured__card">
        <span className="category">Technology</span>
        <span className="title">Top recipes to making amazing sandwiches.</span>
      </div>
      <div className="featured__card">
        <span className="category">Technology</span>
        <span className="title">Top recipes to making amazing sandwiches.</span>
      </div>
      <div className="featured__card">
        <span className="category">Technology</span>
        <span className="title">Top recipes to making amazing sandwiches.</span>
      </div>
      <div className="featured__card">
        <span className="category">Technology</span>
        <span className="title">Top recipes to making amazing sandwiches.</span>
      </div>
    </div>
    <Link to="./explore" className="btn">
      Explore Stories
      {' '}
      <i className="fas fa-angle-right" />
    </Link>
  </section>
);

export default FeaturedCategories;

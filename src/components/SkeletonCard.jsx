import React from 'react';

/**
 * @method SkeletonCard
 * @description Skeleton loader for article card
 * @returns {undefined}
 */
const SkeletonCard = () => (
  <div className="featured__card skeleton-fade">
    <span className="category" />
    <span className="title" />
  </div>
);

export default SkeletonCard;

import React from 'react';
import '../assets/scss/skeletonscreens/ArticleItem.scss';

export default () => (
  <div className="article-item-skeleton-screen">
    <div className="article-item-skeleton-screen__cover" />
    <div className="article-item-skeleton-screen__data">
      <div className="article-item-skeleton-screen__data__title" />
      <div className="article-item-skeleton-screen__data__author" />
      <div className="article-item-skeleton-screen__data__description">
        <div className="article-item-skeleton-screen__data__description__line1" />
        <div className="article-item-skeleton-screen__data__description__line2" />
      </div>
    </div>
  </div>
);

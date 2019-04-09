import React from 'react';
import { string as stringProp } from 'prop-types';
import { Link } from 'react-router-dom';
import '../assets/scss/article-item.scss';

/**
 * @description Component for an article list item in a list of articles.
 * @return {HTMLElement} Returns the article list item.
 */
const ArticleItem = ({
  title, description, coverUrl, slug, tag
}) => (
  <div className="article-item">
    <div className="image-wrapper">
      <img src={coverUrl} alt="" />
      <span className="tag">{tag.toUpperCase()}</span>
    </div>
    <div className="body">
      <div className="title"><Link to={`/${slug}`}>{title}</Link></div>
      <div className="description">{description}</div>
    </div>
  </div>
);

ArticleItem.propTypes = {
  title: stringProp.isRequired,
  description: stringProp.isRequired,
  coverUrl: stringProp.isRequired,
  slug: stringProp.isRequired,
  tag: stringProp.isRequired,
};

export default ArticleItem;

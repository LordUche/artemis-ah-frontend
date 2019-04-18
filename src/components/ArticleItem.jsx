import React from 'react';
import { string as stringProp, bool as boolProp } from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @description Component for an article list item in a list of articles.
 * @return {HTMLElement} Returns the article list item.
 */
const ArticleItem = ({
  title, description, coverUrl, slug, tag, rating, readTime, author, showAuthor, userActionClass
}) => (
  <div className="article-item">
    <div className="article-item__image-wrapper">
      <img src={coverUrl} alt="" />
      <span className="tag">{tag.toUpperCase()}</span>
      <div className="stats-wrapper">
        <span>
          <i className="fa fa-star" />
          {' '}
          {rating}
        </span>
        <span className="stats-wrapper__read-time">
          <i className="fa fa-clock" />
          {' '}
          {readTime}
        </span>
      </div>
    </div>
    <div className="article-item__body-wrapper">
      <div className="article-item__body-wrapper__body">
        <div className="article-item__body-wrapper__body__title"><Link to={`/${slug}`}>{title}</Link></div>
        {showAuthor && (
        <div className="article-item__body-wrapper__body__author">
          {'By '}
          <Link to={`/profile/${author}`}>{`@${author}`}</Link>
        </div>
        )}
        <div className="article-item__body-wrapper__body__description">{description}</div>
      </div>
      <div className="article-item__body-wrapper__bottom-links">
        <Link to={`/${slug}`} className="article-item__body-wrapper__bottom-links__read-more">READ FULL ARTICLE &rarr;</Link>
        <div className={`article-item__body-wrapper__bottom-links__user-actions ${userActionClass}`}>
          <Link to="/#/edit" className="article-item__body-wrapper__bottom-links__user-actions__edit"><i className="fa fa-pencil-alt" /></Link>
          <Link to="/#/delete" className="article-item__body-wrapper__bottom-links__user-actions__delete"><i className="fa fa-trash" /></Link>
        </div>
      </div>
    </div>

    <div className="stats-wrapper">
      <span>
        <i className="fa fa-star" />
        {' '}
        {rating}
      </span>
      <span className="stats-wrapper__read-time">
        <i className="fa fa-clock" />
        {' '}
        {readTime}
      </span>
    </div>
  </div>
);

ArticleItem.defaultProps = {
  showAuthor: true,
  userActionClass: ''
};

ArticleItem.propTypes = {
  userActionClass: stringProp,
  showAuthor: boolProp,
  title: stringProp.isRequired,
  description: stringProp.isRequired,
  coverUrl: stringProp.isRequired,
  slug: stringProp.isRequired,
  tag: stringProp.isRequired,
  rating: stringProp.isRequired,
  readTime: stringProp.isRequired,
  author: stringProp.isRequired,
};

export default ArticleItem;

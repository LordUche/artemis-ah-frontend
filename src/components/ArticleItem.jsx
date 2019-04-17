import React from 'react';
import { bindActionCreators } from 'redux';
import { string as stringProp, bool as boolProp, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editArticle, confirmArticleDeleteAction } from '../redux/actions/articleActions';

/**
 * @description Component for an article list item in a list of articles.
 * @return {HTMLElement} Returns the article list item.
 */
export const ArticleItem = ({
  title,
  description,
  coverUrl,
  slug,
  tag,
  body,
  rating,
  readTime,
  author,
  showAuthor,
  modifyArticle,
  push,
  deleteConfirmation
}) => {
  const card = {
    title,
    description,
    coverUrl,
    tag,
    slug,
    body
  };
  return (
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
          <div className="article-item__body-wrapper__body__title">
            <Link to={`/${slug}`}>{title}</Link>
          </div>
          {showAuthor && (
            <div className="article-item__body-wrapper__body__author">
              {'By '}
              <Link to={`/profile/${author}`}>{`@${author}`}</Link>
            </div>
          )}
          <div className="article-item__body-wrapper__body__description">{description}</div>
        </div>
        <div className="article-item__body-wrapper__bottom-links">
          <Link to={`/${slug}`} className="article-item__body-wrapper__bottom-links__read-more">
            READ FULL ARTICLE &rarr;
          </Link>
          <div className="article-item__body-wrapper__bottom-links__user-actions">
            <button
              onClick={() => {
                localStorage.setItem('cardData', JSON.stringify(card));
                modifyArticle(card);
                push('./edit-article');
              }}
              className="article-item__body-wrapper__bottom-links__user-actions__edit"
              type="button"
            >
              <i className="fa fa-pencil-alt" />
            </button>
            <button
              className="article-item__body-wrapper__bottom-links__user-actions__delete"
              onMouseDown={() => {
                localStorage.setItem('deleteSlug', slug);
                deleteConfirmation();
              }}
              type="button"
            >
              <i className="fa fa-trash" />
            </button>
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
};

ArticleItem.defaultProps = {
  showAuthor: true
};

ArticleItem.propTypes = {
  showAuthor: boolProp,
  title: stringProp.isRequired,
  description: stringProp.isRequired,
  coverUrl: stringProp.isRequired,
  slug: stringProp.isRequired,
  tag: stringProp.isRequired,
  rating: stringProp.isRequired,
  readTime: stringProp.isRequired,
  author: stringProp.isRequired,
  body: stringProp.isRequired,
  modifyArticle: func.isRequired,
  push: func.isRequired,
  deleteConfirmation: func.isRequired
};

/**
 * @description function to map dispatch to component as props
 * @param {object} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    modifyArticle: editArticle,
    deleteConfirmation: confirmArticleDeleteAction
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(ArticleItem);

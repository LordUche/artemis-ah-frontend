/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {
  object as objectProp,
  func,
  string,
  bool,
  object,
  objectOf,
  shape,
  number
} from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Highlight from 'react-highlight-pop';

// Components
import TopNavBar from '../components/TopNav';
import Button from '../components/Button';
import CommentsComponent from '../components/Comment';

// Images
import defaultClap from '../assets/img/defaultClap.svg';
import hasClapped from '../assets/img/clap.svg';

// Actions
import {
  gettingArticleAction,
  getArticleAction,
  clearErrorsAction,
  rateArticleAction,
  removeBookmarkAction,
  bookmarkArticleAction,
  articleClapAction
} from '../redux/actions/articleActions';

/**
 * @description article detail view page
 * @param {object} event - Synthetic React Event
 * @returns {HTMLDivElement} profile
 */
export class ArticleDetailPage extends Component {
  state = {
    userRated: false,
    selectedText: 'N/A'
  };

  /**
   * @returns {HTMLElement} div
   */
  componentWillMount = () => {
    const {
      match, getArticle, gettingArticle, token, clearErrors
    } = this.props;
    const { articleSlug } = match.params;
    clearErrors();
    gettingArticle();
    getArticle(articleSlug, token);
  };

  /**
   * @returns {HTMLElement} Returns the button to add to/remove from bookmark
   */
  getBookmarkToggleButton() {
    const {
      articleGotten, token, bookmarkArticle, removeBookmark
    } = this.props;

    return !articleGotten.isBookmarked ? (
      <a
        href="#"
        className="article_detail_bookmark"
        onClick={(e) => {
          bookmarkArticle(articleGotten.slug, token);
          e.preventDefault();
        }}
      >
        <i className="far fa-bookmark article_detail_bookmark_icon" />
        {' '}
        <span>Add to Bookmark</span>
      </a>
    ) : (
      <a
        href="#"
        className="article_detail_bookmark bookmarked"
        onClick={(e) => {
          removeBookmark(articleGotten.slug, token);
          e.preventDefault();
        }}
      >
        <i className="fas fa-bookmark article_detail_bookmark_icon" />
        {' '}
        <span>Remove from Bookmark</span>
      </a>
    );
  }

  closeCommentBox = () => {
    this.setState({ highlighted: false, selectedText: 'N/A' });
  };

  rateArticle = (event) => {
    const { articleGotten, rateArticleFn } = this.props;
    const { slug } = articleGotten;
    const rating = event.target.id;
    this.setState({ userRated: true });
    rateArticleFn(slug, rating);
  };

  userClap = () => {
    const { match, articleClap, token } = this.props;
    const { articleSlug } = match.params;
    articleClap(articleSlug, token);
  };

  /**
   * @returns {HTMLElement} div
   */
  render() {
    const {
      isGetting,
      articleGotten,
      errors,
      isLoggedIn,
      username,
      ratingData,
      match,
      history,
      token
    } = this.props;

    const { userRated, highlighted, selectedText } = this.state;

    const {
      title,
      User,
      Tag,
      body,
      coverUrl,
      createdAt,
      rating,
      readTime,
      clap,
      totalClaps,
      rated
    } = articleGotten;

    const { rating: currentRating } = ratingData;

    // Handle necessary conditions to validate user can rate

    const authorUsername = User && User.username;
    const userOwnsArticle = username === authorUsername;
    const userCanRate = isLoggedIn && !userOwnsArticle;

    const averageRating = Number(currentRating) || Number(rating);
    const userHasRated = rated || userRated;

    const stars = Array(5)
      .fill(undefined)
      .map((val, index) => {
        const i = index;
        const rateValue = index + 1;
        const ratedClass = userHasRated ? 'rated' : '';
        const filled = rateValue <= averageRating && userHasRated ? 'filled' : ratedClass;
        return (
          <i
            role="presentation"
            onClick={!userHasRated ? this.rateArticle : () => {}}
            key={i}
            id={rateValue}
            className={`far fa-star article_detail_rating_star ${filled}`}
          />
        );
      })
      .reverse();

    const skeletonText = Array(10)
      .fill(undefined)
      .map((val, index) => {
        const i = index;
        return <p key={i} />;
      });

    const shareUrl = window.location.href;
    const mailBody = `Checkout this interesting article from AuthorsHaven - ${shareUrl}`;

    return (
      <Fragment>
        <TopNavBar history={history} />
        {errors.message === 'article not found' && <Redirect to="/not-found" />}
        {errors.message === "Can't get Article right now, please try again later" && (
          <p className="article_detail_error">{errors.message}</p>
        )}
        {isGetting && !errors.message && (
          <div className="article_detail article_detail_skeleton">
            <div className="article_detail_header">
              <div className="article_detail_header_img_skeleton" />
              <section className="article_detail_header_info">
                <h2 className="article_detail_header_info_title">
                  This is the title of this article
                </h2>
                <section className="article_detail_header_info_details">
                  <Link to="/" className="article_detail_header_info_details_author">
                    Adaeze Odurukwe
                  </Link>
                  <span className="article_detail_header_info_details_date">
                    10pm on 16th Feb, 2018
                  </span>
                  <span className="article_detail_header_info_details_time">
                    <i className="fa fa-clock article_detail_header_info_details_time_img" />
                    {'< 1 min read'}
                  </span>
                </section>
                <section className="article_detail_header_info_tag">
                  Tag:
                  {' '}
                  <span className="article_detail_header_info_tag_span">Art</span>
                </section>
              </section>
            </div>
            <div className="article_detail_bookmark">
              <i className="far fa-bookmark article_detail_bookmark_icon" />
              <p>Add to Bookmark</p>
            </div>
            <article className="article_detail_body">{skeletonText}</article>
          </div>
        )}
        {!isGetting && !errors.message && articleGotten.User && (
          <div className="article_detail">
            <div className="article_detail_header">
              <img src={coverUrl} alt="article cover" className="article_detail_header_img" />
              <section className="article_detail_header_info">
                <h2 className="article_detail_header_info_title">{title}</h2>
                <section className="article_detail_header_info_details">
                  <Link
                    to={`/profile/${User.username}`}
                    className="article_detail_header_info_details_author"
                  >
                    {(User.firstname || User.lastname)
                      && `${User.firstname || ''} ${User.lastname || ''}`}
                    {!User.firstname && !User.lastname && `${User.username}`}
                  </Link>
                  <span className="article_detail_header_info_details_date">
                    {`${moment(createdAt).format('ha')} on ${moment(createdAt).format(
                      'MMMM Do YYYY'
                    )}`}
                  </span>
                  <span className="article_detail_header_info_details_time">
                    <i className="fa fa-clock article_detail_header_info_details_time_img" />
                    {readTime.text}
                  </span>
                </section>
                <section className="article_detail_header_info_tag">
                  Tag:
                  {' '}
                  <span className="article_detail_header_info_tag_span">{Tag.name}</span>
                </section>
              </section>
            </div>
            {isLoggedIn && this.getBookmarkToggleButton()}
            <article
              className={`article_detail_body ${!isLoggedIn && 'article_detail_body_no_auth'}`}
            >
              {body.split('\n').map(section => (
                <Fragment>
                  <Highlight
                    popoverItems={itemClass => (
                      <span
                        role="presentation"
                        onClick={() => this.setState({ highlighted: true })}
                        className={itemClass}
                      >
                        Comment
                      </span>
                    )}
                    onHighlightPop={(highlightedText) => {
                      this.setState({ selectedText: highlightedText });
                    }}
                  >
                    <article className="article_detail_body_segment">{section}</article>
                  </Highlight>
                  <br />
                </Fragment>
              ))}
            </article>
            <div
              className={`article_detail_rating ${!isLoggedIn && 'article_detail_rating_no_auth'}`}
            >
              {userCanRate && (
                <Fragment>
                  <p>
                    {userHasRated && userCanRate
                      ? 'You have rated this article'
                      : 'How did you enjoy this article?'}
                  </p>
                  <section className="article_detail_rating_stars">{stars}</section>
                </Fragment>
              )}
              {(averageRating !== 0 || userOwnsArticle) && (
                <p className="article_detail_rating_average">
                  Average rating:
                  {' '}
                  <span className="article_detail_rating_average_number">{averageRating}</span>
                </p>
              )}
              {averageRating === 0 && userCanRate && (
                <p className="article_detail_rating_average">This article has not yet been rated</p>
              )}
            </div>
            <aside className="article_detail_aside">
              {isLoggedIn && (
                <div
                  className="article_detail_aside_clap"
                  onClick={this.userClap}
                  role="presentation"
                >
                  {clap ? (
                    <img
                      src={hasClapped}
                      alt="clap icon"
                      className="article_detail_aside_clap_img"
                    />
                  ) : (
                    <img
                      src={defaultClap}
                      alt="clap icon"
                      className="article_detail_aside_clap_img"
                    />
                  )}
                  <p className="article_detail_aside_clap_text">{totalClaps}</p>
                </div>
              )}
              <div
                className={`article_detail_aside_share ${!isLoggedIn
                  && 'article_detail_aside_share_no_auth'}`}
              >
                <p className="article_detail_aside_share_text">Share with</p>
                <Button
                  btnType="button"
                  btnTitle="share via facebook"
                  customClass="article_detail_aside_share_button"
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-square article_detail_aside_share_button_icon article_detail_aside_share_button_facebook" />
                  </a>
                </Button>
                <br />
                <Button
                  btnType="button"
                  btnTitle="share via twitter"
                  customClass="article_detail_aside_share_button"
                >
                  <a
                    href={`https://twitter.com/share?url=${shareUrl}&text=${title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter article_detail_aside_share_button_icon article_detail_aside_share_button_twitter" />
                  </a>
                </Button>
                <Button
                  btnType="button"
                  btnTitle="share via mail"
                  customClass="article_detail_aside_share_button"
                >
                  <a
                    href={`mailto:?Subject=${title}&body=${mailBody}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="far fa-envelope article_detail_aside_share_button_icon article_detail_aside_share_button_envelope" />
                  </a>
                </Button>
              </div>
              {isLoggedIn && (
                <div className="article_detail_aside_report">
                  <i className="fas fa-exclamation-triangle article_detail_aside_report_icon" />
                  <p className="article_detail_aside_report_text">Report</p>
                </div>
              )}
            </aside>
            <div className="article_detail_author">
              <img src={User.image} alt="author" className="article_detail_author_img" />
              <section className="article_detail_author_info">
                <h3 className="article_detail_author_info_name">
                  {(User.firstname || User.lastname)
                    && `${User.firstname || ''} ${User.lastname || ''} `}
                  {!User.firstname && !User.lastname && `${User.username}`}
                </h3>
                <p className="article_detail_author_info_bio">{User.bio}</p>
              </section>
              {isLoggedIn && (
                <Button
                  btnType="button"
                  customClass="article_detail_author_follow_btn"
                  btnText="Follow"
                />
              )}
            </div>
          </div>
        )}
        {!isLoggedIn && <CommentsComponent slug={match.params} isLoggedIn={false} />}
        {isLoggedIn && (
          <CommentsComponent
            highlighted={highlighted}
            slug={match.params}
            isLoggedIn
            token={token}
            closeComment={this.closeCommentBox}
            selectedText={selectedText}
          />
        )}
      </Fragment>
    );
  }
}

ArticleDetailPage.propTypes = {
  match: shape({
    isExact: bool,
    params: object,
    path: string,
    url: string
  }).isRequired,
  token: string,
  getArticle: func.isRequired,
  gettingArticle: func.isRequired,
  clearErrors: func.isRequired,
  errors: objectProp.isRequired,
  articleGotten: shape({
    title: string,
    User: object,
    Tag: object,
    body: string,
    coverUrl: string,
    createdAt: string,
    rating: string,
    readTime: object,
    totalClaps: number,
    id: number
  }),
  isGetting: bool.isRequired,
  isLoggedIn: bool.isRequired,
  articleClap: func.isRequired,
  rateArticleFn: func.isRequired,
  username: string.isRequired,
  ratingData: objectOf.isRequired,
  removeBookmark: func.isRequired,
  bookmarkArticle: func.isRequired,
  history: objectProp.isRequired
};

ArticleDetailPage.defaultProps = {
  token: '',
  articleGotten: {}
};

/**
 * @description function to map component props to redux store
 * @param {object} store redux store
 * @returns {object} component props
 */
export const mapStateToProps = ({ auth, article, user }) => {
  const { username } = user;
  const { token, isLoggedIn } = auth;
  const {
    errors, isGetting, articleGotten, ratingData, clapMsg
  } = article;
  return {
    username,
    token,
    errors,
    isGetting,
    isLoggedIn,
    articleGotten,
    clapMsg,
    ratingData
  };
};

/**
 * @description function to map dispatch to component as props
 * @param {object} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getArticle: getArticleAction,
    gettingArticle: gettingArticleAction,
    clearErrors: clearErrorsAction,
    articleClap: articleClapAction,
    rateArticleFn: rateArticleAction,
    removeBookmark: removeBookmarkAction,
    bookmarkArticle: bookmarkArticleAction
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetailPage);

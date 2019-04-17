import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {
  objectOf, object, func, string, bool
} from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

// Components
import TopNavBar from '../components/TopNav';

// Images
import defaultClap from '../assets/img/defaultClap.svg';

// Actions
import { gettingArticleAction, getArticleAction, clearErrorsAction } from '../redux/actions/articleActions';
/**
 * @description article detail view page
 * @returns {HTMLDivElement} profile
 */
export class ArticleDetailPage extends Component {
  /**
 * @returns {HTMLElement} div
 */
  componentWillMount() {
    const {
      match, getArticle, gettingArticle, token, clearErrors
    } = this.props;
    const { articleSlug } = match.params;
    clearErrors();
    gettingArticle();
    getArticle(articleSlug, token);
  }

  /**
 * @returns {HTMLElement} div
 */
  render() {
    const stars = Array(5)
      .fill(undefined)
      .map((val, index) => {
        const i = index;
        return <i key={i} className="far fa-star article_detail_rating_star" />;
      });
    const skeletonText = Array(10)
      .fill(undefined)
      .map((val, index) => {
        const i = index;
        return <p key={i} />;
      });
    const {
      isGetting, articleGotten, errors, isLoggedIn
    } = this.props;
    const {
      title,
      User,
      Tag,
      body,
      coverUrl,
      createdAt,
      rating,
      readTime,
      totalClaps
    } = articleGotten;
    return (
      <Fragment>
        <TopNavBar />
        {errors.message === 'article not found' && <Redirect to="/not-found" />}
        {errors.message === 'Can\'t get Article right now, please try again later' && (<p className="article_detail_error">{errors.message}</p>)}
        { isGetting && !errors.message && (
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
          <article className="article_detail_body">
            {skeletonText}
          </article>
        </div>
        )}
        { !isGetting && !errors.message && articleGotten.User && (
        <div className="article_detail">
          <div className="article_detail_header">
            <img src={coverUrl} alt="article cover" className="article_detail_header_img" />
            <section className="article_detail_header_info">
              <h2 className="article_detail_header_info_title">
                {title}
              </h2>
              <section className="article_detail_header_info_details">
                <Link to={`/profiles/${User.username}`} className="article_detail_header_info_details_author">
                  { (User.firstname || User.lastname) && `${User.firstname || ''} ${User.lastname || ''}`}
                  { (!User.firstname && !User.lastname) && `${User.username}`}
                </Link>
                <span className="article_detail_header_info_details_date">
                  {`${moment(createdAt).format('ha')} on ${moment(createdAt).format('MMMM Do YYYY')}` }
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
          { isLoggedIn && (
          <div className="article_detail_bookmark">
            <i className="far fa-bookmark article_detail_bookmark_icon" />
            <p>Add to Bookmark</p>
          </div>
          )}
          <article className={`article_detail_body ${!isLoggedIn && 'article_detail_body_no_auth'}`}>
            {body.split('<br />').map(section => (
              <Fragment>
                <article className="article_detail_body_segment">
                  {section}
                </article>
                <br />
              </Fragment>
            ))}

          </article>
          <div className={`article_detail_rating ${!isLoggedIn && 'article_detail_rating_no_auth'}`}>
            { isLoggedIn && (
            <Fragment>
              <p>How did you enjoy this article?</p>
              <section className="article_detail_rating_stars">
                {stars}
              </section>
            </Fragment>
            )
            }
            { Number(rating) !== 0 && (
            <p className="article_detail_rating_average">
            Average:
              {' '}
              <span className="article_detail_rating_average_number">
                {rating}
              </span>
            </p>
            )}
            { Number(rating) === 0 && (
            <p className="article_detail_rating_average">
              This article has not yet been rated
            </p>
            )}
          </div>
          <aside className="article_detail_aside">
            { isLoggedIn && (
            <div className="article_detail_aside_clap">
              <img src={defaultClap} alt="clap icon" className="article_detail_aside_clap_img" />
              <p className="article_detail_aside_clap_text">{totalClaps}</p>
            </div>
            )}
            <div className={`article_detail_aside_share ${!isLoggedIn && 'article_detail_aside_share_no_auth'}`}>
              <p className="article_detail_aside_share_text">Share with</p>
              <button type="button" title="share via facebook" className="article_detail_aside_share_button">
                <i className="fab fa-facebook-square article_detail_aside_share_button_icon article_detail_aside_share_button_facebook" />
              </button>
              <br />
              <button type="button" title="share via twitter" className="article_detail_aside_share_button">
                <i className="fab fa-twitter article_detail_aside_share_button_icon article_detail_aside_share_button_twitter" />
              </button>
            </div>
            { isLoggedIn && (
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
                { (User.firstname || User.lastname) && `${User.firstname || ''} ${User.lastname || ''} `}
                { (!User.firstname && !User.lastname) && `${User.username}`}
              </h3>
              <p className="article_detail_author_info_bio">
                I write about science fiction, art,
                food and several other categories. Follow me for more like this
              </p>
            </section>
            { isLoggedIn && (
            <button type="button" className="article_detail_author_follow_btn">
              Follow
            </button>
            )}
          </div>
        </div>
        )}
      </Fragment>
    );
  }
}

ArticleDetailPage.propTypes = {
  match: objectOf(object, string).isRequired,
  token: string,
  getArticle: func.isRequired,
  gettingArticle: func.isRequired,
  clearErrors: func.isRequired,
  errors: objectOf(string).isRequired,
  articleGotten: objectOf(string),
  isGetting: bool.isRequired,
  isLoggedIn: bool.isRequired
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
export const mapStateToProps = ({ auth, article }) => {
  const { token, isLoggedIn } = auth;
  const { errors, isGetting, articleGotten } = article;
  return {
    token,
    errors,
    isGetting,
    isLoggedIn,
    articleGotten
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
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailPage);

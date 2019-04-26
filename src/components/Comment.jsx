import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import {
  objectOf,
  string,
  func,
  arrayOf,
  object,
  bool
} from 'prop-types';
import notifyUser from '../utils/Toast';


// Import actions
import {
  getComments,
  postComment,
  loadingComment,
  clearPosted
} from '../redux/actions/commentActions';

// Import components
import Button from './Button';
import AHfooter from './Footer';

/**
 * @class Comment
 * @description add comment to articles
 * @returns {HTMLElement} comments
 */
export class Comment extends Component {
  state = {
    comment: '',
    showPost: false
  }


  /**
   * @returns {object} last comment
   */
  componentDidMount() {
    this.getAllComments();
  }

  /**
   * @returns {object} comments
   */
  getAllComments() {
    const { getArticleComments, slug } = this.props;
    getArticleComments(slug.articleSlug);
  }

  /**
   * @method showCommentPost
   * @description shows post comment form
   * @returns {HTMLElement} post comment form
   */
  showCommentPost = () => {
    const { showPost } = this.state;
    const {
      loading,
      errors,
      posted,
      clearPostedValue
    } = this.props;

    if (posted) {
      this.getAllComments();
      clearPostedValue();
      this.scrollToBottom();
    }

    if (showPost && !posted) {
      return (
        <form className="comment_box__form" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter Comment"
            className="comment_box__form__input"
            onChange={this.handleChange}
            minLength="2"
            required
          />
          <span className="error">{errors.comment}</span>
          <Button
            customClass="comment_box__form__cancel"
            btnText="Cancel"
            btnType="button"
            onClick={this.hidePostComment}
          />
          <Button
            customClass="comment_box__form__submit"
            btnText="Post"
            btnType="submit"
            isDisabled={loading}
          />
        </form>
      );
    }
  }

  /**
   * @method handleChange
   * @description updates comment state
   * @param {object} e
   * @returns {string} comment
   */
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ comment: value });
  }

  /**
   * @method hidePostComment
   * @description hides comment box
   * @returns {object} state
   */
  hidePostComment = () => {
    this.setState({ showPost: false });
  }


  /**
   * @method handleSubmit
   * @description handles comment submission
   * @param {object} e
   * @returns {*} actions
   */
  handleSubmit = (e) => {
    const {
      postArticleComment,
      loadingPost,
      slug,
    } = this.props;
    e.preventDefault();
    loadingPost();
    postArticleComment(slug.articleSlug, this.state);

    this.setState({ showPost: false });
  }

  /**
   * @method displayComments
   * @description displays available comments
   * @returns {HTMLElement} comments
   */
  displayComments = () => {
    const { articleComments } = this.props;
    let comments = '';

    if (!articleComments[0]) comments = <div className="no_comment">No comment available</div>;
    else {
      comments = articleComments.map((SingleComment, index) => {
        const comment = SingleComment.comment.split('\n').map((item, key) => (
          <span key={key.toString()}>
            {item}
            <br />
          </span>
        ));
        return (
          <div key={index.toString()} className="comment_card">
            <span className="item comment_card__image">
              <img src={SingleComment.User.image} alt="user" />
            </span>
            <span className="item comment_card__main">
              <div className="comment_card__main__header">
                <h3>
                  {SingleComment.User.firstname}
                  {' '}
                  {SingleComment.User.lastname}
                </h3>
                <i>{`${moment(SingleComment.createdAt).format('HH:mma')} on ${moment(SingleComment.createdAt).format('MMMM Do YYYY')}`}</i>
              </div>
              <div className="comment_card__main__body">
                <p>{comment}</p>
              </div>
              <div className="comment_card__main__footer">
                <i className="far fa-thumbs-up"><span className="comment_card__main__likes">{SingleComment.totalLikes}</span></i>
              </div>
            </span>
          </div>
        );
      });
    }
    return comments;
  }

  /**
   * @method toggleCommentPost
   * @description updates showPost state
   * @returns {object} state
   */
  toggleCommentPost = () => {
    const { showPost } = this.state;
    const { clearPostedValue, isLoggedIn } = this.props;

    if (!isLoggedIn) notifyUser(toast('login to add a comment'));
    else {
      clearPostedValue();
      this.setState({ showPost: !showPost });
    }
  }

  /**
   * @returns {object} comments
   */
  scrollToBottom() {
    this.el.scrollIntoView({ block: 'end' });
  }

  /**
   * @returns {HTMLElement} comments
   */
  render() {
    const { showPost } = this.state;
    const postCommentClass = showPost ? 'hidePost' : '';

    return (
      <div>
        <div className="comment">
          <div className="comment_box">
            <i
              className={`fas fa-reply comment_box_post ${postCommentClass}`}
              onKeyPress={this.toggleCommentPost}
              role="button"
              tabIndex={0}
              onClick={this.toggleCommentPost}
            >
              {' '}
            Post Comment
            </i>
            {this.showCommentPost()}
          </div>
          <br />
          <h2>Comments</h2>
          <div>{this.displayComments()}</div>
        </div>
        <AHfooter />
        <div id="bottom" ref={(el) => { this.el = el; }} />
      </div>
    );
  }
}

Comment.propTypes = {
  slug: objectOf(string).isRequired,
  getArticleComments: func.isRequired,
  articleComments: arrayOf(object).isRequired,
  postArticleComment: func.isRequired,
  loadingPost: func.isRequired,
  loading: bool.isRequired,
  errors: objectOf(object).isRequired,
  posted: bool.isRequired,
  clearPostedValue: func.isRequired,
  isLoggedIn: bool.isRequired
};

/**
 * @description pass state to props
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ comments }) {
  const {
    articleComments,
    errors,
    posted,
    loading
  } = comments;
  return {
    articleComments,
    errors,
    posted,
    loading
  };
}

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @returns {Functions} actions
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArticleComments: getComments,
    postArticleComment: postComment,
    loadingPost: loadingComment,
    clearPostedValue: clearPosted
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

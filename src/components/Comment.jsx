import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import {
  objectOf, string, func, arrayOf, object, bool
} from 'prop-types';
import notifyUser from '../utils/Toast';

// Import actions
import {
  getComments,
  postComment,
  loadingComment,
  clearPosted,
  toggleCommentLikeAction,
  postToggleCommentLikeAction,
  editComment,
  editCommentLoading,
  clearEditComment
} from '../redux/actions/commentActions';

// Import components
import Button from './Button';
import AHfooter from './Footer';

/**
 * @class Comment
 * @description add comment to articles
 * @param {object} e - event object
 * @returns {HTMLElement} comments
 */
export class Comment extends Component {
  state = {
    comment: '',
    showPost: false,
    editedComment: '',
    showEditCommentTextarea: ''
  };

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
    const { getArticleComments, slug, token } = this.props;
    getArticleComments(slug.articleSlug, token);
  }

  /**
   * @method showCommentPost
   * @description shows post comment form
   * @returns {HTMLElement} post comment form
   */
  showCommentPost = () => {
    const { showPost } = this.state;
    const {
      loading, errors, posted, clearPostedValue, highlighted
    } = this.props;

    if (posted) {
      this.getAllComments();
      clearPostedValue();
    }

    if ((showPost || highlighted) && !posted) {
      window.scrollTo(0, 765);
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
  };

  handleEditChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * @method handleEditSubmit
   * @description method that submits the edit form
   * @param {object} e
   * @returns {undefined}
   */
  handleEditSubmit = (e) => {
    e.preventDefault();
    const { slug, editCommentAction, editCommentLoadingAction } = this.props;
    const { editedComment, commentId } = this.state;
    editCommentLoadingAction();
    editCommentAction(slug.articleSlug, editedComment, commentId);
  };

  /**
   * @description edit comment form method
   * @param {string} value
   * @returns {JSX} JSX
   */
  editComment = () => {
    const { editedComment } = this.state;
    const { editLoading, edited, clearEditCommentAction } = this.props;
    if (edited) {
      this.cancelEditComment();
      clearEditCommentAction();
    }
    return (
      <form className="comment_input_form" onSubmit={this.handleEditSubmit}>
        <textarea
          placeholder="Enter Comment"
          className="comment_box__form__input"
          onChange={this.handleEditChange}
          name="editedComment"
          minLength="2"
          id="edit_comment_textarea"
          required
          value={editedComment}
        />
        <Button
          customClass="comment_box__form__cancel"
          btnText="Cancel"
          btnType="button"
          btnId="edit_comment_button"
          onClick={this.cancelEditComment}
          isDisabled={editLoading}
        />
        <Button
          customClass="comment_box__form__submit"
          btnText={editLoading ? 'Updating' : 'Save'}
          btnType="submit"
          btnId="edit_comment_submit_button"
          isDisabled={editLoading}
        />
      </form>
    );
  };

  /**
   * @method toggleEditComment
   * @description Toggle Edit Comment textarea input field
   * @param {number} commentId
   * @param {string} editedComment
   * @returns {undefined}
   */
  toggleEditComment = (commentId, editedComment) => {
    this.setState({ showEditCommentTextarea: `true-${commentId}`, editedComment, commentId });
  };

  /**
   * @method cancelEditComment
   * @description Cancel edit comment
   * @returns {string} comment
   */
  cancelEditComment = () => {
    this.setState({ showEditCommentTextarea: '' });
  };

  /**
   * @method handleChange
   * @description updates comment state
   * @param {object} e
   * @returns {string} comment
   */
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ comment: value });
  };

  /**
   * @method hidePostComment
   * @description hides comment box
   * @returns {object} state
   */
  hidePostComment = () => {
    const { closeComment } = this.props;
    closeComment();
    this.setState({ showPost: false });
  };

  /**
   * @method handleSubmit
   * @description handles comment submission
   * @param {object} e
   * @returns {*} actions
   */
  handleSubmit = (e) => {
    const { postArticleComment, loadingPost, slug } = this.props;
    e.preventDefault();
    loadingPost();
    postArticleComment(slug.articleSlug, this.state);

    this.setState({ showPost: false });
  };

  /**
   * @param {number} id
   * @returns {undefined}
   */
  toggleLike = (id) => {
    const {
      toggleCommentLike, postToggleCommentLike, slug, token, isLoggedIn
    } = this.props;
    if (!isLoggedIn) notifyUser(toast('Login to like a comment'));
    else {
      toggleCommentLike(id);
      postToggleCommentLike(slug.articleSlug, id, token);
    }
  };

  /**
   * @method displayComments
   * @description displays available comments
   * @returns {HTMLElement} comments
   */
  displayComments = () => {
    const { showEditCommentTextarea } = this.state;
    const { articleComments, username, isLoggedIn } = this.props;
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
        const { User, hasLiked, updatedAt } = SingleComment;
        return (
          <Fragment>
            <div key={index.toString()} className="comment_card">
              <span className="item comment_card__image">
                <img src={User.image} alt="user" />
              </span>
              <span className="item comment_card__main">
                <div className="comment_card__main__header">
                  <Link to={`../profile/${User.username}`}>
                    <h3>
                      {User.firstname}
                      {' '}
                      {User.lastname}
                    </h3>
                  </Link>
                  <i>
                    {`${moment(updatedAt).format('HH:mma')} on ${moment(updatedAt).format(
                      'MMMM Do YYYY'
                    )}`}
                  </i>
                </div>
                <div className="comment_card__main__body">
                  <p>{comment}</p>
                </div>
                <div className="comment_card__main__footer">
                  <i
                    title={hasLiked ? 'Unlike this comment' : 'Like this comment'}
                    className={`like-icon far fa-thumbs-up ${hasLiked ? 'liked' : ''}`}
                    onClick={() => this.toggleLike(SingleComment.id)}
                    role="presentation"
                  >
                    <span className="comment_card__main__likes">{SingleComment.totalLikes}</span>
                  </i>
                  {`${showEditCommentTextarea}` !== `true-${SingleComment.id}`
                    && isLoggedIn
                    && username === SingleComment.User.username && (
                      <i
                        className="fas fa-edit edit_comment_toggle"
                        role="presentation"
                        onClick={() => {
                          this.toggleEditComment(SingleComment.id, SingleComment.comment);
                        }}
                      >
                        <span>Edit</span>
                      </i>
                  )}
                </div>
              </span>
            </div>
            <div className="edit_comment_container">
              {`${showEditCommentTextarea}` === `true-${SingleComment.id}` && this.editComment()}
            </div>
          </Fragment>
        );
      });
    }
    return comments;
  };

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
  };

  /**
   * @returns {HTMLElement} comments
   */
  render() {
    const { showPost } = this.state;
    const { errors, clearPostedValue } = this.props;
    if (errors.message) {
      notifyUser(toast(`${errors.message}`, { className: 'error-toast' }));
      clearPostedValue();
    }
    const postCommentClass = showPost ? 'hidePost' : '';

    return (
      <div>
        <div className="comment full_comment_wrapper">
          <div className="comment_box">
            <div
              className={`comment_box_post ${postCommentClass}`}
              onKeyPress={this.toggleCommentPost}
              role="button"
              tabIndex={0}
              onClick={this.toggleCommentPost}
            >
              <i className="fas fa-reply" />
              <span> Post Comment</span>
            </div>
            {this.showCommentPost()}
          </div>
          <br />
          <h2>Comments</h2>
          <div>{this.displayComments()}</div>
        </div>
        <AHfooter />
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
  isLoggedIn: bool.isRequired,
  username: string,
  editCommentAction: func.isRequired,
  editCommentLoadingAction: func,
  editLoading: bool,
  edited: bool,
  clearEditCommentAction: func,
  toggleCommentLike: func.isRequired,
  postToggleCommentLike: func.isRequired,
  token: string,
  highlighted: bool,
  closeComment: func
};

Comment.defaultProps = {
  token: '',
  username: '',
  editCommentLoadingAction: () => false,
  clearEditCommentAction: () => false,
  editLoading: false,
  edited: false,
  highlighted: false,
  closeComment: () => false
};

/**
 * @description pass state to props
 * @param {*} state
 * @returns {object} state
 */
export const mapStateToProps = ({ comments, user }) => {
  const {
    articleComments, errors, posted, loading, editLoading, edited
  } = comments;
  const { username } = user;
  return {
    articleComments,
    errors,
    posted,
    loading,
    username,
    editLoading,
    edited
  };
};

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @returns {Functions} actions
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getArticleComments: getComments,
    postArticleComment: postComment,
    loadingPost: loadingComment,
    clearPostedValue: clearPosted,
    editCommentAction: editComment,
    editCommentLoadingAction: editCommentLoading,
    clearEditCommentAction: clearEditComment,
    toggleCommentLike: toggleCommentLikeAction,
    postToggleCommentLike: postToggleCommentLikeAction
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);

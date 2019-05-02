/* eslint-disable no-unused-vars */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reducers from '../../redux/reducers';
import { Comment, mapStateToProps, mapDispatchToProps } from '../../components/Comment';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const slug = { articleSlug: 'hi-girl' };
const mockFunction = jest.fn();
const articleComments = [
  {
    id: 2,
    articleId: 23,
    userId: 12,
    comment: 'just checking',
    highlighted: 'N/A',
    index: 0,
    totalLikes: 0,
    createdAt: '2019-04-25T02:31:17.654Z',
    updatedAt: '2019-04-25T02:31:17.654Z',
    hasLiked: false,
    User: {
      firstname: 'Adaeze',
      lastname: 'Odurukwe',
      username: 'deedee',
      email: 'daizyodurukwe@gmail.com',
      image:
        'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png'
    }
  }
];
const noArticle = [];
const error = { comment: [] };

describe('Mount comment component', () => {
  it('Should mount without failing', () => {
    const CommentComponent = mount(
      <Provider store={store}>
        <Comment
          slug={slug}
          getArticleComments={mockFunction}
          postArticleComment={mockFunction}
          loadingPost={false}
          loading={false}
          clearPostedValue={mockFunction}
          isLoggedIn
          articleComments={noArticle}
          errors={error}
          toggleCommentLike={mockFunction}
          postToggleCommentLike={mockFunction}
        />
      </Provider>
    );
    expect(CommentComponent.find('.comment').exists()).toEqual(true);

    const postCommentBox = CommentComponent.find('.comment_box_post');
    expect(postCommentBox.exists()).toEqual(true);

    // Simulate post comment click
    postCommentBox.simulate('click');
    expect(CommentComponent.find('form').exists()).toEqual(true);

    // Simulate submit click
    const cancelButton = CommentComponent.find('.comment_box__form__cancel');
    cancelButton.simulate('click');
    expect(CommentComponent.find('form').exists()).toEqual(false);
  });
});

describe('User should not be able to see comment box when not logged in', () => {
  it('Should not show comment form', () => {
    const CommentComponent = mount(
      <Provider store={store}>
        <Comment
          slug={slug}
          getArticleComments={mockFunction}
          postArticleComment={mockFunction}
          loadingPost={false}
          loading={false}
          clearPostedValue={mockFunction}
          isLoggedIn={false}
          articleComments={noArticle}
          errors={error}
          posted
          toggleCommentLike={mockFunction}
          postToggleCommentLike={mockFunction}
        />
      </Provider>
    );

    const postCommentBox = CommentComponent.find('.comment_box_post');
    postCommentBox.simulate('click');
    expect(CommentComponent.find('form').exists()).toEqual(false);
  });
});

describe('Should list available comments', () => {
  it('show comments', () => {
    const CommentComponent = mount(
      <BrowserRouter>
        <Comment
          slug={slug}
          getArticleComments={mockFunction}
          postArticleComment={mockFunction}
          loadingPost={false}
          loading={false}
          clearPostedValue={mockFunction}
          isLoggedIn={false}
          articleComments={articleComments}
          errors={error}
          posted={false}
          toggleCommentLike={mockFunction}
          postToggleCommentLike={mockFunction}
        />
      </BrowserRouter>
    );

    const commentCard = CommentComponent.find('.comment_card');
    expect(commentCard.exists()).toEqual(true);
  });
});

describe('Test comment form', () => {
  it('Should update comment state on change', () => {
    const CommentComponent = mount(
      <Comment
        slug={slug}
        getArticleComments={mockFunction}
        postArticleComment={mockFunction}
        loadingPost={mockFunction}
        loading={false}
        clearPostedValue={mockFunction}
        isLoggedIn
        articleComments={noArticle}
        errors={error}
        posted={false}
        toggleCommentLike={mockFunction}
        postToggleCommentLike={mockFunction}
      />
    );
    const postCommentBox = CommentComponent.find('.comment_box_post');
    expect(postCommentBox.exists()).toEqual(true);

    // Simulate posst comment click
    postCommentBox.simulate('click');
    expect(CommentComponent.find('form').exists()).toEqual(true);

    const commentTexeArea = CommentComponent.find('.comment_box__form__input').first();
    expect(commentTexeArea.exists()).toEqual(true);
    commentTexeArea.simulate('change', { target: { value: 'Changed' } });
    expect(CommentComponent.state().comment).toEqual('Changed');
    CommentComponent.find('.comment_box__form__submit').simulate('submit');
  });
});

describe('Liking comments', () => {
  it('Should not like/unlike comment if user is not logged in', () => {
    const mockToggleCommentLike = jest.fn();
    const mockPostToggleCommentLike = jest.fn();
    const CommentComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Comment
            slug={slug}
            getArticleComments={mockFunction}
            postArticleComment={mockFunction}
            loadingPost={false}
            loading={false}
            clearPostedValue={mockFunction}
            isLoggedIn={false}
            articleComments={articleComments}
            errors={error}
            posted
            toggleCommentLike={mockToggleCommentLike}
            postToggleCommentLike={mockPostToggleCommentLike}
          />
        </BrowserRouter>
      </Provider>
    );

    const likeCommentIcon = CommentComponent.find('.like-icon');
    likeCommentIcon.simulate('click');
    expect(mockToggleCommentLike.mock.calls.length).toEqual(0);
    expect(mockPostToggleCommentLike.mock.calls.length).toEqual(0);
  });
  it('Should like/unlike comment if user is logged in', () => {
    const mockToggleCommentLike = jest.fn();
    const mockPostToggleCommentLike = jest.fn();
    const CommentComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Comment
            slug={slug}
            getArticleComments={mockFunction}
            postArticleComment={mockFunction}
            loadingPost={false}
            loading={false}
            clearPostedValue={mockFunction}
            isLoggedIn
            articleComments={articleComments}
            errors={error}
            posted
            toggleCommentLike={mockToggleCommentLike}
            postToggleCommentLike={mockPostToggleCommentLike}
          />
        </BrowserRouter>
      </Provider>
    );

    const likeCommentIcon = CommentComponent.find('.like-icon');
    expect(mockToggleCommentLike.mock.calls.length).toEqual(0);
    expect(mockPostToggleCommentLike.mock.calls.length).toEqual(0);
    likeCommentIcon.simulate('click');
    expect(mockToggleCommentLike.mock.calls.length).toEqual(1);
    expect(mockPostToggleCommentLike.mock.calls.length).toEqual(1);
  });
  it('Should not render liked icon when comment is not liked', () => {
    const mockToggleCommentLike = jest.fn();
    const mockPostToggleCommentLike = jest.fn();
    const CommentComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Comment
            slug={slug}
            getArticleComments={mockFunction}
            postArticleComment={mockFunction}
            loadingPost={false}
            loading={false}
            clearPostedValue={mockFunction}
            isLoggedIn
            articleComments={articleComments}
            errors={error}
            posted
            toggleCommentLike={mockToggleCommentLike}
            postToggleCommentLike={mockPostToggleCommentLike}
          />
        </BrowserRouter>
      </Provider>
    );

    const likedCommentIcon = CommentComponent.find('.liked');
    expect(likedCommentIcon.exists()).toBe(false);
  });
  it('Should render liked icon when comment is liked', () => {
    const mockToggleCommentLike = jest.fn();
    const mockPostToggleCommentLike = jest.fn();
    const CommentComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Comment
            slug={slug}
            getArticleComments={mockFunction}
            postArticleComment={mockFunction}
            loadingPost={false}
            loading={false}
            clearPostedValue={mockFunction}
            isLoggedIn
            articleComments={[{ ...articleComments[0], hasLiked: true }]}
            errors={error}
            posted
            toggleCommentLike={mockToggleCommentLike}
            postToggleCommentLike={mockPostToggleCommentLike}
          />
        </BrowserRouter>
      </Provider>
    );

    const likedCommentIcon = CommentComponent.find('.liked');
    expect(likedCommentIcon.exists()).toBe(true);
  });
});
describe('Edit comment', () => {
  it('show edit comment button if user is logged in and he/she owns the comment', () => {
    const CommentComponent = mount(
      <BrowserRouter>
        <Comment
          slug={slug}
          getArticleComments={mockFunction}
          postArticleComment={mockFunction}
          loadingPost={false}
          loading={false}
          clearPostedValue={mockFunction}
          isLoggedIn
          username="deedee"
          articleComments={articleComments}
          errors={error}
          posted={false}
          editCommentAction={mockFunction}
        />
      </BrowserRouter>
    );

    const editButton = CommentComponent.find('i.edit_comment_toggle');
    expect(editButton.exists()).toEqual(true);
    editButton.simulate('click');

    const editTextArea = CommentComponent.find('#edit_comment_textarea');
    expect(editTextArea.exists()).toEqual(true);
    editTextArea.simulate('change');

    const editCommentSubmitButton = CommentComponent.find('#edit_comment_submit_button');
    expect(editCommentSubmitButton.exists()).toEqual(true);
    editCommentSubmitButton.simulate('submit');

    const cancelButton = CommentComponent.find('#edit_comment_button');
    expect(cancelButton.exists()).toEqual(true);
    cancelButton.simulate('click');
  });

  it('should mock mapStateToProp', () => {
    const comments = {
      articleComments: '',
      errors: '',
      posted: '',
      loading: '',
      editLoading: '',
      edited: ''
    };
    const user = {
      username: ''
    };
    expect(mapStateToProps({ comments, user })).toEqual({
      articleComments: '',
      errors: '',
      posted: '',
      loading: '',
      editLoading: '',
      edited: '',
      username: ''
    });
  });
  it('should mock mapDispatchToProps', () => {
    const dispatch = mockFunction;
    mapDispatchToProps(dispatch);
  });
  it('should mock default props directly', () => {
    Comment.defaultProps.clearEditCommentAction();
  });
  it('should mock the editComment method with shallow', () => {
    const CommentComponentII = shallow(
      <Comment
        slug={slug}
        getArticleComments={mockFunction}
        postArticleComment={mockFunction}
        loadingPost={false}
        loading={false}
        clearPostedValue={mockFunction}
        isLoggedIn
        username="deedee"
        articleComments={articleComments}
        errors={error}
        posted={false}
        editCommentAction={mockFunction}
        edited
        editLoading
      />
    );
    CommentComponentII.setProps({ edited: true });
    CommentComponentII.instance().editComment();
  });
});

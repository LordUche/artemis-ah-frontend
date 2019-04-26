/* eslint-disable no-unused-vars */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../redux/reducers';
import { Comment } from '../../components/Comment';

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
    User: {
      firstname: 'Adaeze',
      lastname: 'Odurukwe',
      username: 'deedee',
      email: 'daizyodurukwe@gmail.com',
      image: 'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png'
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
        />
      </Provider>
    );
    expect(CommentComponent.find('.comment').exists()).toEqual(true);

    const postCommentBox = CommentComponent.find('.comment_box_post');
    expect(postCommentBox.exists()).toEqual(true);

    // Simulate posst comment click
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
          posted={false}
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
      />
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

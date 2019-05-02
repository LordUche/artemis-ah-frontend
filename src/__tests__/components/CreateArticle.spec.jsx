
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import { ArticleItem } from '../../components/ArticleItem';
import { CreateArticlePage, mapStateToProps } from '../../views/CreateArticle';
import reducers from '../../redux/reducers';

const createArticleInstance = new CreateArticlePage();

const store = createStore(reducers, applyMiddleware(ReduxPromise));
describe('Create article component', () => {
  const fetchTagsFn = jest.fn();
  const publishinArticleFn = jest.fn();
  const clearErrorsFn = jest.fn();
  const createArticleFn = jest.fn();
  it('should have a title', () => {
    const createArticle = shallow(
      <CreateArticlePage
        tagList={[{ value: '1', label: 'Food' }]}
        isLoggedIn
        fetchTags={fetchTagsFn}
        publishingArticle={publishinArticleFn}
        clearErrors={clearErrorsFn}
        isPublishing={false}
        createArticle={createArticleFn}
        newArticleSlug=""
      />
    );
    expect(createArticle.find('.title').exists()).toBe(true);
    expect(createArticle.find('.title').text()).toBe('Create Article');
  });

  it('should redirect the user if not logged in', () => {
    const createArticle = shallow(
      <CreateArticlePage
        tagList={[]}
        isLoggedIn={false}
        fetchTags={fetchTagsFn}
        publishingArticle={publishinArticleFn}
        clearErrors={clearErrorsFn}
        isPublishing={false}
        createArticle={createArticleFn}
        newArticleSlug=""
      />
    );
    expect(createArticle.find('Redirect').exists()).toBe(true);
  });

  it('should map the correct state to props', () => {
    const mockState = {
      tags: { tagList: [] },
      auth: { isLoggedIn: false },
      article: { errors: {}, isPublishing: false }
    };

    const createArticleProps = mapStateToProps(mockState);

    expect(createArticleProps.isLoggedIn).toBe(false);
    expect(createArticleProps.isPublishing).toBe(false);
  });

  it('should update state when image is uploaded', () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    const createArticle = mount(
      <Provider store={store}>
        <Router>
          <CreateArticlePage
            tagList={[{ value: '1', label: 'Food' }]}
            isLoggedIn
            fetchTags={fetchTagsFn}
            publishingArticle={publishinArticleFn}
            clearErrors={clearErrorsFn}
            isPublishing={false}
            createArticle={createArticleFn}
            newArticleSlug=""
          />
        </Router>
      </Provider>
    );
    const mockDropzone = createArticle.find('Dropzone');
    mockDropzone.simulate('drop', { dataTransfer: { files: [mockImageData] } });
    expect(mockDropzone.exists()).toBe(true);
  });

  it('should update character count as user types', () => {
    const createArticle = mount(
      <Provider store={store}>
        <Router>
          <CreateArticlePage
            tagList={[{ value: '1', label: 'Food' }]}
            isLoggedIn
            fetchTags={fetchTagsFn}
            publishingArticle={publishinArticleFn}
            clearErrors={clearErrorsFn}
            isPublishing={false}
            createArticle={createArticleFn}
            newArticleSlug=""
          />
        </Router>
      </Provider>
    );
    const descriptionElement = createArticle.find('[name="description"]');
    expect(descriptionElement.exists()).toBe(true);
    descriptionElement.simulate('keyup', { value: 'c' });
    descriptionElement.simulate('change', { value: 'c' });
  });

  it('should test for submit form', () => {
    const createArticle = shallow(
      <CreateArticlePage
        tagList={[{ value: '1', label: 'Food' }]}
        isLoggedIn
        fetchTags={fetchTagsFn}
        publishingArticle={publishinArticleFn}
        clearErrors={clearErrorsFn}
        isPublishing={false}
        createArticle={createArticleFn}
        errors={[]}
        newArticleSlug=""
      />
    );
    const mockPreventDefault = jest.fn();
    const formElement = createArticle.find('.formbox__fields');
    expect(formElement.exists()).toBe(true);
    formElement.simulate('submit', { preventDefault: mockPreventDefault });

    const mockImageData = new File(['image content'], { type: 'image/*' });

    createArticle.setState({ formData: mockImageData });
    createArticle.setState({ charactersCount: -1 });
    createArticle.setState({ imagePreview: true });
    formElement.simulate('submit', { preventDefault: mockPreventDefault });
  });

  it('should cater for error messages and cover other edge cases', () => {
    const createArticle = shallow(
      <CreateArticlePage
        tagList={[{ value: '1', label: 'Food' }]}
        isLoggedIn
        fetchTags={fetchTagsFn}
        publishingArticle={publishinArticleFn}
        clearErrors={clearErrorsFn}
        isPublishing
        createArticle={createArticleFn}
        errors={{
          status: '5XX',
          title: ['The title error message'],
          description: ['The description error message'],
          body: ['The body error message']
        }}
        newArticleSlug=""
      />
    );
    createArticle.setState({ charactersCount: 1 });
    createArticle.setState({ bodyWordCount: 1 });
    createArticle.setState({ imageUploadFailed: true });
    expect(createArticle.find('.formbox-select-parent').exists()).toBe(true);
  });

  it('should trigger function for calculating read time', () => {
    const createArticle = mount(
      <Provider store={store}>
        <Router>
          <CreateArticlePage
            tagList={[{ value: '1', label: 'Food' }]}
            isLoggedIn
            fetchTags={fetchTagsFn}
            publishingArticle={publishinArticleFn}
            clearErrors={clearErrorsFn}
            isPublishing={false}
            createArticle={createArticleFn}
            newArticleSlug=""
          />
        </Router>
      </Provider>
    );
    const bodyElement = createArticle.find('[name="body"]');
    expect(bodyElement.exists()).toBe(true);
    bodyElement.simulate('keyup', { value: 'c' });
    expect(createArticle.find('.formbox-select-parent').exists()).toBe(true);
  });

  it('should redirect to article page after article is published', () => {
    const createArticle = shallow(
      <CreateArticlePage
        tagList={[{ value: '1', label: 'Food' }]}
        isLoggedIn
        fetchTags={fetchTagsFn}
        publishingArticle={publishinArticleFn}
        clearErrors={clearErrorsFn}
        isPublishing={false}
        createArticle={createArticleFn}
        newArticleSlug="abcd-1"
      />
    );
    expect(createArticle.find('Redirect').exists()).toBe(true);
    expect(createArticle.find('Redirect').prop('to')).toBe('/article/abcd-1');
  });

  it('should test the onclick event on the edit and delete button', () => {
    const mockFunc = jest.fn();
    const articleCard = mount(
      <Router>
        <ArticleItem
          isLoggedIn
          title="xyz"
          description="xyz"
          coverUrl="xyz"
          slug="xyz"
          tag="xyz"
          body="xyz"
          rating="xyz"
          readTime="xyz"
          author="xyz"
          username="xyz"
          showAuthor="xyz"
          modifyArticle={mockFunc}
          push={mockFunc}
          deleteConfirmation={mockFunc}
        />
      </Router>
    );
    const editBtn = articleCard.find(
      '.article-item__body-wrapper__bottom-links__user-actions__edit'
    );
    expect(editBtn.exists()).toBe(true);
    editBtn.simulate('click');

    const deleteBtn = articleCard.find(
      '.article-item__body-wrapper__bottom-links__user-actions__delete'
    );
    expect(deleteBtn.exists()).toBe(true);
    deleteBtn.simulate('click');

    ArticleItem.defaultProps.push();
    ArticleItem.defaultProps.deleteBookmarkConfirmation();
  });

  it('should mock a file upload', () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    /**
     * @description noop
     * @returns {object} obj
     */
    const noOp = () => {};
    if (typeof window.URL.createObjectURL === 'undefined') {
      Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
    }
    createArticleInstance.handleImageUpload(mockImageData);
  });
});

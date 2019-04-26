import React from 'react';
import { shallow } from 'enzyme';
import {
  EditArticlePage,
  mapStateToProps,
  matchDispatchToProps
} from '../../views/EditArticlePage';

const MyEditPage = new EditArticlePage();

const cardData = {
  title: '',
  description: '',
  coverUrl: '',
  tag: '',
  body: '',
  slug: ''
};

describe('Edit artricle page', () => {
  const mockFunctionPA = jest.fn();
  const mockFunctionCE = jest.fn();
  const mockFunctionSE = jest.fn();
  const editArticleWrapper = shallow(
    <EditArticlePage
      isLoggedIn
      errors={{}}
      isPublishing
      articleCardData={cardData}
      publishingArticle={mockFunctionPA}
      clearErrors={mockFunctionCE}
      saveEdited={mockFunctionSE}
      tagList={{}}
    />
  );
  it('it should have an initial state of false for showbody count', () => {
    expect(editArticleWrapper.state('showBodyCount')).toEqual(false);
  });

  it('it should return an object for map state to props', () => {
    const tags = {
      tagList: {}
    };
    const auth = {
      isLoggedIn: true
    };
    const article = {
      errors: {},
      articleCardData: {},
      isPublishing: {}
    };
    const state = { tags, auth, article };
    expect(mapStateToProps(state)).toBeTruthy();
  });

  it('it should mock a matchDispatchToProps function', () => {
    const dispatch = jest.fn();
    expect(matchDispatchToProps(dispatch)).toBeTruthy();
  });

  it('should mock a reading time', () => {
    const mockEvent = {
      target: {
        value: 'This is a dummy test'
      }
    };
    MyEditPage.handleReadingTime(mockEvent);
  });

  it('should mock an input change', () => {
    const mockEvent = {
      preventDefault: () => 'prevent default',
      target: {
        value: 'This is a dummy test',
        name: 'title'
      }
    };
    MyEditPage.handleInputChange(mockEvent);
  });

  it('should mock the character count function I', () => {
    const mockEvent = {
      target: {
        value: {
          length: 50
        }
      }
    };
    MyEditPage.handleCharacterCount(mockEvent);
  });

  it('should mock the character count function II', () => {
    const mockEvent = {
      target: {
        value: {
          length: 1001
        }
      }
    };
    MyEditPage.handleCharacterCount(mockEvent);
  });
  it('should mock a file upload', () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    /**
     * @description noOp
     * @returns {object} obj
     */
    const noOp = () => {};
    if (typeof window.URL.createObjectURL === 'undefined') {
      Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
    }
    MyEditPage.handleImageUpload(mockImageData);
  });

  it('should mock the render life cycle method', () => {
    MyEditPage.props = { isLoggedIn: false };
    MyEditPage.render();
  });

  it('should mock the on-submit method', () => {
    const formData = new File(['image content'], { type: 'image/*' });
    MyEditPage.setState({
      formData,
      title: 'mock',
      body: 'mock body '.repeat(10),
      description: 'mock description '.repeat(10),
      slug: 'mock-slug'.repeat(2)
    });

    const mockEvent = {
      preventDefault: () => 'prevent default',
      formData
    };

    /**
     * @description noOp
     * @returns {object} obj
     */
    const noOp = () => {};
    if (typeof window.URL.createObjectURL === 'undefined') {
      Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
    }
    MyEditPage.handleSubmitForm(mockEvent);
    MyEditPage.handleKeyPressI();
    MyEditPage.handleKeyPressII();
  });
});

describe('Edit artricle page', () => {
  const mockFunctionPA = jest.fn();
  const mockFunctionCE = jest.fn();
  const mockFunctionSE = jest.fn();

  shallow(
    <EditArticlePage
      isLoggedIn={false}
      errors={{}}
      isPublishing
      articleCardData=""
      publishingArticle={mockFunctionPA}
      clearErrors={mockFunctionCE}
      saveEdited={mockFunctionSE}
      tagList={{ food: 'food' }}
    />
  );
});

import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, arrayOf, object, objectOf, bool, string, object as objectProp
} from 'prop-types';
import Dropzone from 'react-dropzone';
import dotenv from 'dotenv';
import InputField from '../components/InputField';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TopNavBar from '../components/TopNav';
import {
  createArticleAction,
  clearErrorsAction,
  publishingArticleAction,
  saveEditedArticle
} from '../redux/actions/articleActions';
import HelperUtils from '../utils/helperUtils';

dotenv.config();

/**
 * @class CreateArticle
 * @description The create article component
 */
export class EditArticlePage extends Component {
  state = {
    imageUploadFailed: false,
    imagePreview: '',
    charactersCount: 1000,
    bodyWordCount: 0,
    readingTime: 0,
    cover:
      'https://res.cloudinary.com/artemisah/image/upload/v1553005105/authorshaven/articlePicImage.png',
    tag: '',
    title: '',
    description: '',
    coverUrl: '',
    body: ''
  };

  /**
   * @method componentDidMount
   * @description The componentDidMount lifecycle method
   * @returns {undefined}
   */
  componentDidMount() {
    this.clearErrorMessages();
    const { articleCardData } = this.props;
    const {
      title, description, coverUrl, tag, body
    } = articleCardData;
    this.setState({
      title,
      description,
      coverUrl,
      tag,
      body
    });
    setTimeout(() => console.log(this.state), 2000);
  }

  /**
   * @method clearErrorMessages
   * @description Clears error messages
   * @returns {undefined}
   */
  clearErrorMessages = () => {
    const { errors, clearErrors } = this.props;
    if (Object.keys(errors).length < 1) {
      clearErrors();
    }
  };

  /**
   * @method handleSubmitForm
   * @description Handles create article requests
   * @param {object} event - React synthetic event object
   * @returns {undefined}
   */
  handleSubmitForm = async (event) => {
    event.preventDefault();
    const { publishingArticle } = this.props;
    publishingArticle();

    const {
      formData, tagId, title, body, description
    } = this.state;

    if (formData) {
      const secureUrl = await HelperUtils.uploadImage(formData);
      this.setState({ cover: secureUrl });
    }
    const { cover } = this.state;
    const articleDetails = {
      title,
      tagId,
      body,
      description,
      cover
    };
    const { createArticle } = this.props;
    createArticle(articleDetails);
  };

  /**
   * @method handleInputChange
   * @description Handles on input change
   * @param {object} event - React synthetic event object
   * @returns {undefined}
   */
  handleInputChange = (event) => {
    event.preventDefault();
    this.clearErrorMessages();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  /**
   * @method handleCharacterCount
   * @description Handles word count changes as user types
   * @param {object} event - React synthetic event object
   * @returns {undefined}
   */
  handleCharacterCount = (event) => {
    const charactersLeft = 1000 - event.target.value.length;
    this.setState({
      charactersCount: charactersLeft < 0 ? 0 : charactersLeft
    });
  };

  /**
   * @method handleReadingTime
   * @description Handles the calculation of reading time as user types
   * @param {object} event - React synthetic event object
   * @returns {undefined}
   */
  handleReadingTime = (event) => {
    const bodyTextDetails = HelperUtils.estimateReadingTime(event.target.value);
    const { text, words } = bodyTextDetails;
    this.setState({ bodyWordCount: words, readingTime: text });
  };

  /**
   * @method handleImageUpload
   * @description Handles image upload to Cloudinary
   * @param {array} file - Array containing image file object
   * @returns {undefined}
   */
  handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('upload_preset', 'vslx4tc8');
    this.setState({
      imagePreview: URL.createObjectURL(file[0])
    });
    this.setState({ formData });
  };

  /**
   * @method render
   * @returns {JSX} HTML Markup
   */
  render() {
    const { isLoggedIn, errors, isPublishing } = this.props;
    const {
      imageUploadFailed,
      imagePreview,
      charactersCount,
      bodyWordCount,
      readingTime,
      tag
    } = this.state;
    // const tags = tagList.map(tag => ({ value: tag.id, label: tag.name }));
    return !isLoggedIn ? (
      <Redirect to="./" />
    ) : (
      <Fragment>
        <TopNavBar />
        <section className="formbox">
          <div className="formbox__header">
            <h3 className="title">Edit Article</h3>
          </div>
          {errors.status === '5XX' && (
            <p className="server-error">
              Oops, could not connect to the server at this time, try again.
            </p>
          )}
          <form onSubmit={this.handleSubmitForm} className="formbox__fields">
            <div className="formbox__control">
              <label htmlFor="tag">TAG</label>
              <span>{tag}</span>
            </div>
            <div className="formbox__segment">
              <div className="article-details">
                <div className="formbox__control">
                  <label htmlFor="title">TITLE</label>
                  {errors.title && <p className="error-message">{errors.title[0]}</p>}
                  <InputField
                    id="title"
                    inputType="text"
                    inputName="title"
                    minLength="5"
                    maxLength="200"
                    required
                    placeHolder="Enter Title"
                    customClass="formbox__fields--input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="formbox__control">
                  <label htmlFor="description">DESCRIPTION</label>
                  {errors.description && <p className="error-message">{errors.description[0]}</p>}
                  <textarea
                    onChange={this.handleInputChange}
                    onKeyUp={this.handleCharacterCount}
                    id="description"
                    name="description"
                    type="text"
                    className="formbox__fields--textarea"
                    required
                    minLength="5"
                    maxLength="1000"
                  />
                  <div className="word-count">
                    <strong>{charactersCount}</strong>
                    {' '}
                    {charactersCount === 1 ? 'character' : 'characters'}
                    {' '}
left
                  </div>
                </div>
              </div>
              <div className="article-image">
                <p>UPLOAD IMAGE</p>
                <Dropzone
                  onDrop={this.handleImageUpload}
                  accept="image/*"
                  multiple={false}
                  maxFileSize="5000"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="upload-control">
                          {!imagePreview && (
                            <img
                              className="icon"
                              src="../src/assets/img/add-image.svg"
                              alt="Upload Button"
                            />
                          )}
                          {!imagePreview && <p>Click here to add files.</p>}
                          {imagePreview && (
                            <img className="preview" src={imagePreview} alt="File preview" />
                          )}
                          {imagePreview && <p className="replace-image">Replace image</p>}
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
            <div className="formbox__control">
              <label htmlFor="body">BODY</label>
              {errors.body && <p className="error-message">{errors.body[0]}</p>}
              <textarea
                onKeyUp={this.handleReadingTime}
                onChange={this.handleInputChange}
                id="body"
                name="body"
                type="text"
                className="formbox__fields--textarea"
                required
                minLength="10"
              />
              <div className="reading-time">
                <span>
                  <strong>{bodyWordCount}</strong>
                  {' '}
                  {bodyWordCount === 1 ? 'word' : 'words'}
                  {' '}
                </span>
                <span>
                  <strong>{readingTime === 0 ? `${readingTime} mins` : readingTime}</strong>
                </span>
              </div>
            </div>
            {imageUploadFailed && <p>Image upload failed, try again</p>}
            <div className="formbox__control">
              <Button
                btnText={isPublishing ? 'Publishing Article...' : 'Publish'}
                isDisabled={isPublishing}
                type="submit"
              />
            </div>
          </form>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

/**
 * @method mapDispatchToProps
 * @description - Map dispatch actions to component props
 * @param {callback} dispatch - method to dispatch actions
 * @returns {undefined}
 */
const matchDispatchToProps = dispatch => bindActionCreators(
  {
    createArticle: createArticleAction,
    clearErrors: clearErrorsAction,
    publishingArticle: publishingArticleAction,
    saveEdited: saveEditedArticle
  },
  dispatch
);

/**
 * @method mapStateToProps
 * @description - Maps reducer states to component props
 * @param {object} * - destructured state object
 * @returns {object} - state
 */
export const mapStateToProps = ({ tags, auth, article }) => {
  const { isLoggedIn } = auth;
  const { tagList } = tags;
  const {
    errors, articleCardData, isPublishing, isEditing
  } = article;
  return {
    tagList,
    isLoggedIn,
    errors,
    isPublishing,
    isEditing,
    articleCardData
  };
};

EditArticlePage.propTypes = {
  isLoggedIn: bool.isRequired,
  clearErrors: func.isRequired,
  publishingArticle: func.isRequired,
  tagList: arrayOf(object).isRequired,
  createArticle: func.isRequired,
  errors: objectOf(arrayOf(string)),
  isPublishing: bool.isRequired,
  articleCardData: objectProp.isRequired
};

EditArticlePage.defaultProps = {
  errors: {}
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(EditArticlePage);

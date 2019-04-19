import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, bool, object as objectProp } from 'prop-types';
import Dropzone from 'react-dropzone';
import dotenv from 'dotenv';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TopNavBar from '../components/TopNav';
import { publishingArticleAction, saveEditedArticleAction } from '../redux/actions/articleActions';
import HelperUtils from '../utils/helperUtils';

dotenv.config();

/**
 * @class EditArticle
 * @description The create article component
 */
export class EditArticlePage extends Component {
  state = {
    imageUploadFailed: false,
    imagePreview: '',
    charactersCount: 1000,
    bodyWordCount: 0,
    readingTime: 0,
    showDescriptionCount: false,
    showBodyCount: false,
    cover:
      'https://res.cloudinary.com/artemisah/image/upload/v1553005105/authorshaven/articlePicImage.png',
    tag: '',
    title: '',
    description: '',
    body: '',
    slug: '',
    mounted: false
  };

  /**
   * @method componentDidMount
   * @description The componentDidMount lifecycle method
   * @returns {undefined}
   */
  componentDidMount() {
    const { mounted } = this.state;
    const { articleCardData } = this.props;

    const {
      title, description, coverUrl, tag, body, slug
    } = articleCardData;

    if (!mounted) {
      this.setState({
        title,
        description,
        cover: coverUrl,
        imagePreview: coverUrl,
        tag,
        body,
        slug,
        mounted: true
      });
    }
  }

  /**
   * @method handleSubmitForm
   * @description Handles create article requests
   * @param {object} event - React synthetic event object
   * @returns {undefined}
   */
  handleSubmitForm = async (event) => {
    event.preventDefault();
    const { publishingArticle } = this.props;
    const {
      formData, title, body, description, slug
    } = this.state;

    publishingArticle();

    if (formData) {
      const secureUrl = await HelperUtils.uploadImage(formData);
      this.setState({ cover: secureUrl });
    }
    const { cover } = this.state;

    const editedDetails = {
      title,
      body,
      description,
      cover,
      slug
    };

    const { saveEdited } = this.props;
    saveEdited(editedDetails);
  };

  /**
   * @method handleInputChange
   * @description Handles on input change
   * @param {object} event - React synthetic event object
   * @returns {undefined}
   */
  handleInputChange = (event) => {
    event.preventDefault();
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
    const CLOUDINARY_UPLOAD_PRESET = 'vslx4tc8';
    formData.append('file', file[0]);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    this.setState({
      imagePreview: URL.createObjectURL(file[0])
    });
    this.setState({ formData });
  };

  /**
   * @method handleKeyPress
   * @description Handles image upload to Cloudinary
   * @returns {undefined}
   */
  handleKeyPressI = () => {
    this.setState({ showDescriptionCount: true });
  };

  /**
   * @method handleKeyPressII
   * @description Handles image upload to Cloudinary
   * @returns {undefined}
   */
  handleKeyPressII = () => {
    this.setState({ showBodyCount: true });
  };

  /**
   * @method render
   * @returns {JSX} HTML Markup
   */
  render() {
    const { isLoggedIn, isPublishing } = this.props;
    const {
      imageUploadFailed,
      imagePreview,
      charactersCount,
      bodyWordCount,
      readingTime,
      title,
      description,
      tag,
      body,
      showDescriptionCount,
      showBodyCount
    } = this.state;

    const cardData = localStorage.getItem('cardData');
    if (!cardData) {
      return <Redirect to="/profile" />;
    }
    return !isLoggedIn ? (
      <Redirect to="./" />
    ) : (
      <Fragment>
        <TopNavBar />
        <section className="formbox">
          <div className="formbox__header">
            <h3 className="title">Edit Article</h3>
          </div>
          <form onSubmit={this.handleSubmitForm} className="formbox__fields">
            <div className="formbox__control">
              <label htmlFor="tag">TAG</label>
              <span className="formbox__control__tag">{tag.toUpperCase()}</span>
            </div>
            <div className="formbox__segment">
              <div className="article-details">
                <div className="formbox__control">
                  <label htmlFor="title">TITLE</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    minLength="5"
                    maxLength="200"
                    required
                    placeholder="Enter Title"
                    className="formbox__fields--input"
                    onChange={this.handleInputChange}
                    value={title}
                  />
                </div>
                <div className="formbox__control">
                  <label htmlFor="description">DESCRIPTION</label>
                  <textarea
                    onChange={this.handleInputChange}
                    onKeyUp={this.handleCharacterCount}
                    onKeyPress={this.handleKeyPressI}
                    id="description"
                    name="description"
                    type="text"
                    className="formbox__fields--textarea"
                    required
                    minLength="5"
                    maxLength="1000"
                    value={description}
                  />
                  <div className="word-count">
                    {showDescriptionCount && <strong>{charactersCount}</strong>}
                    {' '}
                    {showDescriptionCount && (
                      <span>{charactersCount === 1 ? 'character' : 'characters'}</span>
                    )}
                    {' '}
                    {showDescriptionCount && <span>left</span>}
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
                              className="coverURL"
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
              <textarea
                onKeyUp={this.handleReadingTime}
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPressII}
                id="body"
                name="body"
                type="text"
                className="formbox__fields--textarea"
                required
                minLength="10"
                value={body}
              />
              <div className="reading-time">
                <span>
                  {showBodyCount && <strong>{bodyWordCount}</strong>}
                  {' '}
                  {showBodyCount && <span>{bodyWordCount === 1 ? 'word' : 'words'}</span>}
                  {' '}
                </span>
                <span>
                  {showBodyCount && (
                    <strong>{readingTime === 0 ? `${readingTime} mins` : readingTime}</strong>
                  )}
                </span>
              </div>
            </div>
            {imageUploadFailed && <p>Image upload failed, try again</p>}
            <div className="formbox__control">
              <Button
                btnText={isPublishing ? 'Saving Article...' : 'Save'}
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
    publishingArticle: publishingArticleAction,
    saveEdited: saveEditedArticleAction
  },
  dispatch
);

/**
 * @method mapStateToProps
 * @description - Maps reducer states to component props
 * @param {object} * - destructured state object
 * @returns {object} - state
 */
export const mapStateToProps = ({ auth, article }) => {
  const { isLoggedIn } = auth;
  const { articleCardData, isPublishing } = article;
  return {
    isLoggedIn,
    isPublishing,
    articleCardData
  };
};

EditArticlePage.propTypes = {
  isLoggedIn: bool.isRequired,
  publishingArticle: func.isRequired,
  saveEdited: func.isRequired,
  isPublishing: bool.isRequired,
  articleCardData: objectProp.isRequired
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(EditArticlePage);

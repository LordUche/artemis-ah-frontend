import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import {
  bool, string, func, shape, number, object as objectProp, arrayOf, objectOf
} from 'prop-types';

// Components
import { SideNav } from '../components';
import TopNavBar from '../components/TopNav';
import ProfileOptionCard from '../components/ProfileOptionCard';
import AHLoginModal from './LoginModal';
import AHSignUpModal from './SignUpView';
import ArticleItemComponent from '../components/ArticleItem';
import ArticleItemComponentSkeleton from '../skeletonscreens/ArticleItem';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Pagination from '../components/Pagination';

// Images
import { bookmarkIcon } from '../assets/img__func/icons_svg';
import bin from '../assets/img/bin.png';


// Actions
import {
  bookmarkLoadingAction, getBookmarksAction, deleteBookmarkAction, clearErrorsAction
} from '../redux/actions/articleActions';

// Utils
import notifyUser from '../utils/Toast';

/**
 * @description setttings page view method
 * @param {string} article article chosen
 * @param {number} pageNo the current page
 * @returns {HTMLDivElement} profile
 */
export class BookmarkPage extends Component {
  state = {
    showLoginModal: false,
    showSignUpModal: false,
    showDeleteModal: false,
    chosenArticle: '',
    currentPage: 1,
    limit: 15
  }

  /**
   * @description lifecycle method that runs when the component mounts
   * @returns {undefined}
   */
  componentDidMount() {
    this.checkLoginStatus();
    const {
      token, isLoggedIn, clearErrors, bookmarkLoading, getBookmarks
    } = this.props;
    clearErrors();

    if (isLoggedIn) {
      bookmarkLoading();
      getBookmarks(token);
    }
  }


  /**
   * @description Checking login status and displaying login modal if user is not logged in
   * @returns {undefined}
   */
  checkLoginStatus = () => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.toggleLoginModal();
    }
  }

  toggleLoginModal = () => {
    const { showLoginModal } = this.state;
    this.setState({
      showLoginModal: !showLoginModal,
      showSignUpModal: false
    });
  }

  toggleSignUpModal = () => {
    const { showSignUpModal } = this.state;
    this.setState({
      showSignUpModal: !showSignUpModal,
      showLoginModal: false
    });
  }

  unbookmarkArticle = () => {
    const { chosenArticle } = this.state;
    const { deleteBookmark, token } = this.props;
    deleteBookmark(chosenArticle, token);
  }


  hideDeleteModal = () => {
    const { clearErrors } = this.props;
    clearErrors();

    this.setState({
      showDeleteModal: false,
      chosenArticle: {}
    });
  };

  revealDeleteModal = (article) => {
    const { clearErrors } = this.props;
    clearErrors();

    this.setState({
      showDeleteModal: true,
      chosenArticle: article
    });
  };

  /**
   * @description Get the bookmarked articles to display
   * @param {number} pageNo
   * @returns {undefined}
   */
  getArticles = (pageNo = 1) => {
    const { bookmarkedArticles } = this.props;
    const { limit } = this.state;
    const startIndex = (pageNo - 1) * limit;
    const endIndex = pageNo * limit;
    return bookmarkedArticles.slice(startIndex, endIndex);
  }

  /**
   * @method handlePagination
   * @description Handles pagination
   * @param {object} event React synthetic object
   * @returns {undefined}
   */
  handlePagination = (event) => {
    const { bookmarkedArticles, clearErrors } = this.props;
    const { limit } = this.state;
    clearErrors();
    const totalNumberOfArticles = bookmarkedArticles.length;
    const pageToDisplay = Number(event.currentTarget.dataset.page);
    const numberOfPages = Math.ceil(totalNumberOfArticles / limit);
    event.preventDefault();
    let newCurrentPage;
    const { id } = event.target;
    switch (id) {
      case 'first-page':
        newCurrentPage = 1;
        break;
      case 'last-page':
        newCurrentPage = numberOfPages;
        break;
      case 'next-page':
        newCurrentPage = pageToDisplay <= numberOfPages ? pageToDisplay : numberOfPages;
        break;
      case 'previous-page':
        newCurrentPage = pageToDisplay > 1 ? pageToDisplay : 1;
        break;
      default:
        newCurrentPage = 1;
        break;
    }
    this.setState({ currentPage: newCurrentPage, showDeleteModal: false });
  };

  /**
   * @returns {undefined}
   */
  render() {
    const {
      state,
      toggleLoginModal,
      toggleSignUpModal,
      hideDeleteModal,
      revealDeleteModal,
      unbookmarkArticle,
      getArticles,
      handlePagination
    } = this;
    const {
      showLoginModal, showSignUpModal, showDeleteModal, currentPage, limit
    } = state;
    const {
      history, bookmarkDeleted, bookmarkedArticles, errors, loading
    } = this.props;

    if (bookmarkDeleted.title) {
      notifyUser(toast(`Successfully removed the ${bookmarkDeleted.title} article from bookmarks`));
    }

    if (errors.message) {
      notifyUser(toast(`${errors.message}`, { className: 'error-toast' }));
    }

    const numberOfPages = Math.ceil(bookmarkedArticles.length / limit);

    return (
      <Fragment>
        {showLoginModal && <AHLoginModal onClose={() => history.push('/')} toggleSignUpModal={toggleSignUpModal} />}
        {showSignUpModal && <AHSignUpModal toggleSignUpModal={() => history.push('/')} revealLoginModal={toggleLoginModal} />}
        {showDeleteModal && !bookmarkDeleted.title && (
        <Modal
          onClose={hideDeleteModal}
          modalHeader="Are you sure you want to unbookmark this article?"
          customClass="delete_confirmation"
        >
          <Button
            imgSrc={bin}
            btnText="Remove from bookmarks"
            imgCustomClass="delete__article__btn__icon"
            customClass="delete__article__btn"
            onClick={unbookmarkArticle}
            isDisabled={loading}
          />
        </Modal>
        )}
        <TopNavBar />
        <ProfileOptionCard headerText="Bookmarked Articles" headerImg={bookmarkIcon(40, 40)}>
          <section className="bookmark_section">
            {!loading && !errors.message && !bookmarkedArticles.length && (<p className="bookmark_section_empty_text">You have not bookmarked any articles</p>)}
            {loading && !errors.message && !bookmarkedArticles.length && (
            <ArticleItemComponentSkeleton />
            )}
            {getArticles(currentPage).map(article => (
              <ArticleItemComponent
                key={article.slug}
                {...{
                  ...article,
                  readTime: article.readTime.text,
                  tag: article.Tag.name,
                  forBookmarks: true,
                  author: article.articleAuthor,
                  deleteBookmarkConfirmation: () => revealDeleteModal(article)
                }}
              />
            ))}
            {numberOfPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              handlePagination={handlePagination}
            />
            )}
          </section>
        </ProfileOptionCard>
        <SideNav isLoggedIn />
      </Fragment>
    );
  }
}

/**
 * @description Function for mapping redux store to component props
 * @param {object} store redux store
 * @returns {object} component props
 */
export const mapStateToProps = ({ auth, article }) => {
  const { isLoggedIn, token } = auth;
  const {
    bookmarkedArticles, loading, errors, bookmarkDeleted
  } = article;
  return {
    isLoggedIn,
    bookmarkedArticles,
    loading,
    errors,
    token,
    bookmarkDeleted
  };
};

/**
 * @description function to map dispatch to component as props
 * @param {object} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getBookmarks: getBookmarksAction,
    bookmarkLoading: bookmarkLoadingAction,
    deleteBookmark: deleteBookmarkAction,
    clearErrors: clearErrorsAction
  },
  dispatch
);


BookmarkPage.propTypes = {
  isLoggedIn: bool.isRequired,
  bookmarkedArticles: arrayOf(objectProp).isRequired,
  bookmarkDeleted: shape({
    title: string,
    User: objectProp,
    Tag: objectProp,
    body: string,
    coverUrl: string,
    createdAt: string,
    rating: string,
    readTime: objectProp,
    totalClaps: number,
    id: number
  }),
  loading: bool.isRequired,
  errors: objectOf(string),
  clearErrors: func.isRequired,
  token: string.isRequired,
  history: shape({
    action: string,
    block: func,
    createHref: func,
    go: func,
    goBack: func,
    goForward: func,
    length: number,
    listen: func,
    location: objectProp,
    push: func,
    replace: func
  }).isRequired,
  bookmarkLoading: func.isRequired,
  getBookmarks: func.isRequired,
  deleteBookmark: func.isRequired,
};

BookmarkPage.defaultProps = {
  errors: {},
  bookmarkDeleted: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkPage);

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import {
  bool, string, func, shape, number, object as objectProp, arrayOf, objectOf
} from 'prop-types';
import moment from 'moment';

// Components
import { SideNav } from '../components';
import TopNavBar from '../components/TopNav';
import ProfileOptionCard from '../components/ProfileOptionCard';
import AHLoginModal from './LoginModal';
import AHSignUpModal from './SignUpView';
import ArticleItemComponentSkeleton from '../skeletonscreens/ArticleItem';
import Pagination from '../components/Pagination';

// Images
import { historyIcon } from '../assets/img__func/icons_svg';


// Actions
import {
  historyLoadingAction, getHistoryAction, clearErrorsAction
} from '../redux/actions/articleActions';

// Utils
import notifyUser from '../utils/Toast';

/**
 * @description setttings page view method
 * @param {string} article article chosen
 * @param {number} pageNo the current page
 * @returns {HTMLDivElement} profile
 */
export class HistoryPage extends Component {
  state = {
    showLoginModal: false,
    showSignUpModal: false,
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
      token, isLoggedIn, clearErrors, historyLoading, getHistory
    } = this.props;
    clearErrors();

    if (isLoggedIn) {
      historyLoading();
      getHistory(token);
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

  /**
   * @description Get the articles in history to display
   * @param {number} pageNo
   * @returns {undefined}
   */
  getArticles = (pageNo = 1) => {
    const { userHistory } = this.props;
    const { limit } = this.state;
    const startIndex = (pageNo - 1) * limit;
    const endIndex = pageNo * limit;
    return userHistory.slice(startIndex, endIndex);
  }

  /**
   * @method handlePagination
   * @description Handles pagination
   * @param {object} event React synthetic object
   * @returns {undefined}
   */
  handlePagination = (event) => {
    const { userHistory, clearErrors } = this.props;
    const { limit } = this.state;
    clearErrors();
    const totalNumberOfArticles = userHistory.length;
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
    this.setState({ currentPage: newCurrentPage });
  };

  /**
   * @returns {undefined}
   */
  render() {
    const {
      state,
      toggleLoginModal,
      toggleSignUpModal,
      getArticles,
      handlePagination
    } = this;
    const {
      showLoginModal, showSignUpModal, currentPage, limit
    } = state;
    const {
      history, userHistory, errors, loading
    } = this.props;

    if (errors.message) {
      notifyUser(toast(`${errors.message}`, { className: 'error-toast' }));
    }

    const numberOfPages = Math.ceil(userHistory.length / limit);

    return (
      <Fragment>
        {showLoginModal && <AHLoginModal onClose={() => history.push('/')} toggleSignUpModal={toggleSignUpModal} />}
        {showSignUpModal && <AHSignUpModal toggleSignUpModal={() => history.push('/')} revealLoginModal={toggleLoginModal} />}
        <TopNavBar />
        <ProfileOptionCard headerText="History" headerImg={historyIcon(40, 40)}>
          <section className="bookmark_section">
            {!loading && !errors.message && !userHistory.length && (<p className="bookmark_section_empty_text">You have not read any articles</p>)}
            {loading && !errors.message && !userHistory.length && (
            <ArticleItemComponentSkeleton />
            )}
            {getArticles(currentPage).map(article => (
              <div className="history_item" onClick={() => history.push(`/article/${article.Article.slug}`)} role="presentation">
                <span className="history_article_title">{article.Article.title}</span>
                <div className="history_article_details">
                  <p>
                    {`${article.Article.User.firstname || article.Article.User.username} ${article.Article.User.lastname || ''}`}
                  </p>
                  <p>
                    {article.Article.Tag.name || ''}
                  </p>
                </div>
                <p className="history_time">{moment(article.createdAt).format('hh:mm:a, ddd DD MMM YYYY')}</p>
              </div>
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
    userHistory, loading, errors, bookmarkDeleted
  } = article;
  return {
    isLoggedIn,
    userHistory,
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
    getHistory: getHistoryAction,
    historyLoading: historyLoadingAction,
    clearErrors: clearErrorsAction
  },
  dispatch
);


HistoryPage.propTypes = {
  isLoggedIn: bool.isRequired,
  userHistory: arrayOf(objectProp).isRequired,
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
  historyLoading: func.isRequired,
  getHistory: func.isRequired,
};

HistoryPage.defaultProps = {
  errors: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);

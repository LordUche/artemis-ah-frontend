/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {
  func, arrayOf, object, bool, number, shape, string
} from 'prop-types';
import HelperUtils from '../utils/helperUtils';


// Import Component
import TopNavBar from '../components/TopNav';
import ArticleItemComponent from '../components/ArticleItem';
import Footer from '../components/Footer';
import BodyError from '../components/PageContentLoadError';

// Import Actions
import { getAllArticles, filterArticles, clearErrorsAction } from '../redux/actions/articleActions';
import ArticleItemSkeletonScreen from '../skeletonscreens/ArticleItem';

// Import Images
import background from '../assets/img/Ellipse.png';
import Pagination from '../components/Pagination';

/**
 * @returns {HTMLElement} explore page
 */
export class Explore extends Component {
  state = {
    currentPage: 1,
    selected: '',
  };

  /**
   * @method componentDidMount
   * @returns {Function} Action call
   */
  componentDidMount() {
    const { getArticles, getFiltered } = this.props;
    const { match } = this.props;
    const { path } = match;
    const { tag } = match.params;
    let initialFunction = '';
    let key = '';
    switch (path) {
      case '/explore':
        initialFunction = getArticles;
        break;
      case '/explore/:tag':
        key = tag;
        initialFunction = getFiltered;
        this.setState({ selected: { value: tag, label: tag } });
        break;
      default:
        initialFunction = getArticles;
    }
    initialFunction(key);
  }

  /**
   * @returns {object} Articles
   */
  getArticleData() {
    const {
      articles,
      errors,
      loading,
      getArticles
    } = this.props;
    let content = '';
    if (loading) content = <ArticleItemSkeletonScreen />;
    else if (Object.keys(errors).length > 0) {
      content = <BodyError onRetry={() => { getArticles(); }} />;
    } else if (!articles[0]) content = 'No article available';
    else {
      content = articles.map((article, index) => {
        const readTime = HelperUtils.estimateReadingTime(article.body);
        return (
          <ArticleItemComponent
            key={index.toString()}
            tag={(article.Tag ? article.Tag.name : 'no tag')}
            title={article.title}
            description={article.description}
            slug={article.slug}
            body={article.body}
            coverUrl={(article.coverUrl || '')}
            rating={article.rating}
            readTime={readTime.text}
            author={article.User.username}
            userActionClass="explore_hide"
          />
        );
      });
    }
    return content;
  }

  /**
   * @method handlePagination
   * @description Handles pagination
   * @param {object} event React synthetic object
   * @returns {undefined}
   */
  handlePagination = (event) => {
    const { totalNumberOfArticles, getArticles, limit } = this.props;
    const pageToDisplay = Number(event.currentTarget.dataset.page);
    const numberOfPages = Math.ceil(totalNumberOfArticles / limit);
    event.preventDefault();
    const { id } = event.target;
    switch (id) {
      case 'first-page':
        this.setState({ currentPage: 1 });
        break;
      case 'last-page':
        this.setState({ currentPage: numberOfPages });
        break;
      case 'next-page':
        this.setState({
          currentPage: pageToDisplay <= numberOfPages ? pageToDisplay : numberOfPages
        });
        break;
      case 'previous-page':
        this.setState({ currentPage: pageToDisplay > 1 ? pageToDisplay : 1 });
        break;
      default:
        this.setState({ currentPage: 1 });
        break;
    }
    getArticles(pageToDisplay);
  };

  /**
   * @method handleChange
   * @param {string} selected
   * @returns {string} selected
   */
  handleChange = (selected) => {
    const { history } = this.props;
    if (window.location.href === './explore') history.push(`/${selected.value}`);
    else history.push(`/explore/${selected.value}`);
    this.setState({ selected }, () => { this.loadFilteredArticles(); });
  }

  loadFilteredArticles = () => {
    const { match, getFiltered } = this.props;
    const { tag } = match.params;
    const keyword = tag.charAt(0).toUpperCase() + tag.slice(1);
    getFiltered(keyword);
  }

  redirect = () => {
    const { history } = this.props;
    history.push('/explore');
  }

  /**
   * @returns {HTMLElement} explore page
   */
  render() {
    const { selected } = this.state;
    const search = [
      { value: 'all', label: 'All' },
      { value: 'title', label: 'Title' },
      { value: 'author', label: 'Author' },
      { value: 'tag', label: 'Tag' }
    ];
    const tags = [
      { value: 'Art', label: 'Art' },
      { value: 'Food', label: 'Food' },
      { value: 'Technology', label: 'Technology' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Health', label: 'Health' }
    ];
    const customStyles = {
      control: base => ({
        ...base,
        backgroundColor: '#333333',
        borderRight: 'none',
        borderLeft: 'none',
        borderTop: 'none',
        fontSize: 15
      })
    };
    const { currentPage } = this.state;
    const {
      totalNumberOfArticles,
      limit,
      errors,
      clear,
      getArticles
    } = this.props;
    const numberOfPages = Math.ceil(totalNumberOfArticles / limit);
    return errors.message === 'No article found with that match' ? (clear() && getArticles() && <Redirect to="/explore" />) : (
      <div className="explore">
        <div className="explore_header">
          <TopNavBar navID="explore_nav" />
          <img src={background} alt="" className="explore_header__img" />
          <div className="explore_header__text">Explore</div>
          <input
            type="text"
            className="explore_header__input"
            placeholder="Search by title, author or tag"
            id="explore_input"
          />
          <div className="explore_header_filter">
            <div className="explore_header_filter__fields">
              <span className="explore_label">Search By</span>
              <Select
                options={search}
                className="explore_select"
                classNamePrefix="explore_select_input"
                defaultValue={search[0]}
                styles={customStyles}
              />
            </div>
            <div className="explore_header_filter__fields">
              <span className="explore_label">Filter By</span>
              <Select
                options={tags}
                className="explore_select"
                classNamePrefix="explore_select_input"
                onChange={this.handleChange}
                value={selected}
                styles={customStyles}
              />
            </div>
          </div>
        </div>
        <div className="explore_body">
          {this.getArticleData()}
        </div>
        {numberOfPages > 1 && (
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            handlePagination={this.handlePagination}
          />
        )}
        <Footer />
      </div>
    );
  }
}

/**
 * @description Maps state to props
 * @param {object} state
 * @returns {object} state
 */
function mapStateToProps({ article }) {
  const {
    articles, totalNumberOfArticles, limit, loading, errors
  } = article;
  return {
    articles,
    loading,
    errors,
    totalNumberOfArticles,
    limit
  };
}

/**
 * @deprecated Map dispatch to props
 * @param {object} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getArticles: getAllArticles,
      getFiltered: filterArticles,
      clear: clearErrorsAction,
    },
    dispatch
  );
}

Explore.propTypes = {
  getArticles: func.isRequired,
  getFiltered: func.isRequired,
  clear: func.isRequired,
  articles: arrayOf(object).isRequired,
  loading: bool.isRequired,
  errors: object.isRequired,
  totalNumberOfArticles: number.isRequired,
  limit: number.isRequired,
  match: shape({
    isExact: bool,
    params: object,
    path: string,
    url: string
  }).isRequired,
  history: shape({
    action: string,
    block: func,
    createHref: func,
    go: func,
    goBack: func,
    goForward: func,
    length: number,
    listen: func,
    location: object,
    push: func,
    replace: func
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);

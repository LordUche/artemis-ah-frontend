/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, arrayOf, object, bool, number
} from 'prop-types';

// Import Component
import TopNavBar from '../components/TopNav';
import ArticleItemComponent from '../components/ArticleItem';
import Footer from '../components/Footer';
import BodyError from '../components/PageContentLoadError';

// Import Actions
import { getAllArticles } from '../redux/actions/articleActions';
import ArticleItemSkeletonScreen from '../skeletonscreens/ArticleItem';

// Import Images
import background from '../assets/img/Ellipse.png';
import Pagination from '../components/Pagination';

/**
 * @returns {HTMLElement} explore page
 */
export class Explore extends Component {
  state = {
    currentPage: 1
  };

  /**
   * @method componentDidMount
   * @returns {Function} Action call
   */
  componentDidMount() {
    const { getArticles } = this.props;
    getArticles();
  }

  /**
   * @returns {object} Articles
   */
  getArticleData() {
    const { articles, errors, loading } = this.props;
    let content = '';
    if (loading) content = <ArticleItemSkeletonScreen />;
    else if (Object.keys(errors).length > 0) {
      content = <BodyError onRetry={() => { this.getArticleData(); }} />;
    } else if (!articles[0]) content = 'No article available';
    else {
      content = articles.map((article, index) => (
        <ArticleItemComponent
          key={index.toString()}
          tag={(article.Tag ? article.Tag.name : 'no tag')}
          title={article.title}
          description={article.description}
          slug={article.slug}
          coverUrl={(article.coverUrl || '')}
          rating={article.rating}
          readTime={article.readTime.text}
          author={article.User.username}
          userActionClass="explore_hide"
        />
      ));
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
   * @returns {HTMLElement} skeleton
   */
  cardSkeleton() {
    const { loading } = this.props;
    if (loading) return <ArticleItemSkeletonScreen />;
  }

  /**
   * @returns {HTMLElement} body error
   */
  ShowBodyError() {
    const { errors } = this.props;
    if (Object.keys(errors).length > 0) {
      return (
        <BodyError
          onRetry={() => {
            this.getArticleData();
          }}
        />
      );
    }
  }

  /**
   * @returns {HTMLElement} explore page
   */
  render() {
    const search = [
      { value: 'all', label: 'All' },
      { value: 'title', label: 'Title' },
      { value: 'author', label: 'Author' },
      { value: 'tag', label: 'Tag' }
    ];
    const tags = [
      { value: '', label: 'Select Tag' },
      { value: 'art', label: 'Art' },
      { value: 'food', label: 'Food' },
      { value: 'technology', label: 'Technology' },
      { value: 'finance', label: 'Finance' },
      { value: 'health', label: 'Health' }
    ];
    const customStyles = {
      control: base => ({
        ...base,
        backgroundColor: '#333333',
        borderRight: 'none',
        borderLeft: 'none',
        borderTop: 'none',
        fontSize: 20
      })
    };
    const { currentPage } = this.state;
    const { totalNumberOfArticles, limit } = this.props;
    const numberOfPages = Math.ceil(totalNumberOfArticles / limit);
    return (
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
                defaultValue={tags[0]}
                styles={customStyles}
              />
            </div>
          </div>
        </div>
        <div className="explore_body">
          {/* {this.cardSkeleton()}
          {this.ShowBodyError()} */}
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
      getArticles: getAllArticles
    },
    dispatch
  );
}

Explore.propTypes = {
  getArticles: func.isRequired,
  articles: arrayOf(object).isRequired,
  loading: bool.isRequired,
  errors: object.isRequired,
  totalNumberOfArticles: number.isRequired,
  limit: number.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);

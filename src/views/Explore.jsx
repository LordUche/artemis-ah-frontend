import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, arrayOf, object } from 'prop-types';
import TopNavBar from '../components/TopNav';
import ArticleItem from '../components/ArticleItem';
import Footer from '../components/Footer';

// Import Actions
import { getAllArticles } from '../redux/actions/articleActions';

import background from '../assets/img/Ellipse.png';

/**
 * @returns {HTMLElement} explore page
 */
class Explore extends Component {
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
    const { articles } = this.props;
    return (
      articles.map((article, index) => (
        <ArticleItem
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
      ))
    );
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
        color: 'white',
        borderRight: 'none',
        borderLeft: 'none',
        borderTop: 'none',
        fontSize: 20,
      }),
    };
    return (
      <div className="explore">
        <div className="explore_header">
          <TopNavBar />
          <img src={background} alt="" className="explore_header__img" />
          <div className="explore_header__text">Explore</div>
          <input type="text" className="explore_header__input" placeholder="Search by title, author or tag" id="explore_input" />
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
          {this.getArticleData()}
        </div>
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
  const { articles, errors } = article;
  return { articles, errors };
}

/**
 * @deprecated Map dispatch to props
 * @param {object} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArticles: getAllArticles
  }, dispatch);
}

Explore.propTypes = {
  getArticles: func.isRequired,
  articles: arrayOf(object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

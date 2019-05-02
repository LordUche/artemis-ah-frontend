import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import {
  shape, string, number, func, object
} from 'prop-types';
import { get } from 'axios';
import BASE_URL from '../redux/actions';
import 'regenerator-runtime';
import SkeletonCard from './SkeletonCard';

/**
 * @class FeaturedCategories
 * @description FeaturedCategories - Featured categories component for Landing Page view
 */
class FeaturedCategories extends Component {
  state = {
    width: '85%',
    slidesToShow: 4,
    featuredArticles: []
  };

  /**
   * @method componentDidMount
   * @description The componentDidMout lifecycle
   * @returns {undefined}
   */
  componentDidMount() {
    let viewPort = window.innerWidth;
    this.setViewportState(viewPort);
    window.addEventListener('resize', (event) => {
      viewPort = event.target.innerWidth;
      this.setViewportState(viewPort);
    });
    this.retrieveFeaturedArticles();
  }

  /**
   * @method setViewportState
   * @param {number} viewPort - viewport width
   * @description sets the state viewport state
   * @returns {undefined}
   */
  setViewportState = (viewPort) => {
    switch (true) {
      case viewPort <= 805:
        this.setState({ slidesToShow: 1, width: '100%' });
        break;
      case viewPort > 805 && viewPort <= 1000:
        this.setState({ slidesToShow: 2, width: '82%' });
        break;
      case viewPort > 1000 && viewPort <= 1200:
        this.setState({ slidesToShow: 3, width: '82%' });
        break;
      default:
        this.setState({ slidesToShow: 4, width: '85%' });
        break;
    }
  };

  /**
   * @method sortArticles
   * @param {array} articles - the article object
   * @param {string} tag - the article tag to sort by
   * @description sorts and returns the featured article for a given tag
   * @returns {array} - The sorted articles array
   */
  sortArticles = (articles, tag) => {
    const filteredArticles = articles.filter(article => article.Tag.name === tag);
    const featuredArticle = filteredArticles.sort(
      (currentArticle, nextArticle) => nextArticle.totalClaps - currentArticle.totalClaps
    );

    return featuredArticle[0];
  };

  /**
   * @method retrieveFeaturedArticles
   * @returns {undefined}
   */
  async retrieveFeaturedArticles() {
    const response = await get(`${BASE_URL}/articles`);
    const { articles } = response.data;
    const featuredArtArticle = this.sortArticles(articles, 'Art');
    const featuredHealthArticle = this.sortArticles(articles, 'Health');
    const featuredTechArticle = this.sortArticles(articles, 'Technology');
    const featuredFinanceArticle = this.sortArticles(articles, 'Finance');
    const featuredFoodArticle = this.sortArticles(articles, 'Food');

    this.setState({
      featuredArticles: [
        featuredArtArticle,
        featuredFoodArticle,
        featuredTechArticle,
        featuredHealthArticle,
        featuredFinanceArticle
      ]
    });
  }

  /**
   * @method render
   * @returns {JSX} the FeaturedCategories Component
   */
  render() {
    const { history } = this.props;
    const { width, slidesToShow, featuredArticles } = this.state;
    const loadingData = new Array(5).fill().map(() => <SkeletonCard />);
    const featuredArticlesCards = featuredArticles.map(article => (
      <div
        key={article.id}
        className="featured__card"
        style={{ background: `url(${article.coverUrl})`, backgroundSize: 'cover' }}
      >
        <span
          className="category"
          role="presentation"
          onClick={() => history.push(`./explore/${article.Tag.name}`)}
        >
          {article.Tag.name}
        </span>
        <span
          role="presentation"
          onClick={() => history.push(`./article/${article.slug}`)}
          className="title"
        >
          {article.title}
        </span>
      </div>
    ));
    const totalSlides = featuredArticles.length;
    return (
      <section className="segment featured">
        <h3 className="segment__title">Featured Categories</h3>
        <p className="segment__text">
          Create and share your story with an amazing community of authors and avid readers.
        </p>
        <div className="featured__articles">
          <Carousel
            slidesToShow={slidesToShow}
            width={width}
            renderCenterLeftControls={({ previousSlide, currentSlide }) => {
              if (currentSlide !== 0 && slidesToShow > 1) {
                return (
                  <button className="slider__btn previous" onClick={previousSlide} type="button">
                    <i className="fas fa-angle-left" />
                  </button>
                );
              }
            }}
            renderCenterRightControls={({ nextSlide, currentSlide }) => {
              const lastSlideItem = totalSlides - slidesToShow;
              if (currentSlide !== lastSlideItem && slidesToShow > 1) {
                return (
                  <button className="slider__btn next" onClick={nextSlide} type="button">
                    <i className="fas fa-angle-right" />
                  </button>
                );
              }
            }}
            renderBottomCenterControls={({ currentSlide }) => (slidesToShow === 1 ? `${currentSlide + 1} of ${totalSlides}` : null)
            }
          >
            {featuredArticlesCards.length ? featuredArticlesCards : loadingData}
          </Carousel>
        </div>
        <button className="btn btn-explore" type="button" onClick={() => history.push('./explore')}>
          Explore Stories
          {' '}
          <i className="fas fa-angle-right" />
        </button>
      </section>
    );
  }
}

FeaturedCategories.propTypes = {
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
  }).isRequired
};

export default FeaturedCategories;

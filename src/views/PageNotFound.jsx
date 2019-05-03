import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TopNavComp from '../components/TopNav';
import Footer from '../components/Footer';
import notfoundimage from '../assets/img/404.svg';

export default () => (
  <Fragment>
    <TopNavComp />
    <div className="msg" id="not_found_wrapper">
      <img src={notfoundimage} alt="notfound" className="not_foung_image" />
      <h2 className="not_found_text">
        Ooops!!! We couldn’t find the page you’re looking for. Try
        {' '}
        <Link to="/explore">
          {' '}
          <span className="explore_link_nf">exploring for articles</span>
        </Link>
        {' '}
        instead.
      </h2>
    </div>
    <div className="fixed_footer">
      <Footer />
    </div>
  </Fragment>
);

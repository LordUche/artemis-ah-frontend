import React from 'react';
import Select from 'react-select';
import TopNavBar from '../components/TopNav';
// import InputField from '../components/InputField';
// import Footer from '../components/Footer';


import background from '../assets/img/Ellipse.png';

/**
 * @returns {HTMLElement} explore page
 */
const Explore = () => {
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
    <div>
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
    </div>
  );
};

export default Explore;

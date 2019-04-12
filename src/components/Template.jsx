import React from 'react';
import { connect } from 'react-redux';
import { node as nodeProp, bool as boolProp } from 'prop-types';
import { TopNav, SideNav } from '.';

/**
 * @description Returns a template containing the top and side navs. Just wrap
 *              this around your view component.
 * @param {node} children The main content
 * @param {bool} isLoggedIn True if user logged or false otherwise.
 * @returns {node} Returns the template.
 */
const Template = ({ children, isLoggedIn }) => {
  const rootProps = {};
  if (isLoggedIn) {
    rootProps.className = 'has-side-nav';
  }

  return (
    <div {...rootProps}>
      <TopNav />
      {children}
      {isLoggedIn && (
        <SideNav />
      )}
    </div>
  );
};

Template.propTypes = {
  children: nodeProp.isRequired,
  isLoggedIn: boolProp.isRequired,
};

/**
 * @description Maps redux state to the component's props.
 * @param {object} state The state of the application from redux store
 * @return {object} Props for ProfilePage component.
 */
const mapState2Props = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapState2Props)(Template);

/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import changeNameAction from '../redux/actions';

/**
 * @description landing page
 * @returns {HTMLDivElement} landing page
 */
class LandingPage extends Component {
    // eslint-disable-next-line react/prop-types
    login = () => this.props.changeName();

    /**
     * @returns {HTMLElement} div
     */
    render() {
      return (
        <div>
          <header>
          Welcome to Author&apos;s haven frontend
          </header>
          <section>
            <Link to="profile">
                Profile
            </Link>
          </section>
          <section>
            <button type="submit" onClick={this.login}>{this.props.name}</button>
          </section>
        </div>
      );
    }
}

/**
 * @param {object} dispatch
 * @returns {Function} changeName
 */
function mapDispatchToProps(dispatch) {
  return {
    changeName: () => dispatch(changeNameAction())
  };
}

/**
 * @description mpa state to props
 * @param {*} param0
 * @returns {object} state
 */
function mapStateToProps({ name }) {
  return { name: name.name };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

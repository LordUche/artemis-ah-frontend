import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import LandingPageView from '../../views/LandingPage';
import reducers from '../../redux/reducers';

describe('Landing Page Component', () => {
  it('should have match the given snapshot', () => {
    const store = createStore(reducers, applyMiddleware(ReduxPromise));
    const tree = renderer.create(
      <Provider store={store}>
        <LandingPageView />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

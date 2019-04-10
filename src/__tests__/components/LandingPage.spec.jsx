import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import LandingPage from '../../views/LandingPage';
import reducers from '../../redux/reducers';

describe('Landing Page Component', () => {
  const store = createStore(reducers, applyMiddleware(ReduxPromise));
  it('should have match the given snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <LandingPage />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

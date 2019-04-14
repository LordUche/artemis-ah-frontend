import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import sinon from 'sinon';
import LandingPageStore, { LandingPage } from '../../views/LandingPage';
import reducers from '../../redux/reducers';
import Hero from '../../components/Hero';

const { smoothScrollToAbout } = new LandingPage();

describe('Landing Page Component', () => {
  const store = createStore(reducers, applyMiddleware(ReduxPromise));
  it('should have match the given snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <LandingPageStore />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should test for class methods', () => {
    const mockRevealModal = jest.fn();
    const mockHideModal = jest.fn();
    const mockAction = jest.fn();
    const landing = shallow(<LandingPage loginUserViaSocialMedia={mockAction} />);
    const hero = shallow(
      <Hero
        smoothScrollListener={() => smoothScrollToAbout()}
        showLoginModal={false}
        revealLoginModal={mockRevealModal}
        hideLoginModal={mockHideModal}
        isLoggedIn={false}
      />
    );

    sinon.stub(window, 'scrollBy');
    landing.instance().hideLoginModal();
    landing.instance().revealLoginModal();
    landing.instance().componentWillMount();
    landing.instance().validateURLPayload();
    expect(landing.find('Hero').exists()).toBe(true);
    expect(hero.find('.scroll').exists()).toBe(true);
    hero.find('.scroll').simulate('click');
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
// import { mount } from 'enzyme';
import LandingPageView from '../../views/LandingPage';
// import { SignUp } from '../../components/SignupModal';
import reducers from '../../redux/reducers';
// import Hero from '../../components/Hero';


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

// describe('Reveal modals on landing page', () => {
//   // const mockFunction = jest.fn();
//   it('should find user sign up', () => {
//     const mockFunction = jest.fn();
//     // const store = createStore(reducers, applyMiddleware(ReduxPromise));
//     const landingPage = mount(
//       <LandingPageView
//         toggleModal={mockFunction}
//       >
//         <Hero
//           smoothScrollListener={() => this.smoothScrollToAbout()}
//           showLoginModal
//           revealLoginModal
//           hideLoginModal
//           toggleModal={mockFunction}
//           toggleLoginModal={mockFunction}
//         />
//         <SignUp
//           toggleVerify={mockFunction}
//           toggleModal={mockFunction}
//           showSignup
//         />
//       </LandingPageView>
//     );
// landingPage.setState({ showSignup: true });
// const button = landingPage.find('.click');
// landingPage.setState({ showSignup: false });
// expect(button.exists()).toBe(true);
// button.simulate('click');
// expect(mockFunction).toHaveBeenCalled();
//   });
// });

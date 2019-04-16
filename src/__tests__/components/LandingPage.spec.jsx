import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { LandingPage } from '../../views/LandingPage';
import Hero from '../../components/Hero';

const { smoothScrollToAbout } = new LandingPage();

describe('Landing Page Component', () => {
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
    landing.instance().toggleSignUpModal();
    landing.instance().componentWillMount();
    landing.instance().validateURLPayload();
    expect(landing.find('Hero').exists()).toBe(true);
    expect(hero.find('.scroll').exists()).toBe(true);
    hero.find('.scroll').simulate('click');
  });
});

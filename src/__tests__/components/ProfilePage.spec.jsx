import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import { post as axiosPost } from 'axios';
import profileReducer from '../../redux/reducers/profileReducer';
import {
  fetchUserDetails,
  fetchUserArticles,
  fetchUserFollowing,
  fetchUserFollowers,
} from '../../redux/actions/profileActions';
import {
  TAB_ARTICLES,
  TAB_FOLLOWING,
  TAB_FOLLOWERS
} from '../../constants/profileConstants';
import ProfilePage from '../../views/ProfilePage';

let user;

/**
 * @description Mocks the user reducer
 * @returns {object} Returns the initial state.
 */
const mockUserReducer = () => ({
  username: user.username,
});

/**
 * @description Mocks the auth reducer
 * @returns {object} Returns the initial state.
 */
const mockAuthReducer = () => ({
  isLoggedIn: true,
  token: user.token,
});

let profilePage;
let store;

describe('Test the profile page.', () => {
  beforeAll((done) => {
    axiosPost('https://authorshaven.herokuapp.com/api/users/login', {
      name: 'ayo',
      password: 'admin123456',
    })
      .then((response) => {
        ({ user } = response.data);

        done();
      });
  });

  beforeAll((done) => {
    store = createStore(combineReducers({
      profile: profileReducer,
      user: mockUserReducer,
      auth: mockAuthReducer,
    }));

    profilePage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage
            match={{
              params: {},
            }}
          />
        </BrowserRouter>
      </Provider>
    );

    done();
  });

  describe('Before user data is fetched', () => {
    it('should show a skeleton screen', (done) => {
      profilePage.update();

      expect(profilePage.find('.user-details-skeleton-screen').exists()).toBe(true);

      done();
    });
  });

  describe('After user data is fetched', () => {
    it('It should show the correct user details after user data has been fetched', (done) => {
      Promise.all([
        fetchUserDetails(user.username, user.token, store.dispatch)
      ])
        .then(() => {
          profilePage.update();

          expect(profilePage.find('.user-details-skeleton-screen').exists()).toBe(false);

          const { profile } = store.getState();

          expect(profilePage.find('.profile-section__blue-bg__data__fullname').text()).toBe(`${profile.user.fullname}`);
          expect(profilePage.find('.profile-section__blue-bg__data__username').text()).toBe(`@${profile.user.username}`);
          expect(profilePage.find('.profile-section__blue-bg__data__about').text()).toBe(profile.user.about);

          done();
        });
    });

    it('Since the current user is viewing his profile, he should see a button to edit his profile', (done) => {
      expect(profilePage.find('.profile-section__blue-bg__data__btn-wrapper button').text())
        .toBe('Edit Profile');

      done();
    });
  });

  describe('Test feature to fetch articles in profile page.', () => {
    it('it should show a skeleton screen if articles are fetching', (done) => {
      expect(profilePage.find('.article-item-skeleton-screen').exists()).toBe(true);

      done();
    });

    it('it should show list of articles or message for no articles', (done) => {
      Promise.all([
        fetchUserArticles(user.username, store.dispatch)
      ]).then(() => {
        profilePage.update();

        // It should not show a skeleton screen.
        expect(profilePage.find('.article-item-skeleton-screen').exists()).toBe(false);

        const { profile } = store.getState();

        if (profile.tabContent[TAB_ARTICLES].articles.length > 0) {
          expect(profilePage.find('ArticleItem').exists()).toBe(true);
        } else {
          expect(profilePage.find('.article-list .no-result__msg').text()).toBe("You don't have any article.");
        }

        done();
      });
    });
  });

  describe('Test feature to fetch following in profile page.', () => {
    it('It should show skeleton screen when the data is loading', (done) => {
      profilePage.find('.profile-section__body__tab-container__tab')
        .at(1)
        .simulate('click', { preventDefault: () => 1 });

      expect(profilePage.find('.profile-section__body__content__title').text()).toBe('People you follow');
      expect(profilePage.find('.user-item-skeleton-screen').exists()).toBe(true);

      done();
    });

    it('It should show a list of users or message for no following', (done) => {
      Promise.all([
        fetchUserFollowing(user.username, store.dispatch)
      ])
        .then(() => {
          profilePage.update();

          profilePage.find('.profile-section__body__tab-container__tab')
            .at(1)
            .simulate('click', { preventDefault: () => 1 });

          expect(profilePage.find('.profile-section__body__content__title').text()).toBe('People you follow');

          expect(profilePage.find('.user-list .user-item-skeleton-screen').exists()).toBe(false);

          const { profile } = store.getState();
          if (profile.tabContent[TAB_FOLLOWING].following.length > 0) {
            expect(profilePage.find('.profile-section__body__content UserListItem').exists()).toBe(true);
          } else {
            expect(profilePage.find('.user-list .no-result').text()).toBe('You are not following anyone.');
          }

          done();
        });
    });
  });

  describe('Test feature to fetch followers in profile page.', () => {
    it('It should show a skeleton screen when the data is loading', (done) => {
      profilePage.find('.profile-section__body__tab-container__tab')
        .at(2)
        .simulate('click', { preventDefault: () => 1 });

      expect(profilePage.find('.profile-section__body__content__title').text()).toBe('Your Followers');
      expect(profilePage.find('.user-list .user-item-skeleton-screen').exists()).toBe(true);

      done();
    });

    it('It should show a list of users or message for no follower', (done) => {
      Promise.all([
        fetchUserFollowers(user.username, store.dispatch)
      ])
        .then(() => {
          profilePage.update();

          profilePage.find('.profile-section__body__tab-container__tab')
            .at(2)
            .simulate('click', { preventDefault: () => 1 });

          expect(profilePage.find('.profile-section__body__content__title').text()).toBe('Your Followers');

          expect(profilePage.find('.user-list .user-item-skeleton-screen').exists()).toBe(false);

          const { profile } = store.getState();
          if (profile.tabContent[TAB_FOLLOWERS].followers.length > 0) {
            expect(profilePage.find('.profile-section__body__content UserListItem').exists()).toBe(true);
          } else {
            expect(profilePage.find('.user-list .no-result').text()).toBe("You don't have any follower");
          }

          done();
        });
    });
  });

  describe('Test feature to edit user profile.', () => {
    it('It should show update form.', (done) => {
      const editBtn = profilePage.find('.profile-section__blue-bg__data__btn-wrapper button');
      editBtn.simulate('click');
      expect(editBtn.text()).toBe('Save Changes');
      expect(profilePage.find('.profile-section__blue-bg__data__about--edit').exists()).toBe(true);

      done();
    });
  });
});

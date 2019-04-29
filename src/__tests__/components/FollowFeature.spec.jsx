import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import { post as axiosPost } from 'axios';
import profileReducer from '../../redux/reducers/profileReducer';
import {
  fetchUserDetails,
  followUser,
  unfollowUser
} from '../../redux/actions/profileActions';
import ProfilePageView from '../../views/ProfilePage';

let user;

/**
 * @description Mocks the user reducer
 * @returns {object} Returns the initial state.
 */
const mockUserReducer = () => ({
  username: user.username,
});

/**
 * @description Mocks the article reducer
 * @returns {object} Returns the initial state.
 */
const mockArticleReducer = () => ({
  confirmationModal: false
});

/**
* @description Mocks the notification reducer
* @returns {object} Returns the initial state.
*/
const notificationMockReducer = () => ({
  hasNewNotifications: true,
  notificationNumber: 1,
  notificationsData: [{}]
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
      article: mockArticleReducer,
      notifications: notificationMockReducer
    }));

    profilePage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePageView
            match={{
              params: {
                username: 'danprocoder'
              },
            }}
            history={{
              push: () => 'push'
            }}
          />
        </BrowserRouter>
      </Provider>
    );

    done();
  });

  describe('Test feature to follow/unfollow a user.', () => {
    it('It should load the next profile', async (done) => {
      Promise.all([
        fetchUserDetails('danprocoder', user.token, store.dispatch)
      ])
        .then(() => {
          profilePage.update();

          expect(profilePage.find('.profile-section__blue-bg__data__username').text()).toBe('@danprocoder');
          expect(profilePage.find('.profile-section__blue-bg__data__btn-wrapper button').text()).toBe('Follow');

          done();
        });
    });

    it('The text on the follow toggle button should change to `unfollow` when the button is pressed', (done) => {
      Promise.all([
        followUser(user.token, 'danprocoder', store.dispatch)
      ])
        .then(() => {
          profilePage.update();

          expect(profilePage.find('.profile-section__blue-bg__data__username').text()).toBe('@danprocoder');
          expect(profilePage.find('.profile-section__body__tab-container__tab__inner__body__num').at(2).text()).toBe('1');
          expect(profilePage.find('.profile-section__blue-bg__data__btn-wrapper button').text()).toBe('Unfollow');

          done();
        });
    });

    it('The text on the follow toggle button should change back to `follow` when the button is pressed again', (done) => {
      Promise.all([
        unfollowUser(user.token, 'danprocoder', store.dispatch)
      ])
        .then(() => {
          profilePage.update();

          expect(profilePage.find('.profile-section__blue-bg__data__username').text()).toBe('@danprocoder');
          expect(profilePage.find('.profile-section__body__tab-container__tab__inner__body__num').at(2).text()).toBe('0');
          expect(profilePage.find('.profile-section__blue-bg__data__btn-wrapper button').text()).toBe('Follow');

          done();
        });
    });
  });
});

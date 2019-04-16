import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { post as axiosPost } from 'axios';
import profileReducer from '../../redux/reducers/profileReducer';
import {
  fetchUserDetails
} from '../../redux/actions/profileActions';
import ProfilePage from '../../views/ProfilePage';

const initialState = {
  auth: {
    isLoggedIn: true,
  },
  user: {},
};

let profilePage;

let dispatch;

describe('Test the profile page.', () => {
  beforeEach((done) => {
    axiosPost('https://authorshaven.herokuapp.com/api/users/login', {
      name: 'ayo-oluwa.adebayo@andela.com',
      password: 'admin123456',
    })
      .then((response) => {
        initialState.auth.token = response.data.user.token;

        done();
      });
  });

  beforeEach(() => {
    const store = configureStore(profileReducer)(initialState);
    ({ dispatch } = store);

    store.dispatch({ type: 'NO_ACTION' });

    profilePage = mount(
      <Provider store={store}>
        <ProfilePage
          match={{
            params: {},
          }}
        />
      </Provider>
    );
  });

  it('It should load the right userdata', () => {
    fetchUserDetails('ayo', initialState.auth.token, dispatch);
    profilePage.find('blue-bg');
  });
});

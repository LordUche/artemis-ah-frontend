import 'babel-polyfill';
import moxios from 'moxios';
import {
  updateUserDetails, saveUserDetails, updateUserNotificationDetails, updateStorage
} from '../../../redux/actions/profileActions';
import { PROFILE_DETAILS_UPDATING, PROFILE_DETAILS_UPDATED, PROFILE_DETAILS_UPDATE_ERROR } from '../../../redux/actionTypes';

describe('Testing profile action', () => {
  it('should update profile', () => {
    const token = 'token_ghdasdhgddkjashjhjksadhj_token';
    const updatedBio = 'Go on fam again!!! Wooohooo!!!';
    const updatedUsername = 'abcd';
    const updatedLastname = 'abcd';
    const updatedFirstname = 'abcd';
    let selectedImage = 'image.jpg';
    const dispatch = jest.fn();
    updateUserDetails(
      token, updatedBio, updatedUsername, updatedFirstname, updatedLastname, selectedImage, dispatch
    );
    updateUserDetails(
      token,
      updatedBio,
      updatedUsername,
      updatedFirstname,
      updatedLastname,
      selectedImage = false,
      dispatch
    );
  });

  it('should update profile', () => {
    const token = 'token_ghdasdhgddkjashjhjksadhj_token';
    const updatedBio = 'Go on fam again!!! Wooohooo!!!';
    const updatedUsername = 'abcd';
    const updatedLastname = 'abcd';
    const updatedFirstname = 'abcd';
    let uploadedImageUrl = 'image.jpg';
    const dispatch = jest.fn();
    saveUserDetails(
      token,
      updatedBio,
      updatedUsername,
      updatedFirstname,
      updatedLastname,
      uploadedImageUrl,
      dispatch
    );
    saveUserDetails(
      token,
      updatedBio,
      updatedUsername,
      updatedFirstname,
      updatedLastname,
      uploadedImageUrl = false,
      dispatch
    );
  });
});

describe('Test Profile settings', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should update users notifications settings when api call is successful', async () => {
    const mockStore = [];
    /**
     * @param {object} action action to be dispatched
     * @returns {undefined}
     */
    const mockDispatch = action => mockStore.push(action);

    const mockToken = 'eee';

    const mockDetails = {
      emailNotification: false,
      inAppNotification: false
    };

    const mockResponse = {
      message: 'Successful'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: mockResponse });
    });

    await updateUserNotificationDetails(mockToken, mockDetails, mockDispatch);
    expect(mockStore[0].type).toEqual(PROFILE_DETAILS_UPDATING);
    expect(mockStore[1].type).toEqual(PROFILE_DETAILS_UPDATED);
  });
  it('should return error if request fails', async () => {
    const mockStore = [];
    /**
     * @param {object} action action to be dispatched
     * @returns {undefined}
     */
    const mockDispatch = action => mockStore.push(action);

    const mockToken = 'eee';

    const mockDetails = {
      emailNotification: false,
      inAppNotification: false
    };

    const mockResponse = {
      message: 'Network Error'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500, response: mockResponse });
    });

    await updateUserNotificationDetails(mockToken, mockDetails, mockDispatch);
    expect(mockStore[0].type).toEqual(PROFILE_DETAILS_UPDATING);
    expect(mockStore[1].type).toEqual(PROFILE_DETAILS_UPDATE_ERROR);
  });
});

describe('updating data in storage', () => {
  it('should update data in storage', () => {
    const mockLocalStorage = {
      authorsHavenBio: 'abc',
      authorsHavenEmail: 'jfjf@djd.com',
      authorsHavenImage: 'kjfj.png',
      authorsHavenUsername: 'kjfjjfnn'
    };
    const mockData = {
      bio: 'abc',
      email: 'def@yahoo.com',
      username: 'ghi',
      image: 'jkl.png'
    };
    updateStorage(mockLocalStorage, mockData);
    expect(mockLocalStorage.authorsHavenUsername).toEqual(mockData.username);
    expect(mockLocalStorage.authorsHavenEmail).toEqual(mockData.email);
    expect(mockLocalStorage.authorsHavenBio).toEqual(mockData.bio);
    expect(mockLocalStorage.authorsHavenImage).toEqual(mockData.image);
  });
});

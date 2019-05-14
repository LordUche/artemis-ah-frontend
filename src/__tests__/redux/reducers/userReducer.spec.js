import userReducer, { initialState } from '../../../redux/reducers/userReducer';

describe('user reducer initial state', () => {
  it('should return the right state when local storage is empty', () => {
    const mockLocalStorage = {};
    const mockSessionStorage = {};
    const state = userReducer(initialState(mockLocalStorage, mockSessionStorage), {});
    expect(state.username).toEqual('');
    expect(state.email).toEqual('');
    expect(state.bio).toEqual('');
    expect(state.image).toEqual('');
  });
  it('should fetch the user details stored in local storage if present', () => {
    const mockLocalStorage = {
      authorsHavenUsername: 'abc',
      authorsHavenEmail: 'abc@yahoo.com',
      authorsHavenBio: 'blabla',
      authorsHavenImage: 'abc.jpg'
    };
    const mockSessionStorage = {};
    const state = userReducer(initialState(mockLocalStorage, mockSessionStorage), {});
    expect(state.username).toEqual('abc');
    expect(state.email).toEqual('abc@yahoo.com');
    expect(state.bio).toEqual('blabla');
    expect(state.image).toEqual('abc.jpg');
  });
});

describe('user reducer', () => {
  it('updates the state when login user action is dispatched', () => {
    const mockLocalStorage = {};
    const mockSessionStorage = {};
    const state = userReducer(initialState(mockLocalStorage, mockSessionStorage), {
      type: 'LOGIN_USER',
      payload: {
        username: 'qwerty',
        email: 'qwerty@yahoo.com',
        bio: 'blaaaaa',
        image: 'qwerty.jpg'
      }
    });
    expect(state.username).toEqual('qwerty');
    expect(state.email).toEqual('qwerty@yahoo.com');
    expect(state.bio).toEqual('blaaaaa');
    expect(state.image).toEqual('qwerty.jpg');
  });
  it('Updates email on after signing up', () => {
    const mockLocalStorage = {};
    const mockSessionStorage = {};
    const state = userReducer(initialState(mockLocalStorage, mockSessionStorage), {
      type: 'SIGN_UP',
      payload: {
        email: 'qwerty@yahoo.com',
      }
    });
    expect(state.email).toEqual('qwerty@yahoo.com');
  });

  it('Updates newUser field when RESET_NEW_USER is dispatched', () => {
    const mockState = {
      newUser: true
    };
    const state = userReducer(mockState, {
      type: 'RESET_NEW_USER',
    });
    expect(state.newUser).toEqual(false);
  });
  it('Updates user data when PROFILE_DETAILS_UPDATED is dispatched', () => {
    const mockState = {};
    const mockData = {
      image: 'abc.jpg',
      username: 'hfhfh',
      bio: 'uwuehyrh'
    };
    const state = userReducer(mockState, {
      type: 'PROFILE_DETAILS_UPDATED',
      data: mockData
    });
    expect(state.image).toEqual(mockData.image);
    expect(state.username).toEqual(mockData.username);
    expect(state.bio).toEqual(mockData.bio);
  });
});

import userReducer, { initialState } from '../../../redux/reducers/userReducer';

describe('user reducer initial state', () => {
  it('should return the right state when local storage is empty', () => {
    const mockLocalStorage = {};
    const state = userReducer(initialState(mockLocalStorage), {});
    expect(state.username).toEqual('');
    expect(state.email).toEqual('');
    expect(state.bio).toEqual('');
    expect(state.image).toEqual('');
  });
  it('should return the right state when local storage is filled', () => {
    const mockLocalStorage = {
      authorsHavenUsername: 'abc',
      authorsHavenEmail: 'abc@yahoo.com',
      authorsHavenBio: 'blabla',
      authorsHavenImage: 'abc.jpg',
    };
    const state = userReducer(initialState(mockLocalStorage), {});
    expect(state.username).toEqual('abc');
    expect(state.email).toEqual('abc@yahoo.com');
    expect(state.bio).toEqual('blabla');
    expect(state.image).toEqual('abc.jpg');
  });
});


describe('user reducer', () => {
  it('should return the right state when Login action is dispatched', () => {
    const mockLocalStorage = {};
    const state = userReducer(initialState(mockLocalStorage), {
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
});

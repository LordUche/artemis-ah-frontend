import authReducer, { initialState } from '../../../redux/reducers/authReducer';

describe('auth reducer initial state', () => {
  it('should return the right state when local storage is empty', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {});
    expect(state.isLoggedIn).toEqual(false);
    expect(state.token).toEqual('');
    expect(state.errorMessages).toEqual({});
    expect(state.loading).toEqual(false);
  });
  it('returns the user details stored when local storage is filled', () => {
    const mockLocalStorage = {
      authorsHavenToken: 'abc',
    };
    const state = authReducer(initialState(mockLocalStorage), {});
    expect(state.isLoggedIn).toEqual(true);
    expect(state.token).toEqual('abc');
    expect(state.errorMessages).toEqual({});
    expect(state.loading).toEqual(false);
  });
});


describe('auth reducer', () => {
  it('updates the state\'s token and isLoggedIn fields when Login action is dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'LOGIN_USER',
      payload: { token: 'abc' }
    });
    expect(state.token).toEqual('abc');
    expect(state.isLoggedIn).toEqual(true);
    expect(state.loading).toEqual(false);
  });
  it('updates the state\'s loading field when Loading action is dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'AUTH_LOADING'
    });
    expect(state.loading).toEqual(true);
  });
  it('updates the state\'s loading and error messages fields when Login error action is dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'LOGIN_ERROR',
      payload: {
        message: 'invalid credentials'
      }
    });
    expect(state.loading).toEqual(false);
    expect(state.errorMessages).toEqual({
      errors: {
        general: 'invalid credentials'
      }
    });
  });
  it('updates the state\'s error messages field with the exact name error that was dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'LOGIN_ERROR',
      payload: {
        errors: {
          name: ['name is required']
        }
      }
    });
    expect(state.loading).toEqual(false);
    expect(state.errorMessages).toEqual({
      errors: {
        name: ['name is required']
      }
    });
  });
  it('updates the state\'s error messages field with the exact password error that was dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'LOGIN_ERROR',
      payload: {
        errors: {
          password: ['password is required']
        }
      }
    });
    expect(state.loading).toEqual(false);
    expect(state.errorMessages).toEqual({
      errors: {
        password: ['password is required']
      }
    });
  });
  it('should clear the state\'s errormessages field when clear auth error action is dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'CLEAR_AUTH_ERROR'
    });
    expect(state.errorMessages).toEqual([]);
  });
});

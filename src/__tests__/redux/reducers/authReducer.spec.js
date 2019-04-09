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
  it('should return the right state when local storage is filled', () => {
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
  it('should return the right state when Login action is dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'LOGIN_USER',
      payload: { token: 'abc' }
    });
    expect(state.token).toEqual('abc');
    expect(state.isLoggedIn).toEqual(true);
    expect(state.loading).toEqual(false);
  });
  it('should return the right state when Loading action is dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'AUTH_LOADING'
    });
    expect(state.loading).toEqual(true);
  });
  it('should return the right state when general login error is dispatched', () => {
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
  it('should return the right state when name login error is dispatched', () => {
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
  it('should return the right state when password login error is dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'LOGIN_ERROR',
      payload: {
        errors: {
          name: ['password is required']
        }
      }
    });
    expect(state.loading).toEqual(false);
    expect(state.errorMessages).toEqual({
      errors: {
        name: ['password is required']
      }
    });
  });
  it('should return the right state when clear auth error action is dispatched', () => {
    const mockLocalStorage = {};
    const state = authReducer(initialState(mockLocalStorage), {
      type: 'CLEAR_AUTH_ERROR'
    });
    expect(state.errorMessages).toEqual([]);
  });
});

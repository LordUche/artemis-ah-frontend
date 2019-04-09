import {
  LOGIN_USER, LOGIN_ERROR, CLEAR_AUTH_ERROR, AUTH_LOADING
} from '../../../redux/actionTypes';

describe('Action types', () => {
  it('should return the right strings', () => {
    expect(LOGIN_USER).toEqual('LOGIN_USER');
    expect(LOGIN_ERROR).toEqual('LOGIN_ERROR');
    expect(CLEAR_AUTH_ERROR).toEqual('CLEAR_AUTH_ERROR');
    expect(AUTH_LOADING).toEqual('AUTH_LOADING');
  });
});

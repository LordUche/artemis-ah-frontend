import {
  storeInLocal, loadingAuthAction, clearAuthErrorAction, loginUserAction
} from '../../../redux/actions/authActions';

describe('storing data in local storage', () => {
  it('should store data in local storage', () => {
    const mockLocalStorage = {};
    const mockData = {
      bio: 'abc',
      email: 'def@yahoo.com',
      username: 'ghi',
      image: 'jkl.png',
      token: 'mno'
    };
    storeInLocal(mockData, mockLocalStorage);
    expect(mockLocalStorage.authorsHavenUsername).toEqual('ghi');
    expect(mockLocalStorage.authorsHavenEmail).toEqual('def@yahoo.com');
    expect(mockLocalStorage.authorsHavenBio).toEqual('abc');
    expect(mockLocalStorage.authorsHavenImage).toEqual('jkl.png');
    expect(mockLocalStorage.authorsHavenToken).toEqual('mno');
  });
});

describe('dispatching login actions', () => {
  it('dispatch the error action when user details are invalid', async (done) => {
    jest.setTimeout(30000);
    const details = {
      name: 'abc',
      password: '123'
    };
    const action = await loginUserAction(details);
    expect(action).toEqual({
      type: 'LOGIN_ERROR',
      payload: {
        message: 'invalid credentials'
      }
    });
    done();
  });
  it('dispatch the login action when user details are valid', async (done) => {
    jest.setTimeout(30000);
    const details = {
      name: 'ayo',
      password: 'admin123456',
      rememberMe: true
    };
    const action = await loginUserAction(details);
    expect(action.type).toEqual('LOGIN_USER');
    expect(action.payload.username).toEqual('ayo');

    const secondDetails = {
      name: 'ayo',
      password: 'admin123456',
      rememberMe: false
    };
    const secondAction = await loginUserAction(secondDetails);
    expect(secondAction.type).toEqual('LOGIN_USER');
    expect(secondAction.payload.username).toEqual('ayo');
    done();
  });
});

describe('dispatching loading state action ', () => {
  it('dispatch the right action', () => {
    expect(loadingAuthAction()).toEqual({ type: 'AUTH_LOADING' });
  });
});

describe('dispatching clear auth errors action ', () => {
  it('dispatch the right action', () => {
    expect(clearAuthErrorAction()).toEqual({ type: 'CLEAR_AUTH_ERROR' });
  });
});

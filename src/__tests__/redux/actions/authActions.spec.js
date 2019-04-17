import moxios from 'moxios';
import {
  storeInLocal,
  loadingAuthAction,
  clearAuthErrorAction,
  loginUserAction,
  socialLoginUserAction,
  signUp
} from '../../../redux/actions/authActions';

import HelperUtils from '../../../utils/helperUtils';

describe('user sign-up', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sign up a user', async () => {
    const mockRequest = {
      firstname: 'Adaeze',
      lastname: 'Odurukwe',
      username: 'deedee44007',
      email: 'daizyodurukwe3943jnd@gmail.com',
      password: '12345678'
    };

    const expectedResponse = {
      message: 'user created successfully',
      user: {
        email: 'daizyodurukwe3943jnd@gmail.com',
        token: 'GL4DMA82yGCjptZk-_JUi7XodxUFbWYxMdiUiHipQZU',
        username: 'deedee3344007',
        bio: 'n/a',
        image: 'https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/iReporter/avatar.png'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: expectedResponse });
    });

    const result = await signUp(mockRequest);
    expect(result.type).toEqual('SIGN_UP');
  });

  it('should return error when email is invalid', async () => {
    const mockRequest = {
      firstname: 'Adaeze',
      lastname: 'Odurukwe',
      username: 'deedee44007',
      email: 'daizyodurukwe3943jndmail.com',
      password: '12345678'
    };

    const expectedResponse = {
      errors: {
        email: [
          'Email is invalid.'
        ]
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: expectedResponse });
    });

    const result = await signUp(mockRequest);
    expect(result.type).toEqual('SIGN_UP_ERROR');
  });
});

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
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('dispatch the error action when user details are invalid', async (done) => {
    jest.setTimeout(30000);
    const details = {
      name: 'abc',
      password: '123'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: { message: 'invalid credentials' } });
    });
    const action = await loginUserAction(details);
    expect(action).toEqual({
      type: 'LOGIN_ERROR',
      payload: {
        message: 'invalid credentials'
      }
    });
    done();
  });
  it('when user details are valid it dispatches the login action', async (done) => {
    jest.setTimeout(30000);
    const details = {
      name: 'ayo',
      username: 'ayo',
      password: 'abcdef',
      rememberMe: true
    };

    const secondDetails = {
      name: 'john',
      username: 'john',
      password: 'abcd',
      rememberMe: false
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { user: details } }).then(() => {
        moxios.wait(() => {
          const req = moxios.requests.mostRecent();
          req.respondWith({ status: 200, response: { user: secondDetails } });
        });
      });
    });
    const action = await loginUserAction(details);
    expect(action.type).toEqual('LOGIN_USER');
    expect(action.payload.username).toEqual('ayo');

    const secondAction = await loginUserAction(secondDetails);
    expect(secondAction.type).toEqual('LOGIN_USER');
    expect(secondAction.payload.username).toEqual('john');
    done();
  });

  it('when user details are valid it dispatches the login action', () => {
    const payload = {
      username: 'obiora',
      lastname: 'ora',
      firstname: 'obi',
      token: HelperUtils.generateToken({ username: 'obiora', lastname: 'ora', firstname: 'obi' })
    };
    const action = socialLoginUserAction(payload);
    expect(action.type).toEqual('LOGIN_USER');
    expect(action.payload.username).toEqual('obiora');
  });
});

describe('dispatching loading state action ', () => {
  it('dispatches the auth loading action', () => {
    expect(loadingAuthAction()).toEqual({ type: 'AUTH_LOADING' });
  });
});

describe('dispatching clear auth errors action ', () => {
  it('the clear auth error action is dispatched', () => {
    expect(clearAuthErrorAction()).toEqual({ type: 'CLEAR_AUTH_ERROR' });
  });
});

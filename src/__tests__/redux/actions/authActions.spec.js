import moxios from 'moxios';
import {
  storeInLocal,
  loadingAuthAction,
  clearAuthErrorAction,
  loginUserAction,
  socialLoginUserAction,
  signUp,
  removeFromStorage,
  resetNewUserAction,
  logoutUserAction,
  confirmUserPassword,
  changeExistingPassword
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
        email: ['Email is invalid.']
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

describe('remove data in local and session storage', () => {
  it('should remove the data in local and session storage', () => {
    const mockLocalStorage = {
      authorsHavenEmail: 'sss@ddd.com',
      authorsHavenUsername: 'sssdd',
      authorsHavenBio: 'abcdefg',
      authorsHavenImage: 'shdgfdgh.jpg',
      authorsHavenToken: 'befgsufghfgf'
    };
    const mockSessionStorage = {
      authorsHavenEmail: 'sss@ddd.com',
      authorsHavenUsername: 'sssdd',
      authorsHavenBio: 'abcdefg',
      authorsHavenImage: 'shdgfdgh.jpg',
      authorsHavenToken: 'befgsufghfgf'
    };
    removeFromStorage(mockLocalStorage, mockSessionStorage);
    expect(mockLocalStorage.authorsHavenUsername).not.toBeDefined();
    expect(mockLocalStorage.authorsHavenEmail).not.toBeDefined();
    expect(mockLocalStorage.authorsHavenBio).not.toBeDefined();
    expect(mockLocalStorage.authorsHavenImage).not.toBeDefined();
    expect(mockLocalStorage.authorsHavenToken).not.toBeDefined();

    expect(mockSessionStorage.authorsHavenUsername).not.toBeDefined();
    expect(mockSessionStorage.authorsHavenEmail).not.toBeDefined();
    expect(mockSessionStorage.authorsHavenBio).not.toBeDefined();
    expect(mockSessionStorage.authorsHavenImage).not.toBeDefined();
    expect(mockSessionStorage.authorsHavenToken).not.toBeDefined();
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

describe('dispatching logout action ', () => {
  it('the LOGOUT_USER action is dispatched', () => {
    let result;
    /**
     * @param {object} action
     * @returns {object} action
     */
    const mockDispatch = (action) => {
      result = action;
    };
    logoutUserAction(mockDispatch);
    expect(result).toEqual({ type: 'LOGOUT_USER' });
  });
});

describe('reset new user action ', () => {
  it('the RESET_NEW_USER action is dispatched', () => {
    expect(resetNewUserAction()).toEqual({ type: 'RESET_NEW_USER' });
  });
});

describe('CHANGE PASSWORD', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should test the confirm User Password async function for success', async (done) => {
    const name = 'shaolinmkz';
    const password = '123456789';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { name, password } });
    });

    await confirmUserPassword(name, password);
    done();
  });

  it('should test the confirm User Password async function for error', async (done) => {
    const name = 'invalid';
    const password = 'invalid';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: { name, password } });
    });

    await confirmUserPassword(name, password);
    done();
  });

  it('should test the change Existing Password async function for success', async (done) => {
    const newPassword = 'shaolinmkz';
    const confirmPassword = '123456789';
    const email = 'email@email.com';
    const hash = 'hßœ™¡∞∞∞¥§¨•ª3eh.`ßß∂≈∂´∫∫¥∫∆∑∂∂œ∂ß¬¬øπø“π¬…ß∑œ∑';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          newPassword, confirmPassword, email, hash
        }
      });
    });

    await changeExistingPassword(newPassword, confirmPassword, email, hash);
    done();
  });

  it('should test the change Existing Password async function for error', async (done) => {
    const newPassword = 'invalid';
    const confirmPassword = 'invalid';
    const email = 'invalid';
    const hash = 'invalid';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          newPassword, confirmPassword, email, hash
        }
      });
    });

    await changeExistingPassword(newPassword, confirmPassword, email, hash);
    done();
  });
});

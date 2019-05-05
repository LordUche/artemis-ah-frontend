import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import moxios from 'moxios';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from '../../redux/reducers';
import { Settings, mapStateToProps } from '../../views/SettingsPage';
import {
  CONTENT_STATE_UPDATING,
} from '../../constants/profileConstants';
import { PROFILE_DETAILS_UPDATING } from '../../redux/actionTypes';
import HelperUtils from '../../utils/helperUtils';

const settingInstance = new Settings();

const store = createStore(reducers, applyMiddleware(ReduxPromise));

describe('Settings Page Component', () => {
  const mockDispatch = jest.fn();
  const mockHistoryObject = [];
  const mockProps = {
    dispatch: mockDispatch,
    isLoggedIn: true,
    inAppNotification: false,
    emailNotification: false,
    username: 'abcd',
    token: HelperUtils.generateToken({ username: 'user101', email: 'user101@yahoo.com' }),
    history: {
      push: url => mockHistoryObject.push(url)
    }
  };
  const settingsPage = shallow(<Settings {...mockProps} />);

  it('should render the page with the information passed as props', () => {
    expect(settingsPage.find('section.settings_section').exists()).toBe(true);
    expect(settingsPage.find('ProfileOptionCard').exists()).toBe(true);
    expect(settingsPage.find('input[name="newEmailNotification"]').exists()).toBe(true);
    expect(settingsPage.find('input[name="newInAppNotification"]').exists()).toBe(true);
  });

  it('should show appropriate information when email and in app notifications are set to false', () => {
    expect(settingsPage.find('input[name="newEmailNotification"]').prop('checked')).not.toEqual('checked');
    expect(settingsPage.find('input[name="newInAppNotification"]').prop('checked')).not.toEqual('checked');
    expect(settingsPage.find('p').first().text()).toEqual('You will not receive notifications when you’re online');
    expect(settingsPage.find('p').last().text()).toEqual('Notifications will not be sent to your email address');
  });

  it('should update the state when the input buttons are changed', () => {
    expect(settingsPage.state('newEmailNotification')).toEqual(null);
    settingsPage.find('input[name="newEmailNotification"]').simulate('change');
    expect(settingsPage.state('newEmailNotification')).toEqual(true);

    expect(settingsPage.state('newInAppNotification')).toEqual(null);
    settingsPage.find('input[name="newInAppNotification"]').simulate('change');
    expect(settingsPage.state('newInAppNotification')).toEqual(true);
  });

  it('renders with notifications tab as active by default and toggles the active tab when a list item is clicked', () => {
    expect(settingsPage.state('activeTab')).toEqual('Notifications');
    settingsPage.find('li').first().simulate('click', {
      target: { id: 'Password' }
    });
    expect(settingsPage.state('activeTab')).toEqual('Password');
  });

  it('should show appropriate information when email and in app notifications are set to true', () => {
    const trueSettingsPage = shallow(
      <Settings {...{ ...mockProps, inAppNotification: true, emailNotification: true }} />
    );
    expect(trueSettingsPage.find('input[name="newEmailNotification"]').prop('checked')).toEqual('checked');
    expect(trueSettingsPage.find('input[name="newInAppNotification"]').prop('checked')).toEqual('checked');
    expect(trueSettingsPage.find('p').first().text()).toEqual('You will receive notifications when you’re online');
    expect(trueSettingsPage.find('p').last().text()).toEqual('Notifications will be sent to your email address');
  });

  it('should login modal when user is not logged in', () => {
    const noAuthSettingsPage = shallow(
      <Settings {...{ ...mockProps, isLoggedIn: false }} />
    );
    expect(noAuthSettingsPage.state('showLoginModal')).toEqual(true);
    noAuthSettingsPage.instance().toggleSignUpModal();
    expect(noAuthSettingsPage.state('showSignUpModal')).toEqual(true);
  });
  it('disables save button when loading', () => {
    const loadingSettingsPage = shallow(
      <Settings {...{ ...mockProps, editState: CONTENT_STATE_UPDATING }} />
    );
    expect(loadingSettingsPage.find('Button').prop('isDisabled')).toEqual(true);
  });

  it('maps the right props to the component from the store', () => {
    const mockStore = {
      auth: {
        isLoggedIn: true,
        token: 'abcd'
      },
      user: {
        username: 'zxcv'
      },
      profile: {
        user: {
          inAppNotification: true,
          emailNotification: true
        },
        editState: 'Loading'
      }
    };


    const settingsPageProps = mapStateToProps(mockStore);
    expect(settingsPageProps.isLoggedIn).toEqual(mockStore.auth.isLoggedIn);
    expect(settingsPageProps.username).toEqual(mockStore.user.username);
    expect(settingsPageProps.inAppNotification).toEqual(mockStore.profile.user.inAppNotification);
    expect(settingsPageProps.emailNotification).toEqual(mockStore.profile.user.emailNotification);
    expect(settingsPageProps.token).toEqual(mockStore.auth.token);
    expect(settingsPageProps.editState).toEqual(mockStore.profile.editState);
  });
});

describe('Notification Settings', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should update users notifications settings when form is submitted', async () => {
    const mockStore = [];
    /**
     * @param {object} action action to be dispatched
     * @returns {undefined}
     */
    const mockDispatch = action => mockStore.push(action);
    const mockHistoryObject = [];
    const mockProps = {
      dispatch: mockDispatch,
      isLoggedIn: true,
      inAppNotification: false,
      emailNotification: false,
      username: 'abcd',
      token: 'zxcvbnm',
      history: {
        push: url => mockHistoryObject.push(url)
      }
    };
    const settingsPage = shallow(<Settings {...mockProps} />);

    const mockEvent = {
      preventDefault: () => 'Prevented Default'
    };

    const mockResponse = {
      message: 'Successful'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: mockResponse });
    });
    settingsPage.find('form#notification-settings-form').simulate('submit', mockEvent);
    expect(mockStore[1].type).toEqual(PROFILE_DETAILS_UPDATING);
  });
});

describe('Pasword Change', () => {
  const mockDispatch = jest.fn();
  const mockHistoryObject = [];
  const mockProps = {
    dispatch: mockDispatch,
    isLoggedIn: true,
    inAppNotification: false,
    emailNotification: false,
    username: 'abcd',
    token: 'zxcvbnm',
    history: {
      push: url => mockHistoryObject.push(url)
    }
  };
  it('test the handle password change method', () => {
    const e = {
      target: {
        name: 'newPassword',
        value: 'asdf;lkj'
      }
    };

    settingInstance.handlePasswordChange(e);
  });
  it('test the handle password change submit method 1', (done) => {
    const loadingSettingsPage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Settings {...{ ...mockProps, editState: CONTENT_STATE_UPDATING }} />
        </BrowserRouter>
      </Provider>
    );
    loadingSettingsPage.find('#Password').simulate('click');
    loadingSettingsPage.find('input[name="currentPassword"]').simulate('change');
    loadingSettingsPage.find('input[name="newPassword"]').simulate('change');
    loadingSettingsPage.find('input[name="confirmPassword"]').simulate('change');
    loadingSettingsPage.find('#settings_section_notification_password_btn').simulate('submit');
    done();
  });
  it('test the handle password change submit method 2', (done) => {
    const loadingSettingsPage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Settings {...{ ...mockProps, token: HelperUtils.generateToken({ username: 'user101', email: 'user101@yahoo.com' }) }} />
        </BrowserRouter>
      </Provider>
    );
    loadingSettingsPage.find('#Password').simulate('click');
    loadingSettingsPage.setState({ currentPassword: '12345678910', newPassword: '123456789', confirmPassword: '123456789' });
    loadingSettingsPage.find('#settings_section_notification_password_btn').simulate('submit');
    done();
  });
  it('should test if password supplied is uniform', (done) => {
    const e = {
      preventDefault: jest.fn(),
      target: (
        <form>
          <input type="text" />
        </form>
      )
    };
    const { state } = settingInstance;
    state.newPassword = 'asdf;lkj';
    state.confirmPassword = '12345678';

    settingInstance.handlePasswordChangeSubmit(e);
    done();
  });
});

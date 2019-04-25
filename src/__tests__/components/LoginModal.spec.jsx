import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { LoginModal, mapStateToProps } from '../../views/LoginModal';

const loginModalView = new LoginModal();

describe('Loading Modal Component', () => {
  it('should have match the given snapshot', () => {
    const mockFunction = jest.fn();
    const tree = renderer
      .create(
        <LoginModal
          errorMessages={{}}
          onClose={mockFunction}
          loginUser={mockFunction}
          loadingAuth={mockFunction}
          clearAuthError={mockFunction}
          loading={false}
          isLoggedIn={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render modal if user is logged in', () => {
    const mockFunction = jest.fn();
    const loginModal = shallow(
      <LoginModal
        errorMessages={{}}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockFunction}
        loading={false}
        isLoggedIn={false}
      />
    );
    expect(loginModal.find('Modal').exists()).toBe(true);
    expect(loginModal.find('Redirect').exists()).toBe(false);
  });

  it('should redirect to profile if user is logged in', () => {
    const mockFunction = jest.fn();
    const loginModal = shallow(
      <LoginModal
        errorMessages={{}}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockFunction}
        loading={false}
        isLoggedIn
      />
    );
    expect(loginModal.find('Redirect').exists()).toBe(true);
  });

  it('should map the right state to props', () => {
    const mockState = {
      auth: {
        isLoggedIn: false,
        errorMessages: [],
        loading: false
      }
    };
    const loginModalProps = mapStateToProps(mockState);
    expect(loginModalProps.isLoggedIn).toEqual(false);
    expect(loginModalProps.errorMessages).toEqual([]);
    expect(loginModalProps.loading).toEqual(false);
  });

  it('should have the right default state', () => {
    const mockFunction = jest.fn();
    const loginModal = shallow(
      <LoginModal
        errorMessages={{}}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockFunction}
        loading={false}
        isLoggedIn
      />
    );

    expect(loginModal.state('name')).toEqual('');
    expect(loginModal.state('password')).toEqual('');
    expect(loginModal.state('rememberMe')).toEqual(false);
  });

  it('should fire loadingAuth and loginUser function on form submit ', () => {
    const mockLoadingAuth = jest.fn();
    const mockLoginUser = jest.fn();
    const mockFunction = jest.fn();
    const fakeEvent = { preventDefault: () => ({}) };
    const loginModal = mount(
      <LoginModal
        errorMessages={{}}
        onClose={mockFunction}
        loginUser={mockLoginUser}
        loadingAuth={mockLoadingAuth}
        clearAuthError={mockFunction}
        loading={false}
        isLoggedIn={false}
      />
    );

    loginModal.find('form#loginForm').simulate('submit', fakeEvent);

    expect(mockLoadingAuth.mock.calls.length).toEqual(1);
    expect(mockLoginUser.mock.calls.length).toEqual(1);
  });

  it('should clear errors when mounting and when input changes', () => {
    const mockclearAuthError = jest.fn();
    const mockFunction = jest.fn();
    const fakeEvent = { target: { name: 'password', value: 'testValue' } };
    const loginModal = mount(
      <LoginModal
        errorMessages={{
          errors: {
            name: 'Name is required'
          }
        }}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockclearAuthError}
        loading={false}
        isLoggedIn={false}
      />
    );

    const inputField = loginModal.find('input.login_body_form_input').last();

    inputField.simulate('change', fakeEvent);

    expect(mockclearAuthError.mock.calls.length).toEqual(2);
  });

  it('should update state when input changes', () => {
    const mockclearAuthError = jest.fn();
    const mockFunction = jest.fn();
    const fakeEvent = { target: { name: 'password', value: 'testValue' } };
    const loginModal = mount(
      <LoginModal
        errorMessages={{
          errors: {
            name: 'Name is required',
            password: 'Password is required'
          }
        }}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockclearAuthError}
        loading={false}
        isLoggedIn={false}
      />
    );

    const passwordInputField = loginModal.find('input.login_body_form_input').last();
    const rememberMeInputField = loginModal.find('input.login_body_form_rem_div_input');

    passwordInputField.simulate('change', fakeEvent);
    expect(loginModal.state('password')).toEqual('testValue');

    rememberMeInputField.simulate('change');
    expect(loginModal.state('rememberMe')).toEqual(true);
  });

  it('should show all errors', () => {
    const mockFunction = jest.fn();
    const loginModal = shallow(
      <LoginModal
        errorMessages={{
          errors: {
            name: ['Name is required'],
            password: ['Password is required'],
            general: 'Invalid Credentials'
          }
        }}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockFunction}
        loading={false}
        isLoggedIn={false}
      />
    );

    expect(loginModal.find('p.login_body_form_error_general').exists()).toBe(true);
    expect(loginModal.find('p.login_body_form_error_general').text()).toBe('Invalid Credentials');

    expect(
      loginModal
        .find('p.login_body_form_error')
        .first()
        .exists()
    ).toBe(true);
    expect(
      loginModal
        .find('p.login_body_form_error')
        .first()
        .text()
    ).toEqual('Name is required');

    expect(
      loginModal
        .find('p.login_body_form_error')
        .last()
        .exists()
    ).toBe(true);
    expect(
      loginModal
        .find('p.login_body_form_error')
        .last()
        .text()
    ).toEqual('Password is required');
  });

  it('should show only name errors when there are only name errors', () => {
    const mockFunction = jest.fn();
    const loginModal = shallow(
      <LoginModal
        errorMessages={{
          errors: {
            name: ['Name is required']
          }
        }}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockFunction}
        loading={false}
        isLoggedIn={false}
      />
    );

    expect(loginModal.find('p.login_body_form_error_general').exists()).toBe(false);

    expect(loginModal.find('p.login_body_form_error').exists()).toBe(true);
    expect(loginModal.find('p.login_body_form_error').text()).toEqual('Name is required');
  });

  it('should show only password errors when there are only password errors', () => {
    const mockFunction = jest.fn();
    const loginModal = shallow(
      <LoginModal
        errorMessages={{
          errors: {
            password: ['Password is required']
          }
        }}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockFunction}
        loading={false}
        isLoggedIn={false}
      />
    );

    expect(loginModal.find('p.login_body_form_error_general').exists()).toBe(false);

    expect(loginModal.find('p.login_body_form_error').exists()).toBe(true);
    expect(loginModal.find('p.login_body_form_error').text()).toEqual('Password is required');
  });

  it('should show only general errors when there are only general errors', () => {
    const mockFunction = jest.fn();
    const loginModal = shallow(
      <LoginModal
        errorMessages={{
          errors: {
            general: 'Invalid Credentials'
          }
        }}
        onClose={mockFunction}
        loginUser={mockFunction}
        loadingAuth={mockFunction}
        clearAuthError={mockFunction}
        loading={false}
        isLoggedIn={false}
      />
    );

    expect(loginModal.find('p.login_body_form_error_general').exists()).toBe(true);
    expect(loginModal.find('p.login_body_form_error_general').text()).toEqual(
      'Invalid Credentials'
    );

    expect(loginModal.find('p.login_body_form_error').exists()).toBe(false);
  });
  it('does not make extra requests when one is being loaded', () => {
    const mockFunction = jest.fn();
    const mockLoadingAuth = jest.fn();
    const mockLoginUser = jest.fn();
    const fakeEvent = { preventDefault: () => ({}) };
    const loginModal = mount(
      <LoginModal
        errorMessages={{}}
        onClose={mockFunction}
        loginUser={mockLoginUser}
        loadingAuth={mockLoadingAuth}
        clearAuthError={mockFunction}
        loading
        isLoggedIn={false}
      />
    );

    loginModal.find('form#loginForm').simulate('submit', fakeEvent);

    expect(mockLoadingAuth.mock.calls.length).toEqual(0);
    expect(mockLoginUser.mock.calls.length).toEqual(0);

    const submitBtn = loginModal.find('button.login_body_form_submit_btn');

    submitBtn.simulate('click');

    expect(mockLoadingAuth.mock.calls.length).toEqual(0);
    expect(mockLoginUser.mock.calls.length).toEqual(0);
  });

  it('Should describe the social media login button click', () => {
    const mockFunction = jest.fn();
    const mockLoadingAuth = jest.fn();
    const mockLoginUser = jest.fn();
    const loginModal = mount(
      <LoginModal
        errorMessages={{}}
        onClose={mockFunction}
        loginUser={mockLoginUser}
        loadingAuth={mockLoadingAuth}
        clearAuthError={mockFunction}
        loading
        isLoggedIn={false}
      />
    );
    sinon.stub(window.location, 'assign');
    loginModal.find('button.facebookDesktop').simulate('click');
    loginModal.find('button.twitterDesktop').simulate('click');
    loginModal.find('button.googleDesktop').simulate('click');
    loginModal.find('button.twitterMobile').simulate('click');
    loginModal.find('button.facebookMobile').simulate('click');
    loginModal.find('button.googleMobile').simulate('click');
  });

  it('Should describe the social media login button click', () => {
    const mockFunction = jest.fn();
    const mockLoadingAuth = jest.fn();
    const mockLoginUser = jest.fn();
    const loginModal = mount(
      <LoginModal
        errorMessages={{}}
        onClose={mockFunction}
        loginUser={mockLoginUser}
        loadingAuth={mockLoadingAuth}
        clearAuthError={mockFunction}
        loading
        isLoggedIn={false}
      />
    );
    loginModal.find('#login-reset-btn').simulate('click');
    const event = {
      preventDefault: () => 'prevent default'
    };
    loginModalView.submitReset(event);
  });
});

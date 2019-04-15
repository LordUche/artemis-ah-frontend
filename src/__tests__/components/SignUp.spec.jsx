import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { SignUpView } from '../../views/SignUpView';
import { SignUp } from '../../components/signUp';
import reducers from '../../redux/reducers';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const mockFunction = jest.fn();
const noError = {};
const yesError = {
  errors: {
    firstname: ['Firstname must exist'],
    lastname: ['Lastname must exist'],
    username: ['Username must exist'],
    email: ['Email is invalid.'],
    password: ['Password must be more than 8 characters']
  }
};

describe('input fields', () => {
  let signUpModal;
  beforeEach(() => {
    signUpModal = mount(
      <SignUp
        signUpUser={mockFunction}
        loadingAuth={mockFunction}
        errorMessages={noError}
        loading={false}
        clear={mockFunction}
        signedUp={false}
        email=""
        revealLoginModal={mockFunction}
      />
    );
  });
  it('Should change firstname state on update', () => {
    const event = { target: { name: 'firstname', value: 'mitch' } };
    const firsnameInput = signUpModal.find('.ah_signup_form__input--signup').first();
    expect(firsnameInput.exists()).toEqual(true);
    firsnameInput.simulate('change', event);
    expect(signUpModal.state().firstname).toEqual('mitch');
  });
  it('Should submit form on click', () => {
    signUpModal.setState({
      firstname: 'bil',
      lastname: 'gat',
      username: 'bilgat',
      email: 'bbb@gmail.com',
      password: 'lovingyou',
      confirmPassword: 'lovingyou',
      confirmPasswordError: '',
      valid: true
    });
    const submit = signUpModal.find('.ah_signup_form_wrapper__button');
    expect(submit.exists()).toEqual(true);
    submit.simulate('submit');
    expect(mockFunction).toHaveBeenCalled();
  });
  it('Should set state of confirmpasswordError', () => {
    const passwordEvent = { target: { name: 'password', value: 'mitch' } };
    const confirmPasswordEvent = { target: { name: 'confirmPassword', value: 'mitc' } };
    const passwordInput = signUpModal.find('.ah_signup_form__input--signup').at(4);
    passwordInput.simulate('change', passwordEvent);
    const confirmPasswordInput = signUpModal.find('.ah_signup_form__input--signup').at(5);
    confirmPasswordInput.simulate('change', confirmPasswordEvent);

    expect(signUpModal.state().confirmPasswordError).toEqual('password does not match');
  });
});

describe('Clear Errors', () => {
  const signUpModal = mount(
    <SignUp
      signUpUser={mockFunction}
      loadingAuth={mockFunction}
      errorMessages={yesError}
      loading={false}
      clear={mockFunction}
      signedUp={false}
      email=""
      revealLoginModal={mockFunction}
    />
  );
  it('Should clear errors on clange', () => {
    const emailInput = signUpModal.find('.ah_signup_form__input--signup').at(3);
    const emailEvent = { target: { name: 'email', value: 'google@google.com' } };
    emailInput.simulate('change', emailEvent);
    expect(mockFunction).toHaveBeenCalled();
  });
});

describe('Verification', () => {
  let signUpModal;
  beforeEach(() => {
    signUpModal = mount(
      <SignUp
        signUpUser={mockFunction}
        loadingAuth={mockFunction}
        errorMessages={noError}
        loading={false}
        clear={mockFunction}
        signedUp
        email="bibi@gmail.com"
        revealLoginModal={mockFunction}
      />
    );
  });
  it('Should should show verification if user is signed up', () => {
    const verifyContent = signUpModal.find('.verification');
    expect(verifyContent.exists()).toEqual(true);
  });
});

describe('Social media login', () => {
  it('Should describe the social media login button click', () => {
    const signUpModal = mount(
      <SignUp
        signUpUser={mockFunction}
        loadingAuth={mockFunction}
        errorMessages={yesError}
        loading={false}
        clear={mockFunction}
        signedUp={false}
        email=""
        revealLoginModal={mockFunction}
      />
    );
    sinon.stub(window.location, 'assign');
    signUpModal.find('button.ah_signup_social--facebook').simulate('click');
    signUpModal.find('button.ah_signup_social--twitter').simulate('click');
    signUpModal.find('button.ah_signup_social--google').simulate('click');
    signUpModal.find('button.ah_signup_social_small--facebook').simulate('click');
    signUpModal.find('button.ah_signup_social_small--twitter').simulate('click');
    signUpModal.find('button.ah_signup_social_small--google').simulate('click');
  });
});

describe('SignUp view', () => {
  it('Should have a modal', () => {
    const SignUpUser = mount(
      <Provider store={store}>
        <SignUpView
          revealLoginModal={mockFunction}
          toggleSignUpModal={mockFunction}
          signedUp
          email="someemail@yahoo.com"
        />
      </Provider>
    );
    const modal = SignUpUser.find('Modal');
    expect(modal.exists()).toEqual(true);
  });
  it('Modal should house a form when signedUp is false', () => {
    const SignUpUser = mount(
      <Provider store={store}>
        <SignUpView
          revealLoginModal={mockFunction}
          toggleSignUpModal={mockFunction}
          signedUp={false}
          email="someemail@yahoo.com"
        />
      </Provider>
    );
    const signUpform = SignUpUser.find('form');
    expect(signUpform.exists()).toEqual(true);
  });
});

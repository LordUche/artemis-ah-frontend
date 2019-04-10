import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { SignUp } from '../../components/SignupModal';
import reducers from '../../redux/reducers';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const mockFunction = jest.fn();

describe('SignUp Modal Component', () => {
  it('should have match the given snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <SignUp
          showSignup
          toggleModal={mockFunction}
          toggleVerify={mockFunction}
          signUp={mockFunction}
          onClose={mockFunction}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('shalow mount signup modal', () => {
    let signupModal;
    beforeEach(() => {
      signupModal = mount(
        <SignUp
          showModal={mockFunction}
          onClose={mockFunction}
          toggleModal={mockFunction}
          toggleVerify={mockFunction}
          showSignup
          signUp={mockFunction}
        />
      );
    });

    it('Should have form element', () => {
      expect(signupModal.find('form').exists()).toBe(true);
    });
    it('Should find input field parent div', () => {
      expect(signupModal.find('.ah_signup__form__input').exists()).toBe(true);
    });
  });
});

describe('input fields', () => {
  let signUpModal;
  beforeEach(() => {
    signUpModal = mount(
      <SignUp
        showModal={mockFunction}
        onClose={mockFunction}
        toggleModal={mockFunction}
        toggleVerify={mockFunction}
        showSignup
        signUp={mockFunction}
      />
    );
  });
  it('Should change firstname state on update', () => {
    const event = { target: { name: 'firstname', value: 'mitch' } };
    const firsnameInput = signUpModal.find('.ah_signup__form__input--signup').first();
    expect(firsnameInput.exists()).toEqual(true);
    firsnameInput.simulate('change', event);
    expect(signUpModal.state().firstname).toEqual('mitch');
  });

  it('Should change lastname state on update', () => {
    const event = { target: { name: 'lastname', value: 'mitch' } };
    const lastnameInput = signUpModal.find('.ah_signup__form__input--signup').at(1);
    expect(lastnameInput.exists()).toEqual(true);
    lastnameInput.simulate('change', event);
    // console.log(signUpModal.state());
    expect(signUpModal.state().lastname).toEqual('mitch');
  });

  it('Should change username state on update', () => {
    const event = { target: { name: 'username', value: 'mitch' } };
    const UsernameInput = signUpModal.find('.ah_signup__form__input--signup').at(2);
    expect(UsernameInput.exists()).toEqual(true);
    UsernameInput.simulate('change', event);
    expect(signUpModal.state().username).toEqual('mitch');
  });

  it('Should change email state on update', () => {
    const event = { target: { name: 'email', value: 'mitch@gmail.com' } };
    const emailInput = signUpModal.find('.ah_signup__form__input--signup').at(3);
    expect(emailInput.exists()).toEqual(true);
    emailInput.simulate('change', event);
    expect(signUpModal.state().email).toEqual(event.target.value);
  });

  it('Should change password state on update', () => {
    const event = { target: { name: 'password', value: 'oooooooo' } };
    const passwordInput = signUpModal.find('.ah_signup__form__input--signup').at(4);
    expect(passwordInput.exists()).toEqual(true);
    passwordInput.simulate('change', event);
    expect(signUpModal.state().password).toEqual(event.target.value);
  });

  it('Should change password state on update', () => {
    const event = { target: { name: 'confirmPassword', value: 'oooooooo' } };
    const confirmPasswordInput = signUpModal.find('.ah_signup__form__input--signup').at(5);

    expect(confirmPasswordInput.exists()).toEqual(true);
    confirmPasswordInput.simulate('change', event);
    expect(signUpModal.state().confirmPassword).toEqual(event.target.value);
  });
});

describe('Should ahow errors when wrong values are entered', () => {
  let signUpModal;
  beforeEach(() => {
    signUpModal = mount(
      <SignUp
        showModal={mockFunction}
        onClose={mockFunction}
        toggleModal={mockFunction}
        toggleVerify={mockFunction}
        showSignup
        signUp={mockFunction}
      />
    );
  });
  it('Should show firstname error if firstname is too short', () => {
    const event = { target: { name: 'firstname', value: 'm' } };
    const firstnameInput = signUpModal.find('.ah_signup__form__input--signup').first();
    firstnameInput.simulate('change', event);
    expect(signUpModal.state().firstname).toEqual('m');
    expect(signUpModal.state().formErrors.firstname).toEqual('Firstname is invalid');
  });

  it('Should show error if lastname is too short', () => {
    const event = { target: { name: 'lastname', value: 'm' } };
    const lastnameInput = signUpModal.find('.ah_signup__form__input--signup').at(2);
    lastnameInput.simulate('change', event);
    expect(signUpModal.state().lastname).toEqual('m');
    expect(signUpModal.state().formErrors.lastname).toEqual('Lastname is invalid');
  });

  it('Should show error if username is too short', () => {
    const event = { target: { name: 'username', value: 'm' } };
    const usernameInput = signUpModal.find('.ah_signup__form__input--signup').at(3);
    usernameInput.simulate('change', event);
    expect(signUpModal.state().username).toEqual('m');
    expect(signUpModal.state().formErrors.username).toEqual('Username is invalid');
  });

  it('Should show email error for invalid email', () => {
    const event = { target: { name: 'email', value: 'mitchgmail.com' } };
    const emailInput = signUpModal.find('.ah_signup__form__input--signup').at(3);
    expect(emailInput.exists()).toEqual(true);
    emailInput.simulate('change', event);
    expect(signUpModal.state().email).toEqual(event.target.value);
    expect(signUpModal.state().formErrors.email).toEqual('Email is invalid');
  });

  it('Should return error for invalid password', () => {
    const event = { target: { name: 'password', value: 'oooooo' } };
    const passwordInput = signUpModal.find('.ah_signup__form__input--signup').at(4);
    expect(passwordInput.exists()).toEqual(true);
    passwordInput.simulate('change', event);
    expect(signUpModal.state().password).toEqual(event.target.value);
    expect(signUpModal.state().formErrors.password).toEqual('Password must be 8 characters long');
  });

  it('Should change password state on update', () => {
    const event = { target: { name: 'confirmPassword', value: 'oooooooo' } };
    const confirmPasswordInput = signUpModal.find('.ah_signup__form__input--signup').at(5);
    expect(confirmPasswordInput.exists()).toEqual(true);
    confirmPasswordInput.simulate('change', event);
    expect(signUpModal.state().confirmPassword).toEqual(event.target.value);
    expect(signUpModal.state().formErrors.confirmPassword).toEqual('Password does not match');
  });
});

describe('Submit form', () => {
  it('Send data when Form is valid', () => {
    const signUpModal = mount(
      <SignUp
        showModal={mockFunction}
        onClose={mockFunction}
        toggleModal={mockFunction}
        toggleVerify={mockFunction}
        showSignup
        signUp={mockFunction}
      />
    );
    signUpModal.setState({ formValid: true });
    const signUpbutton = signUpModal.find('.ah_signup__form__button');
    signUpbutton.simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
});

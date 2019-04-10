import signUp from '../../../redux/actions/signUp';

const mockData = {
  authResponse: {
    status: true,
    message: 'You have successfully signed up',
    data: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTM5MzkzMDIsImN1cnJlbnRVc2VyIjp7InVzZXJJZCI6MSwidXNlcm5hbWUiOiJydWtraWV5In0sImlhdCI6MTUxMzg1MjkwMn0.K2P7BAKDkMbk9avQznEE4u8PRtrx3P0mlSzLvFAdH2E'
    }
  },
  signupData: {
    username: 'ruqoyah',
    fullName: 'Rukayat Odukoya',
    email: 'rukayat@gmail.com',
    password: 'oriyomi123'
  }
};


describe('dispatching login actions', () => {
  it('dispatch the error action when user details are invalid', async (done) => {
    jest.setTimeout(30000);
    const details = {
      name: 'abc',
      password: '123'
    };
    const action = await signUp(details);
    expect(action).toEqual({
      type: 'LOGIN_ERROR',
      payload: {
        message: 'invalid credentials'
      }
    });
    done();
  });
});

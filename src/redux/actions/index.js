// Base url
const BASE_URL = 'https://authorshaven.herokuapp.com/api';
// const BASE_URL = 'http://localhost:3000/api';

// Google Auth URL
const GOOGLE_SOCIAL_LOGIN_URL = `${BASE_URL}/users/auth/google`;
// Facebook Auth URL
const FACEBOOK_SOCIAL_LOGIN_URL = `${BASE_URL}/users/auth/facebook`;
// Twitter Auth URL
const TWITTER_SOCIAL_LOGIN_URL = 'http://authorshaven.herokuapp.com/api/users/auth/twitter';

export { GOOGLE_SOCIAL_LOGIN_URL, FACEBOOK_SOCIAL_LOGIN_URL, TWITTER_SOCIAL_LOGIN_URL };

export default BASE_URL;

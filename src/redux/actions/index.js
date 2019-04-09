import actionType from '../actionTypes/index';


// Base url
export const BASE_URL = 'https://authorshaven.herokuapp.com/api';

/**
 * @returns {object} action
 */
const name = () => ({
  type: actionType,
  payload: 'bisi'
});

export default name;

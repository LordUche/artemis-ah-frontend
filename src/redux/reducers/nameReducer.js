import CHANGE_NAME from '../actionTypes/index';

const inttialState = {
  name: 'adaeze'
};

/**
 * @description change name reducer
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
export default function changeName(state = inttialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

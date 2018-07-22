import { userConstants } from '../constants';


export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        username: action.user.username,
        id: action.user.id
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.UPDATE_REQUEST:
      return {
        updating: true
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        username: action.user.username,
        id: action.user.id
      };
    case userConstants.UPDATE_FAILURE:
      return {
          updateError: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        deleting: true
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      // make copy of user without 'deleting:true' property
      return {
            // return copy of user with 'deleteError:[error]' property
          deleteError: action.error
      };
    case userConstants.LOGOUT:
      return { };
    default:
      return state
  }
}
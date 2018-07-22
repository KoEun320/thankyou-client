import { postConstants } from '../constants';
var initialState ={
	list:[],
	random:{}
}
export function post(state = initialState, action) {

	switch (action.type) {
		case postConstants.GETALL_REQUEST:
		return {
			...state,
			loading: true
		};
		case postConstants.GETALL_SUCCESS:
		return {
			random: state.random,
			list:action.items.contents,
			...action.items
		};
		case postConstants.GETALL_FAILURE:
		return {
			...state,
			error: action.error
		};
		case postConstants.GETALL_ADD_REQUEST:
		return {
			...state,
			loading: true
		};
		case postConstants.GETALL_ADD_SUCCESS:
		console.log(state)
		console.log(action)
		return {
			...state,
			list: [...state.list,
				...action.items.contents],
			...action.items
		};
		case postConstants.GETALL_ADD_FAILURE:
		return {
			...state,
			error: action.error
		};
		case postConstants.GETRANDOM_REQUEST:
		return {
			...state,
			loading: true
		};
		case postConstants.GETRANDOM_SUCCESS:
		return {
			...state,
			random: action.items
		};
		case postConstants.GETRANDOM_FAILURE:
		return {
			...state,
			error: action.error
		};
		case postConstants.GETBYID_REQUEST:
		return {
			loading: true
		};
		case postConstants.GETBYID_SUCCESS:
		return {
			random: state.random,
			list: action.items.contents,
			paginationTotal: action.items.paginationTotal,
			likeCount: action.items.likeCount,
			totalCount: action.items.totalCount
		};
		case postConstants.GETBYID_FAILURE:
		return {
			...state,
			error: action.error
		};
		case postConstants.GETBYID_ADD_REQUEST:
		return {
			...state,
			loading: true
		};
		case postConstants.GETBYID_ADD_SUCCESS:
		return {
			...state,
			list: [...state.list,
				...action.items.contents],
			...action.items
		};
		case postConstants.GETBYID_ADD_FAILURE:
		return {
			...state,
			error: action.error
		};
		case postConstants.LIKE_REQUEST:
		return {
			...state,
			loading: true
		};
		case postConstants.LIKE_SUCCESS:
		return {
			...state
		};
		case postConstants.LIKE_FAILURE:
		return {
			...state,
			error: action.error
		};
		case postConstants.UPDATE_REQUEST:
		return {
			...state,
			updating: true
		};
		case postConstants.UPDATE_SUCCESS:
		return {
			...state
		};
		case postConstants.UPDATE_FAILURE:
		return {
			...state,
			updateError: action.error
		};
		case postConstants.DELETE_REQUEST:
		// add 'deleting:true' property to user being deleted
		return {
			deleting: true
		};
		case postConstants.DELETE_SUCCESS:
		// remove deleted user from state
		return {
		};
		case postConstants.DELETE_FAILURE:
		// remove 'deleting:true' property and add 'deleteError:[error]' property to user
		// make copy of user without 'deleting:true' property
		return {
				// return copy of user with 'deleteError:[error]' property
			deleteError: action.error
		};

		default:
		return state
	}
}

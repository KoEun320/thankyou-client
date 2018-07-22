import { postConstants } from '../constants';
import { postService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const postActions = {
    register,
    getAll,
    getAddAll,
    getById,
    getAddById,
    getRandom,
    like,
    dislike,
    update,
    delete: _delete,
};

function register(post) {
    return dispatch => {
        dispatch(request(post));

        postService.register(post)
            .then(
                post => {
                    dispatch(success(post));
                    dispatch(alertActions.success('Posting is successful'));
                    history.push('/main');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(post) { return { type:postConstants.REGISTER_REQUEST,post } }
    function success(post) { return { type:postConstants.REGISTER_SUCCESS,post } }
    function failure(error) { return { type:postConstants.REGISTER_FAILURE, error } }
}

function getAll(page) {
    return dispatch => {
        dispatch(request())
        postService.getAll(page)
        .then(
                page => {
                        dispatch(success(page));
                        var nowPath = history.location.pathname ? history.location.pathname : "/main";
                        history.push(nowPath);
                    },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(items) { return { type: postConstants.GETALL_SUCCESS, items} }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

function getAddAll(page) {
    return dispatch => {
        dispatch(request())
        postService.getAll(page)
        .then(
                page => {
                        dispatch(success(page));
                        var nowPath = history.location.pathname ? history.location.pathname : "/main";
                        history.push(nowPath);
                    },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_ADD_REQUEST } }
    function success(items) { return { type: postConstants.GETALL_ADD_SUCCESS, items} }
    function failure(error) { return { type: postConstants.GETALL_ADD_FAILURE, error } }
}

function getById(userId,page) {
    return dispatch => {
        dispatch(request())
        postService.getById(userId, page)
        .then(
                post => {
                        dispatch(success(post));
                        var nowPath = history.location.pathname ? history.location.pathname : "/main";
                        history.push(nowPath);
                    },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETBYID_REQUEST } }
    function success(items) { return { type: postConstants.GETBYID_SUCCESS, items} }
    function failure(error) { return { type: postConstants.GETBYID_FAILURE, error } }
}

function getAddById(userId,page) {
    return dispatch => {
        dispatch(request())
        postService.getById(userId, page)
        .then(
                post => {
                        dispatch(success(post));
                        var nowPath = history.location.pathname ? history.location.pathname : "/main";
                        history.push(nowPath);
                    },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETBYID_ADD_REQUEST } }
    function success(items) { return { type: postConstants.GETBYID_ADD_SUCCESS, items} }
    function failure(error) { return { type: postConstants.GETBYID_ADD_FAILURE, error } }
}

function like(pageId,userId) {
    return dispatch => {
        dispatch(request())
        postService.like(pageId,userId)
        .then(
                post => {
                        dispatch(success(post));
                        var nowPath = history.location.pathname ? history.location.pathname : "/main";
                        history.push(nowPath);
                    },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.LIKE_REQUEST } }
    function success(items) { return { type: postConstants.LIKE_SUCCESS, items} }
    function failure(error) { return { type: postConstants.LIKE_FAILURE, error } }
}

function dislike(pageId,userId) {
    return dispatch => {
        dispatch(request())
        postService.dislike(pageId,userId)
        .then(
                post => {
                        dispatch(success(post));
                        var nowPath = history.location.pathname ? history.location.pathname : "/main";
                        history.push(nowPath);
                    },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.DISLIKE_REQUEST } }
    function success(items) { return { type: postConstants.DISLIKE_SUCCESS, items} }
    function failure(error) { return { type: postConstants.DISLIKE_FAILURE, error } }
}

function getRandom(userId) {
    return dispatch => {
        dispatch(request())
            postService.getRandom(userId)
            .then(
                post => {
                    dispatch(success(post));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETRANDOM_REQUEST } }
    function success(items) { return { type: postConstants.GETRANDOM_SUCCESS, items} }
    function failure(error) { return { type: postConstants.GETRANDOM_FAILURE, error } }
}

function update(post) {
    return dispatch => {
        dispatch(request())
        postService.update(post)
        .then(
                post => {
                        dispatch(success(post));
                        dispatch(getAll(1));
                        var nowPath = history.location.pathname ? history.location.pathname : "/main";
                        history.push(nowPath);
                    },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.UPDATE_REQUEST } }
    function success(items) { return { type: postConstants.UPDATE_SUCCESS, items} }
    function failure(error) { return { type: postConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        postService.delete(id)
            .then(
                id => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type:postConstants.DELETE_REQUEST, id } }
    function success(id) { return { type:postConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type:postConstants.DELETE_FAILURE, id, error } }
}


import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import  App from "../components/App/App.jsx";
import { userActions, alertActions, postActions } from '../actions';

const mapStateToProps = (state) => {
        return {
            alert: {
                message: state.alert.message,
                type: state.alert.type
            },
            registration: {
                registering: state.registration.registering,
            },
            authentication: {
                loggingIn: state.authentication.loggingIn,
                user: state.authentication.user
            },
            user: {
                id:state.user.id,
                username:state.user.username
            },
            post: {
                list: state.post.list,
                random: state.post.random
            }
        };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions_getAll: () => {
            return dispatch(userActions.getAll());
        },
        userActions_delete: (id) => {
            return dispatch(userActions.delete(id));
        },
        userActions_logout: () => {
            return dispatch(userActions.logout());
        },
        userActions_login: (username, password) => {
            return dispatch(userActions.login(username, password));
        },
        userActions_register: (user) => {
            return dispatch(userActions.register(user));
        },
        userActions_update: (user) => {
            return dispatch(userActions.update(user));
        },
        alertActions_clear: () => {
            return dispatch(alertActions.clear());
        },
        postActions_register: (post) => {
            return dispatch(postActions.register(post));
        },
        postActions_getAll: (page) => {

            return dispatch(postActions.getAll(page));
        },
        postActions_getAddAll: (page) => {

            return dispatch(postActions.getAddAll(page));
        },
        postActions_getbyId: (userId, page) => {

            return dispatch(postActions.getById(userId, page));
        },
        postActions_getAddbyId: (userId, page) => {

            return dispatch(postActions.getAddById(userId, page));
        },
        postActions_getRandom: (id) => {

            return dispatch(postActions.getRandom(id));
        },
        postActions_update: (post) => {
            return dispatch(postActions.update(post));
        },
        postActions_like: (postId, userId) => {
            return dispatch(postActions.like(postId, userId));
        },
        postActions_dislike: (postId, userId) => {
            return dispatch(postActions.dislike(postId, userId));
        },
        postActions_delete: (postId) => {
            return dispatch(postActions.delete(postId));
        }
    };
};

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default AppContainer;

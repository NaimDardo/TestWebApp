import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
    logout,
} from '../../services/AuthService';
import jwt from 'jwt-decode';
export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(data, navigate) {
    return (dispatch) => {

        signUp(data)
        .then((response) => {
         
            dispatch(confirmedSignupAction(response.data));
            // history.pushState({},'','/');
            localStorage.removeItem('userDetails');
            dispatch(loginAction(response.data.email, response.data.password, navigate))
            
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logoutAction(navigate) {
    logout();
    localStorage.removeItem('userDetails');

    navigate('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                const data = jwt(response.data.access_token)
                saveTokenInLocalStorage(data);
                runLogoutTimer(
                    dispatch,
                    data.expiresIn * 1000,
                    navigate,
                );
                dispatch(loginConfirmedAction(data));
				
                navigate('/dashboard');
                
            })
            .catch((error) => {
                const errorMessage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    console.log(data)
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {

    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}

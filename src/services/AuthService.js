import axios from 'axios';
import swal from "sweetalert";
import ConfigData from '../config.json';

// import qs from 'qs';
import {
    loginConfirmedAction,
    logoutAction,
} from '../store/actions/AuthActions';
import { stringify } from 'qs';

export function signUp(data) {

    let dataS = JSON.stringify(data);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: ConfigData.SERVER_URL_PROD +'/users/register',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        data : dataS
      };
      
      return axios.request(config)
}

export function login(email, password) {
    let data = stringify({
        'username': email,
        'password': password 
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: ConfigData.SERVER_URL_PROD +'/users/login',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Accept': 'application/json'
        },
        data : data
      };
      
    return axios.request(config)
}
export function logout() {
    const postData = {
        
    };
    
    return axios.post(
        `${ConfigData.SERVER_URL_PROD}/users/logout`,
        postData,
    );
}


export function formatError(errorResponse) {
    switch (errorResponse.detail) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            return swal("Oops", "Email already exists", "error");
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'INVALID_PASSWORD_EMAIL':
            //return 'Invalid Password';
            swal("Oops", "Invalid Email or Password", "error",{ button: "Try Again!",});
            break;
        // case 'USER_DISABLED':
        //     return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        dispatch(logoutAction(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate, location) {
    // let navigate = props.router.navigate  
    if (location.pathname === '/page-register' || location.pathname === '/login') {return;}
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logoutAction(navigate));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logoutAction(navigate));
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, navigate);
}

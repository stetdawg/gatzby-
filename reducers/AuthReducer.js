import { LOGIN_EMAIL_CHANGED, LOGIN_PASSWORD_CHANGED, LOGIN_PASSWORD_RETYPE_CHANGED, AUTH_USER_SUCCESS} from '../actions/types';

const INITIAL_STATE = { user: '', email: '', password: '', repeatPassword: '' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_EMAIL_CHANGED:
            return {...state, email: action.payload };
        case LOGIN_PASSWORD_CHANGED:
            return {...state, password: action.payload };
        case LOGIN_PASSWORD_RETYPE_CHANGED:
            return {...state, repeatPassword: action.payload};
        case AUTH_USER_SUCCESS:
            return {...state, user: action.payload};
        default:
            return state;
    }
};

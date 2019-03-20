import { LOGIN_EMAIL_CHANGED, LOGIN_PASSWORD_CHANGED, AUTH_USER_ATTEMPT, AUTH_USER_SUCCESS, AUTH_USER_FAIL} from '../actions/types';

const INITIAL_STATE = { user: null, email: '', password: '', repeatPassword: '', error: '', loading: false};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_EMAIL_CHANGED:
            return {...state, email: action.payload };
        case LOGIN_PASSWORD_CHANGED:
            return {...state, password: action.payload };
        case AUTH_USER_ATTEMPT:
            return {...state, loading: true, error: ''};
        case AUTH_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
        case AUTH_USER_FAIL:
            return {...state, error: 'Authenication Failed', password: '', loading: false};
        default:
            return state;
    }
};

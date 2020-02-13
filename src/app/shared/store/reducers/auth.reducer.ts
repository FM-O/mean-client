import { User } from '../../models/user.model';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
    user: User;
    token: string;
    isLoggedIn: boolean;
    error: string;
};

export const initialAuthState: AuthState = {
    user: null,
    token: localStorage.getItem('jwt'),
    isLoggedIn: false,
    error: null
};

export function authReducer(state: AuthState = initialAuthState, action: AuthActions) {
    switch (action.type) {
        case AuthActionTypes.SIGNIN_ERROR:
        case AuthActionTypes.SIGNUP_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case AuthActionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true,
                error: null
            };
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isLoggedIn: false,
                error: null
            };
        case AuthActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
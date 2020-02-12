import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
    TRY_SIGNUP = '[ User ] - try signup',
    SIGNUP_SUCCESS = '[ User ] - signup success',
    SIGNUP_ERROR = '[ User ] - signup error',
    TRY_SIGNIN = '[ User ] - try signin',
    SIGNIN_SUCCESS = '[ User ] - signin success',
    SIGNIN_ERROR = '[ User ] - signin error',
    TRY_FETCH_CURRENT_USER = '[ User ] - try fetch current User',
    SET_CURRENT_USER = '[ User ] - set current User',
    TRY_REFRESH_TOKEN = '[ User ] - try refresh token',
    LOGOUT = '[ User ] - logout'
}

export class TrySignup implements Action {
    readonly type = AuthActionTypes.TRY_SIGNUP;
    constructor(public payload:User) {}
}

export class SignupSuccess implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
    constructor(public payload:any) {}
}

export class SignupError implements Action {
    readonly type = AuthActionTypes.SIGNUP_ERROR;
    constructor(public payload:any) {}
}

export class TrySignin implements Action {
    readonly type = AuthActionTypes.TRY_SIGNIN;
    constructor(public payload:{ email: string, password: string }) {}
}

export class SigninSuccess implements Action {
    readonly type = AuthActionTypes.SIGNIN_SUCCESS;
    constructor(public payload: string) {}
}

export class SigninError implements Action {
    readonly type = AuthActionTypes.SIGNIN_ERROR;
    constructor(public payload:any) {}
}

export class TryFetchCurrentUser implements Action {
    readonly type = AuthActionTypes.TRY_FETCH_CURRENT_USER;
}

export class SetCurrentUser implements Action {
    readonly type = AuthActionTypes.SET_CURRENT_USER;
    constructor(public payload:User) {}
}

export class TryRefreshToken implements Action {
    readonly type = AuthActionTypes.TRY_REFRESH_TOKEN;
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions = TrySignin |
                          SignupError |
                          SignupSuccess |
                          TrySignin |
                          SigninSuccess |
                          SigninError |
                          TryFetchCurrentUser |
                          SetCurrentUser |
                          TryRefreshToken |
                          Logout;
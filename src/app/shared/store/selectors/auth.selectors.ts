import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from '../reducers/auth.reducer';

export const authSelector = createFeatureSelector<AuthState>('auth');
export const errorAuthSelector = createSelector(authSelector, (authState:AuthState) => authState ? authState.error : null);

export const tokenSelector = createSelector(authSelector, (authState:AuthState) => authState ? authState.token : null);

export const isLoggedInSelector = createSelector(authSelector, (authState:AuthState) => authState ? authState.isLoggedIn : null);

export const currentUserSelector = createSelector(authSelector, (authState:AuthState) => authState ? authState.user : null);
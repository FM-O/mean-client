import * as AuthReducer from './auth.reducer';
import * as AuthActions from '../actions/auth.actions';

describe('auth reducer', () => {
    it ('should return initial state', () => {
        const { initialAuthState } = AuthReducer;
        const action = {} as any;

        expect(AuthReducer.authReducer(undefined, action)).toEqual(initialAuthState);
    });

    it ('should return return an error', () => {
        const { initialAuthState } = AuthReducer;
        const action = new AuthActions.SignupError({
            message: 'error'
        });

        const state = AuthReducer.authReducer(initialAuthState, action);

        expect(state.error).toEqual({
            message: 'error'
        });
    });
});
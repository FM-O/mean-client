import * as AuthActions from './auth.actions';


describe('auth actions', () => {

    describe('TrySignup action', () => {

        it('should create a TrySignup Action', () => {
            const payload = {
                email: 'test@test.com',
                name: 'testeur',
                password: '****'
            };

            const action = new AuthActions.TrySignup(payload);

            expect({ ...action }).toEqual({
                type: AuthActions.AuthActionTypes.TRY_SIGNUP,
                payload
            });
        });
    });

    describe('SignupError action', () => {

        it('should create a Signup Error', () => {
            const payload = {
                message: 'error'
            };

            const action = new AuthActions.SignupError(payload);

            expect({ ...action }).toEqual({
                type: AuthActions.AuthActionTypes.SIGNUP_ERROR,
                payload
            });
        });
    });
});
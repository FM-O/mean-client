import * as AuthSelectors from './auth.selectors';

describe('Auth selectors', () => {

    describe('errorAuthSelector', () => {

        it('should return null', () => {
            const mockState = {
                auth: {
                    token: null,
                    user: null,
                    error: null,
                    isLoggedIn: null
                }
            };

            expect(AuthSelectors.errorAuthSelector(mockState)).toEqual(null);
        });

        it('should return an error', () => {
            const mockState = {
                auth: {
                    token: null,
                    user: null,
                    error: 'error',
                    isLoggedIn: null
                }
            };

            expect(AuthSelectors.errorAuthSelector(mockState)).toEqual('error');
        });
    });
});
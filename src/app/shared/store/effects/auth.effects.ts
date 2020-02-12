import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, TrySignup, SignupError, SignupSuccess, TrySignin, SigninSuccess, SigninError, TryRefreshToken, Logout, TryFetchCurrentUser, SetCurrentUser } from '../actions/auth.actions';
import { map, catchError, exhaustMap, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, Subscription, EMPTY } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '..';
import { tokenSelector } from '../selectors/auth.selectors';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthEffects {
    private subscription: Subscription;

    @Effect()
    trySignup$ = this.actions$.pipe(
        ofType<TrySignup>(AuthActionTypes.TRY_SIGNUP),
        map( (action:TrySignup) => action.payload),
        // Exhaust allows the effect to be dispatched
        // only one time until the completion
        // (avoid signup by clicking again
        // on the button while the request is currently emitted)
        exhaustMap( (user:User) => {
            return this.authService.signup(user).pipe(
                map(user => new SignupSuccess(user)),
                catchError(error => of(new SignupError(error)))
            )
        })
    );

    @Effect({ dispatch: false })
    signupSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap(() => this.router.navigate(['/signin']))
    );

    @Effect()
    trySignin$ = this.actions$.pipe(
        ofType<TrySignin>(AuthActionTypes.TRY_SIGNIN),
        map( (action:TrySignin) => action.payload),
        exhaustMap( (credentials: {email:string, password: string}) => {
            return this.authService.signin(credentials).pipe(
                map(token => new SigninSuccess(token)),
                catchError(error => of(new SigninError(error)))
            )
        })
    );

    @Effect({ dispatch:false })
    signinSuccess$ = this.actions$.pipe(
        ofType<SigninSuccess>(AuthActionTypes.SIGNIN_SUCCESS),
        map((action:SigninSuccess) => action.payload),
        tap((token) => {
            localStorage.setItem('jwt', token);
            if (!this.subscription) {
                this.subscription = this.authService.initTimer().subscribe();
                this.router.navigate(['/']);
            }
        })
    );

    @Effect()
    tryRefreshToken$ = this.actions$.pipe(
        ofType<TryRefreshToken>(AuthActionTypes.TRY_REFRESH_TOKEN),
        withLatestFrom(this.store.pipe(select(tokenSelector))),
        switchMap( ([action, token]) => {
            if (token) {
                return this.authService.refreshToken().pipe(
                    map(token => new SigninSuccess(token)),
                    catchError(() => {
                        localStorage.removeItem('jwt');
                        if (this.subscription) {
                            this.subscription.unsubscribe();
                        }
                        return EMPTY;
                    })
                );
            } else {
                return EMPTY;
            }
        })
    );

    @Effect({ dispatch:false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.LOGOUT),
        tap(() => {
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = null;
            }
            localStorage.removeItem('jwt');
            this.router.navigate(['/']);
        })
    );

    @Effect()
    tryFetchCurrentUser$ = this.actions$.pipe(
        ofType<TryFetchCurrentUser>(AuthActionTypes.TRY_FETCH_CURRENT_USER),
        switchMap( () => {
            return this.userService.getCurrentUser().pipe(
                map(user => new SetCurrentUser(user)),
                catchError(error => {
                    console.log(error);
                    return EMPTY;
                })
            )
        })
    );

    constructor(
        private actions$:Actions,
        private authService:AuthService,
        private userService: UserService,
        private router:Router,
        private store:Store<State>
    ) { }
}
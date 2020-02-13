import { TestBed } from "@angular/core/testing";
import { AuthEffects } from './auth.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { hot, cold } from 'jasmine-marbles';
import * as AuthActions from '../actions/auth.actions';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

describe('****Auth effects****', () => {
    let effects:AuthEffects;
    let actions:Observable<any>;
    let routerService: Router;
    let authService:AuthService;

    let fakeAuth;

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({}),
                RouterTestingModule.withRoutes([
                    { path: 'signin', component: {} as any }
                ])
            ],
            providers: [
                AuthEffects,
                provideMockActions(() => actions),
                UserService,
                AuthService
            ]
        });

        effects = TestBed.get(AuthEffects);
        authService = TestBed.get(AuthService);
        routerService = TestBed.get(Router);
    });

    describe('trySignup$ effect', () => {
        it ('-> should return SignupSuccess action', () => {
            spyOn(authService, 'signup').and.returnValue(of({ email: 'test@test.com', name: 'testeur' }));
            actions = hot('---a-', { a: new AuthActions.TrySignup({
                email: 'test@test.com',
                name: 'testeur',
                password: '****'
            }) });
            
            const expected = cold('---b', { b: new AuthActions.SignupSuccess({ email: 'test@test.com', name: 'testeur' }) });
    
            expect(effects.trySignup$).toBeObservable(expected);
        });
    
        it ('-> should return SignupError action', () => {
            spyOn(authService, 'signup').and.returnValue(cold('-#', {}, 'error'));
            actions = hot('---a-', { a: new AuthActions.TrySignup({
                email: 'test@test.com',
                name: 'testeur',
                password: '****'
            }) });
    
            const expected = cold('----b', { b: new AuthActions.SignupError('error') });
    
            expect(effects.trySignup$).toBeObservable(expected);
        });
    });

    describe('signupSuccess$ effect', () => {
        it ('-> should navigate to /signin', () => {
            spyOn(routerService, 'navigate').and.callThrough();
            actions = hot('---a-', { a: new AuthActions.SignupSuccess({
                email: 'test@test.com',
                name: 'testeur'
            }) });
    
            const expected = cold('---b', { b: new AuthActions.SignupSuccess({
                email: 'test@test.com',
                name: 'testeur'
            }) });
    
            expect(effects.signupSuccess$).toBeObservable(expected);

            effects.signinSuccess$.subscribe(() => {
                expect(routerService.navigate).toHaveBeenCalledWith(['/signin']);
            });
        });
    });

    
});
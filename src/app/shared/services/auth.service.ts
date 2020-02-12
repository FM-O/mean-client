import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { JwtToken } from '../models/jwt-token.model';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { TryRefreshToken } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public subscription: Subscription;
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null    
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<State>
  ) { 
    this.initToken();
  }

  public initTimer() {
    return timer(2000, 5000).pipe(
      tap(() => this.store.dispatch(new TryRefreshToken()))
    );
    //   switchMap(() => {
    //     if (localStorage.getItem('jwt')) {
    //       console.log('try refresh token');
    //       return this.http.get<string>('/api/auth/refresh-token').pipe(
    //         tap((token) => {
    //           this.jwtToken.next({
    //             isAuthenticated: true,
    //             token: token
    //           });
    //           localStorage.setItem('jwt', token);
    //         })
    //       );
    //     } else {
    //       console.log('no token to refresh');
    //       this.subscription.unsubscribe();
    //       return of(null);
    //     }
    //   })
    // ).subscribe(() => {},
    // err => {
    //   this.jwtToken.next({
    //     isAuthenticated: false,
    //     token: null
    //   });
    //   localStorage.removeItem('jwt');
    //   this.subscription.unsubscribe();
    // }
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');

    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  public refreshToken(): Observable<string> {
    return this.http.get<string>('/api/auth/refresh-token');
  }

  public logout():void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });

    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }

  public signup(user:User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }
  
  public signin(credentials: {email: string, password:string}): Observable<string> {
    return this.http.post<string>('api/auth/signin', credentials);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { JwtToken } from '../models/jwt-token.model';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null    
  });

  constructor(
    private http: HttpClient
  ) { 
    this.initToken();
  }

  public initToken(): void {
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

  public signup(user:User): Observable<User> {
    return this.http.post<User>('/api/auth', user);
  }
  
  public signin(credentials: {email: string, password:string}): Observable<string> {
    return this.http.post<string>('api/auth/token', credentials).pipe(
      tap((token:string) => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: token
        });

        localStorage.setItem('jwt', token);
      })
    );
  }
}

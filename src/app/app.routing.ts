import { Route } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

export const APP_ROUTING: Route[] = [
    {path: '', component: HomepageComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent}
];
// Native modules
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modules
import { LayoutModule } from './layout.module';

// Components
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { SigninComponent } from 'src/app/components/signin/signin.component';
import { TopbarComponent } from '../components/topbar/topbar.component';

// Interceptors
import { AuthInterceptor } from '../interceptors/auth.interceptor';

const COMPONENTS = [
  SignupComponent,
  SigninComponent,
  TopbarComponent
]

@NgModule({
  declarations: COMPONENTS,
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  imports: [
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: COMPONENTS
})
export class CoreModule { }

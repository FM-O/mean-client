import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { TrySignup } from 'src/app/shared/store/actions/auth.actions';
import { errorAuthSelector } from 'src/app/shared/store/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  public error$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      name: [''],
      password: ['']
    });

    this.error$ = this.store.pipe(
      select(errorAuthSelector)
    );
  }

  public submit(): void {
    this.store.dispatch(new TrySignup(this.form.value));
    // this.authService.signup(this.form.value).subscribe((user: User) => {
    //   this.router.navigate(['/signin']);
    // }, err => {
    //   this.error = err.error;
    // })
  }
}

// Native modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './shared/modules/core.module';

// Components
import { AppComponent } from './app.component';

// Routing
import { APP_ROUTING } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTING)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

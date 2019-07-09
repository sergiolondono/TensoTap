import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ImageViewerModule } from 'ng2-image-viewer';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { IndexacionComponent } from './indexacion/indexacion.component';

import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth, AuthModule } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexacionComponent,
    HomeComponent,
    BsNavbarComponent
  ],
  imports: [
    AuthModule.forRoot(new AuthConfig({
      headerName: 'Authorization',
      headerPrefix: 'Bearer',
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('token') || ''),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: true
    })),

    BrowserModule,
    ImageViewerModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'indexacion', component: IndexacionComponent, canActivate: [AuthGuard]  }
    ])
  ],
  providers: [AuthService,  AuthHttp],
  bootstrap: [AppComponent]
})
export class AppModule { }

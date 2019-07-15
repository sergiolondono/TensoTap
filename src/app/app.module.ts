import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ImageViewerModule } from 'ng2-image-viewer';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { IndexacionComponent } from './indexacion/indexacion.component';

import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AuthGuard } from './auth-guard.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Http, RequestOptions } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DynamicFormBuilderModule } from 'src/dynamic-form-builder/dynamic-form-builder.module';
import { FieldsFunctionalityService } from './fields-functionality.service';

export function tokenGetter() {
  return localStorage.getItem('token');
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:56121', '192.168.213.196:8080']
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    ImageViewerModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      //{ path: '', component: HomeComponent },
      { path: '', component: IndexacionComponent, canActivate: [AuthGuard]},
      { path: 'home', component: HomeComponent },      
      { path: 'login', component: LoginComponent },
      { path: 'indexacion', component: IndexacionComponent, canActivate: [AuthGuard]  }
    ])
  ],
  providers: [
    FieldsFunctionalityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DynamicFormBuilderModule } from 'src/dynamic-form-builder/dynamic-form-builder.module';

import { AuthGuard } from './auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

import { IndexacionComponent } from './indexacion/indexacion.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { FieldsFunctionalityService } from './fields-functionality.service';
import { RecaptchaModule, 
  // RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module,
  RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RegisterComponent } from './register/register.component';
import { AprobarUsuariosComponent } from './aprobar-usuarios/aprobar-usuarios.component';
import { LoadingComponent } from './loading/loading.component';
import { CalidadComponent } from './calidad/calidad.component';
import { LoaderComponent } from './shared/loader/loader.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexacionComponent,
    HomeComponent,
    BsNavbarComponent,
    AprobarUsuariosComponent,
    LoadingComponent,
    CalidadComponent,
    LoaderComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelist
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    InlineSVGModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule,
    AngularFontAwesomeModule,
    RecaptchaModule,
    DataTablesModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot([
       { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      //{ path: '', component: CalidadComponent},
      //{ path: '', component: IndexacionComponent, canActivate: [AuthGuard]},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },      
      { path: 'login', component: LoginComponent },
      { path: 'registrarse', component: RegisterComponent },
      { path: 'aprobarusuarios', component: AprobarUsuariosComponent, canActivate: [AuthGuard] },
      { path: 'calidad', component: CalidadComponent, canActivate: [AuthGuard] },
      { path: 'indexacion', component: IndexacionComponent, canActivate: [AuthGuard]  }
    ])
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6Lf2LL8UAAAAAHgY8HFfDLznfrRraPSpfWnshCh1'
    } as RecaptchaSettings,
  }, 
FieldsFunctionalityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

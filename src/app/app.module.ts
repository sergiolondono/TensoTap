import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ImageViewerModule } from 'ng2-image-viewer';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IndexacionComponent } from './indexacion/indexacion.component';

import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AuthGuard } from './auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DynamicFormBuilderModule } from 'src/dynamic-form-builder/dynamic-form-builder.module';
import { FieldsFunctionalityService } from './fields-functionality.service';
import { RecaptchaModule, 
  // RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module,
  RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RegisterComponent } from './register/register.component';
import { AprobarUsuariosComponent } from './aprobar-usuarios/aprobar-usuarios.component';
import { LoadingComponent } from './loading/loading.component';
import { CalidadComponent } from './calidad/calidad.component';

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
    CalidadComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:58654', '192.168.213.196:8080']
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    ImageViewerModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
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
       //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: '', component: CalidadComponent},
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
      siteKey: '6Lfe_K0UAAAAAAJGJY-QeSWIXkCzWHNBpQjj9HjO'
    } as RecaptchaSettings,
  }, 
FieldsFunctionalityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

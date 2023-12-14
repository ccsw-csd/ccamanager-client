import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PyramidModule } from './pyramid/pyramid.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { PersonalModule } from './personal/personal.module';
import { InternModule } from './intern/intern.module';
import { OrganizationModule } from './organization/organization.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './core/services/http-interceptor.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { RefreshTokenResolverService } from './core/services/refresh-token-resolver.service';


registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    PersonalModule,
    InternModule,
    OrganizationModule,
    PyramidModule,
    MaintenanceModule,
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    DialogService,
    MessageService,
    RefreshTokenResolverService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

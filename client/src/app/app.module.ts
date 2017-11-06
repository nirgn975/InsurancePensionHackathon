import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { reducers } from './reducers';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { ChartComponent } from './chart/chart.component';
import { TabsComponent } from './tabs/tabs.component';

import { LoginService } from './login/login.service';
import { ChartService } from './chart/chart.service';
import { RegistrationService } from './registration/registration.service';

import { LoginEffects } from './login/login.effects';
import { ChartEffects } from './chart/chart.effects';
import { RegistrationEffects } from './registration/registration.effects';

import { ProfileGuard } from './profile/profile.guard';
import { LoginGuard } from './login/login.guard';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    ChartComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      LoginEffects,
      ChartEffects,
      RegistrationEffects,
    ]),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [
    LoginGuard,
    ProfileGuard,
    LoginService,
    ChartService,
    RegistrationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

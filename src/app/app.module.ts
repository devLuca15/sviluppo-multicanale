import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { StoreState } from './store/store.state';
import { StoreSelector } from './store/store-selector';

import { HttpClientModule } from '@angular/common/http';
import { TokenService } from './services/token.service';

import { ActivitiesComponent } from './components/activities/activities.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent, ProfileComponent, ActivitiesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    TabViewModule,
    CardModule,
    AvatarModule,
    BadgeModule,
    ToastModule,
    NgxsModule.forRoot([StoreState], {
      developmentMode: true,
      selectorOptions: {
        suppressErrors: false, // `true` by default
      },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [StoreSelector, TokenService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

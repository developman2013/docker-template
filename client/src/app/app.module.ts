import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoAppComponent } from './demo-app/demo-app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes = [
  {
      path: '',
      component: DemoAppComponent
  }
  ];
  @NgModule({
  imports: [
      RouterModule.forRoot(appRoutes),
      BrowserModule,
      FormsModule,
      HttpClientModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
  ],
  exports: [RouterModule],
  declarations: [
      AppComponent,
      DemoAppComponent
  ],
  bootstrap: [AppComponent]
  })
  export class AppModule {

  }

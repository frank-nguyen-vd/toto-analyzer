import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { TotoService } from "app/services/toto.service";


//import { RoutesModule } from "app/app.routes";

import { HttpModule } from '@angular/http';
import { TotosComponent } from './components/totos/totos.component';
import { HistoryDistributionComponent } from './components/history-distribution/history-distribution.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TotosComponent,
    HistoryDistributionComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //RoutesModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: 'TotoService',
      useClass: TotoService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

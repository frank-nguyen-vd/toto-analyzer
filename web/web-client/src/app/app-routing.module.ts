import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotosComponent } from './components/totos/totos.component';
import { AboutComponent } from './components/about/about.component';
import { HistoryDistributionComponent } from './components/history-distribution/history-distribution.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/history', pathMatch: 'full' },
  { path: 'history', component: HistoryDistributionComponent},
  { path: 'totos', component: TotosComponent },
  { path: 'rule', component: AboutComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }

import {Routes, RouterModule } from '@angular/router';
import { TotosComponent } from "app/components/totos/totos.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'totos',
        pathMatch: 'full'
    },
    {
        path: 'totos',
        component: TotosComponent
    }
];

export const RoutesModule = RouterModule.forRoot(routes);


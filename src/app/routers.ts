import { Routes } from '@angular/router';

import { BlackJackComponent } from './black-jack/black-jack.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'game',
    component: BlackJackComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

import { MenuComponent } from './menu/menu.component'
import { BlackJackComponent } from './black-jack/black-jack.component'
import { ErrorComponent } from './error/error.component'
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full'},
  { path: 'menu', component: MenuComponent },
  { path: 'game', component: BlackJackComponent},
  { path: '**', component: ErrorComponent }
];
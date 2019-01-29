import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from '../app/routers';
import { BlackJackComponent } from './black-jack/black-jack.component';
import { ErrorComponent } from './error/error.component';
import { GameComponent } from '../app/black-jack/game/game.component';
import { MenuComponent } from './menu/menu.component';
import { ScoreComponent } from '../app/black-jack/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    BlackJackComponent,
    ErrorComponent,
    GameComponent,
    MenuComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

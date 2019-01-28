import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScoreComponent } from '../app/black-jack/score/score.component';
import { GameComponent } from '../app/black-jack/game/game.component';
import { AppComponent } from './app.component';
import { BlackJackComponent } from './black-jack/black-jack.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ErrorComponent } from './error/error.component';
import { appRoutes } from '../app/routers';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    GameComponent,
    BlackJackComponent,
    MenuComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './routers';
import { BlackJackComponent } from './black-jack/black-jack.component';
import { ErrorComponent } from './error/error.component';
import { GameComponent } from './black-jack/game/game.component';
import { MenuComponent } from './menu/menu.component';
import { ScoreComponent } from './black-jack/score/score.component';
import { GameService } from './game.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

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
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }

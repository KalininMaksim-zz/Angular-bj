import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { GameService } from '../game.service';
import * as faker from 'faker';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.css']
})
export class MultiplayerComponent implements OnInit, OnDestroy {

  private _subscription$$;
  public rooms: [] = [];
  public newId: number = 0;
  public deck: number[];
  public locSorId: string = 'id';
  public locSorName: string = 'name'
  public player = {
    name: '',
    sumCards: 0,
    id: 1,
    roomMaster: false,
    state: true
  };

public constructor(
  private _dataBase: DataBaseService,
  private _gameService: GameService
) { }

 public ngOnInit (): void {

  this._subscription$$ = this._dataBase.getObserv().subscribe((itemsFromDb: []) => {
   console.log(itemsFromDb);
   this.rooms = itemsFromDb;
     itemsFromDb.forEach((room: {id: number}) => {
       if (room.id > this.newId) {
          this.newId = room.id;
       }
     });
     this.newId++;
   });
  }

  public addRoom(): void {
    this.deck = this._gameService.generateDeck();
    this._dataBase.addRoom(this.newId, this.deck);
   console.log(this.deck);

  }

  public deleteRoom(id: number): void {
    this._dataBase.deleteRoom(id);
  }

  public addPlayers(idRoom: number): void {
    this.player.id = Math.floor(new Date().getTime() / 1000);
    // @ts-ignore
    faker.locale = 'ru';
    if ( this.player.name === '' || this.player.name === undefined) {
      this.player.name = faker.fake('{{name.firstName}}');
    }
    this._dataBase.addPlayers(idRoom, this.player.name, this.player.id);

   localStorage.setItem(this.locSorId, String(this.player.id));
   localStorage.setItem(this.locSorName, this.player.name);
    this.player.name = '';
  }

  public ngOnDestroy(): void {

  this._subscription$$.unsubscribe();
  }
}

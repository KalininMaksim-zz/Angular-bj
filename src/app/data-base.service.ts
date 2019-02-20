import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable()

export class DataBaseService {

  public rooms: Observable<{}[]>;


 public constructor(public db: AngularFireDatabase) {

  }

 public getObserv(): Observable<{}[]> {
   return this.db.list('rooms').valueChanges();
 }

 public getRoom(id: number): Observable<{}> {
   return this.db.object(`rooms/room ${id}`).valueChanges();
 }

  public addRoom(id: number, deck: number[], isInitStaite: boolean): void {
    this.db.list(`rooms`).update( `room ${id}`, {id, 'deck': deck, isInitStaite});
  }

  public deleteRoom(id: number): void {
    this.db.list(`rooms`).remove(`room ${id}`);
  }
  public changeStateRoom(id: number, isInitStaite: boolean): void {
    this.db.list(`rooms`).update(`room ${id}`, {isInitStaite});
  }

  public addPlayers(id: number, name: string, idPlayer: number): void {
    this.db.object(`rooms/room ${id}/players/player ${idPlayer}`).update({id: idPlayer, name, sumCards: 0, roomMaster: false, myTurn: false, stopCard: false });
  }

  // public upDateRoom (idRoom: number, idPlayer: number, cards: number, sumCards: number): void {
  //  this.db.object(`rooms/room ${idRoom}/players/player ${idPlayer}`).update({cards, sumCards});
  // }////////// TODO: надо разобраться надо мне этот метод или нетю Или переписать

  public upDateDeck(idRoom: number, deck: number[]): void {
   this.db.object(`rooms/room ${idRoom}`).update({deck});
  }

  public upDatePlayer(idRoom: number, idPlayer: number, cards: number[], roomMaster: boolean, myTurn: boolean, sumCards: number, stopCard: boolean): void {
    this.db.object(`rooms/room ${idRoom}/players/player ${idPlayer}`).update({cards, roomMaster, myTurn, sumCards, stopCard});
  }
}


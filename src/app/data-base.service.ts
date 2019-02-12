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

  public addRoom(id: number, deck: number[]): void {

    this.db.list(`rooms`).update( `room ${id}`, {id, 'deck': deck});
  }

  public deleteRoom(id: number): void {
    this.db.list(`rooms`).remove(`room ${id}`);

  }

  public addPlayers(id: number, name: string, idPlayer: number): void {
    this.db.object(`rooms/room ${id}/players/player ${idPlayer}`).update({id: idPlayer, name, card: [0], sumCards: 0, roomMaster: false, state: true });
  }
}


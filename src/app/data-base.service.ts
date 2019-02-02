import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()

export class DataBaseService {

  public rooms: Observable<any[]>;
  public  a = 4;

 public constructor(public db: AngularFireDatabase) {

  }

 public getObserv() {
   return this.db.list('rooms').valueChanges();
 }

  public addRoom(id: number) {
    this.db.list(`rooms`).update( `room ${id}`, { name: 'Vasya', value: 3455, id});
  }
}

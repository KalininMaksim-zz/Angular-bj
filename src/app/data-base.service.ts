import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()

export class DataBaseService {

 // public db: AngularFireDatabase;
  public rooms: Observable<any[]>;
  public  a = 4;

 public constructor(public db: AngularFireDatabase) {


   db.list('rooms').update('room23', {name: 'Vasya', value : 3455});
   db.list('rooms').update('room23', {name: 'Vasya', value : 34333355});
  }

 public getObserv() {
    return this.db.list('rooms').valueChanges();
  }
}

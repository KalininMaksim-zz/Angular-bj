import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../data-base.service';


@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.css']
})
export class MultiplayerComponent implements OnInit {

  public rooms: [] = [];
  public newId: number = 0;
  public plaeyer: {} = {
    name: 'Vasily',
    card: [],
    sumCards: 0,
    id: 1,
    roomMaster: false,
    state: true
  };

public constructor(
  private dataBase: DataBaseService
) { }

 public ngOnInit (): void {
  // console.log(this.name);

   this.dataBase.getObserv().subscribe((itemsFromDb: []) => {
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
   this.dataBase.addRoom(this.newId);
  }

  public deleteRoom(id: number): void {
    this.dataBase.deleteRoom(id);
  }
}

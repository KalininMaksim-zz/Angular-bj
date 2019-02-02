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
  public count: number = 0;

public constructor(
  private dataBase: DataBaseService
) { }

 public ngOnInit () {

   this.dataBase.getObserv().subscribe((itemsFromDb: []) => {
   console.log(itemsFromDb);
   this.rooms = itemsFromDb;
     itemsFromDb.forEach((room: {id: number}) => {
       if (room.id > this.newId){
          this.newId = room.id

       }
     });
     this.newId++;
   });
  }
  addRoom(){
   this.dataBase.addRoom(this.newId);
  }
}

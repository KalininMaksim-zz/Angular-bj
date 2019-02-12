import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataBaseService } from '../data-base.service';
import { switchMap, pluck, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  private _subscription$$;
  public  room: object;
  public  roomId: number;
  public players: object;
  public deck: object[];

  public constructor(
    private route: ActivatedRoute,
    private _dataBase: DataBaseService) {
    this.route.params.subscribe();
  }

 public ngOnInit(): void {
  this._subscription$$ = this.route.params
    .pipe(
      pluck('id'),
      tap((roomId: number) => {
        this.roomId = roomId;
      }),
      switchMap((value: number) => this._dataBase.getRoom(value)),
      filter(Boolean),
      tap((room: object) => {
        this.room = room;
        this.players = room.players;
        this.deck = room.deck;
        console.log(room);
        console.log(room.players);
        console.log(this.deck);
      })

    ).subscribe();
  }

  public  ngOnDestroy(): void {
    this._subscription$$.unsubscribe();
  }
}

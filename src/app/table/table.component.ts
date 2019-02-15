import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataBaseService } from '../data-base.service';
import { GameService } from '../game.service';
import { switchMap, pluck, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  private _WIN_STATE: number = 21;
  private _subscription$$;
  // public winer: number;

  public winer: number = 0;
  public  room: Troom;
  public  roomId: number;
  public players: TPlayer;
  public playersArray = [];
  public deck: number[];
  public result: string = ``;
  public idFromLocalStorage: number;


  public constructor(

    private route: ActivatedRoute,
    private gameService: GameService,
    private _dataBase: DataBaseService) {
    this.route.params.subscribe();
  }

 public ngOnInit(): void {
  this._subscription$$ = this.route.params
    .pipe(
       take(1),
      pluck('id'),
      tap((roomId: number) => {
        this.roomId = roomId;
      }),
      switchMap((id: number) => this._dataBase.getRoom(id)),
      tap((room: Troom) => {
        this.room = room;
        this.players = room.players;

        this.playersArray = Object.values(room.players);
        this.deck = room.deck;
      })
    ).subscribe();
  }

  public startGame(): void {
    this.playersArray[0].roomMaster = true;

    this.playersArray.forEach((player) => {
      console.table(this.playersArray);
      player.cards = 0;
      player.cards = Object.values(player.cards);
      player.cards.push(this.room.deck.pop());
    this._dataBase.upDatePlayer(this.roomId, player.id, player.cards);
    this._dataBase.upDateDeck(this.roomId, this.room.deck);
    });
  }

  public takeCard(): void {
    this.playersArray.forEach((player) => {
      this.idFromLocalStorage = +localStorage.getItem('id');
      console.log(this.idFromLocalStorage);
      console.log(player.id);
      if (this.idFromLocalStorage === player.id) {
        player.cards.push(this.room.deck.pop());

        player.sumCards = this.gameService.getHandSum(player.cards);
        this._dataBase.upDateDeck(this.roomId, this.room.deck);
        this._dataBase.upDateRoom(this.roomId, player.id, player.cards, player.sumCards);
      }
      });
  }

  public checkWin(): void {
    let winner: number = 0;
    this.playersArray.forEach((player) => {
      if ( player.sumCards > winner && winner < this._WIN_STATE) {
        winner = player.sumCards;
      }
    });

    this.playersArray.forEach((player) => {
      if (player.sumCards > this._WIN_STATE) {
        this.result = `${player.name} lose :(`;
        alert(this.result);
        this.chek();

        return;
      }

      if ( player.sumCards === winner) {
        this.result = `${player.name} winner!!!`;
        alert(this.result);
        this.chek();

        return;
      }
    });

  }

  public chek() {
    console.log('11')
    this.playersArray.forEach((player) => {
      player.sumCards = 0;
      player.cards = [];
      this._dataBase.upDateRoom(this.room.id, player.id, player.cards, player.sumCards);
      this.room.deck = this.gameService.generateDeck();
      this._dataBase.upDateDeck(this.room.id, this.room.deck);

    });
  }
  // public checkWin (): void {
  //   this.playersArray.forEach((player: TPlayer) => {
  //     console.log(player.sumCards);
  //     if ( player.sumCards > this.winer ) {
  //      this.winer = player.sumCards;
  //     }
  //     console.log(this.winer);
  //   });
  //
  //   this.playersArray.forEach((player: TPlayer) => {
  //     console.log(player.sumCards);
  //     if (player.sumCards > this._WIN_STATE) {
  //       this.result = `${player.name} lose :(`;
  //       alert(this.result);
  //       return;
  //     }
  //
  //     if (player.sumCards === this._WIN_STATE) {
  //       this.result = `${player.name} win!!!`;
  //       alert(this.result);
  //       return;
  //     }
  //
  //     // if (player.sumCards > player.sumCards) {
  //     //   this.result = `${player.name} win!`;
  //     //   alert(this.result);
  //     //   return;
  //     // }
  //
  //     // if (player.sumCards === player.sumCards) {
  //     //   this.result = `${player.name} draw`;
  //     //   alert(this.result);
  //     //   return;
  //     // }
  //   });
  //
  //
  // }

  // public checkWin() {
  //   const winArr: [] = this.playersArray.reduce((prev, current) => {
  //     console.log(prev);
  //     console.log(current);
  //     if (current.sumCards === this._WIN_STATE) {
  //
  //      return [...prev, current.name];
  //     }
  //     return prev;
  //   }, []);
  //   console.log(winArr);
  // }

  public  ngOnDestroy(): void {
    this._subscription$$.unsubscribe();
  }
}

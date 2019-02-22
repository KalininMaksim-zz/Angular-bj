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

  public winer: number = 0;
  public  room: Troom;
  public  roomId: number;
  public players: TPlayer;
  public playersArray = [];
  public deck: number[];
  public result: string = ``;
  public isInitStaite: boolean;
  public stopCard: boolean;
  public idFromLocalStorage: number;



  private _count: number = 0;


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
        this.result = room.result;
        this.players = room.players;
        this.isInitStaite = room.isInitStaite;
        this.idFromLocalStorage = +localStorage.getItem('id');

        this.playersArray = Object.values(room.players);
        this.deck = room.deck;
        this.playersArray.forEach((player) => {
          this.stopCard = player.stopCard;
      
        });
      })
    ).subscribe();
  }

  public startGame(): void {
    this.isInitStaite = false;
    this._dataBase.changeStateRoom(this.roomId, this.isInitStaite);
    this.playersArray[0].roomMaster = true;
    this.playersArray[0].myTurn = true;

    this.playersArray.forEach((player) => {
      player.cards = [];
      player.cards = Object.values(player.cards);
      player.cards.push(this.room.deck.pop());
      this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
      this._dataBase.upDateDeck(this.roomId, this.room.deck);
    });
  }

  public takeCard(): void {
    this.playersArray.forEach((player, index: number) => {
      if (this.idFromLocalStorage === player.id && player.stopCard !== true) {
        this._count = index;
        player.myTurn = false;

        player.cards.push(this.room.deck.pop());
        player.sumCards = this.gameService.getHandSum(player.cards);
        this._dataBase.upDateDeck(this.roomId, this.room.deck);
        this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
        if (player.sumCards >= this._WIN_STATE) {
          this.stopTakeCard();
          // this.checkWin();
          // this.playersArray.forEach((player) => {
          //   player.stopCard = true;
          //   this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
          // });
        }
      }
    });
    this.passTurn();
    if ( this.playersArray[this._count].stopCard === true || this.playersArray[this._count].myTurn === false ) {
      this.passTurn();
    }
  }
  public passTurn(): void {
    this._count++;
    if (this.playersArray.length <= this._count) {
      this._count = 0;
    }
    this.playersArray[this._count].myTurn = true;
    this._dataBase.upDateTurnPlayer(this.roomId, this.playersArray[this._count].id, this.playersArray[this._count].myTurn);
  }

  public stopTakeCard(): void {
    this.playersArray.forEach((player, index: number) => {
      if (this.idFromLocalStorage === player.id) {
        this._count = index;
        player.stopCard = true;
        player.myTurn = false;
        this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
      }
    });
    this.passTurn();
    const checkWin: boolean = this.playersArray.every((player) => player.stopCard === true);
    if (checkWin === true) {
      this.checkWin();
    }
  }

  public checkWin(): void {
    let winner: number = 0;
    this.playersArray.forEach((player) => {
      if ( player.sumCards > winner && player.sumCards <= this._WIN_STATE) {
        winner = player.sumCards;
      }
    });

    this.playersArray.forEach((player) => {
      if ( player.sumCards > this._WIN_STATE) {
        this.result = ` no body win `;
        this._dataBase.upDateResult(this.roomId, this.result);

        return;
      }

      if (player.sumCards === winner) {
        this.result = `${player.name} winner!!!`;
        this._dataBase.upDateResult(this.roomId, this.result);
        
        return;
      }
    });
  }

  public restart(): void {
    this.isInitStaite = true;
    this.result = ``;
    this._dataBase.changeStateRoom(this.roomId, this.isInitStaite);
    this.playersArray.forEach((player) => {
      player.sumCards = 0;
      player.cards = [];
      player.stopCard = false;
      player.myTurn = false;
      this._dataBase.upDateResult(this.roomId, this.result);
      this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
      this.room.deck = this.gameService.generateDeck();
      this._dataBase.upDateDeck(this.room.id, this.room.deck);

    });
  }

  public  ngOnDestroy(): void {
    this._subscription$$.unsubscribe();
  }
}

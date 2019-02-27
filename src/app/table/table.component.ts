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

  public winer: number = 0;
  public room: Troom;
  public roomId: number;
  public roomMaster: boolean;
  public playersArray = [];
  public deck: number[];
  public result: string = ``;
  public isInitStaite: boolean;
  public stopCard: boolean;
  public idFromLocalStorage: number;
  public chekHowWin: boolean = false;


  private _WIN_STATE: number = 21;
  private _subscription$$;
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
        this.isInitStaite = room.isInitStaite;
        this.idFromLocalStorage = +localStorage.getItem('id');
        this.deck = room.deck;
        this.playersArray = Object.values(room.players);
        // console.log(this.playersArray[0]);
        // if (this.playersArray[0].roomMaster === false) {
        //   ///// metod
        //   this.appointRoomMaster();
        // }
        this.playersArray.forEach((player) => {
          this.stopCard = player.stopCard;
          if (player.sumCards === this._WIN_STATE) {
            // this.prematureStopGame();
          }
        });
        this.chekHowWin = this.playersArray.every((player) => player.stopCard === true);
      })
    ).subscribe();
  }

  // public appointRoomMaster(): void {
  //   this.playersArray[0].roomMaster = true;
  //   this.roomMaster = this.playersArray[0].roomMaster;
  //   console.log(this.roomMaster);
  //   // this._dataBase.upDatePlayer(this.roomId, this.playersArray[0].id, this.playersArray[0].cards, this.playersArray[0].roomMaster, this.playersArray[0].myTurn, this.playersArray[0].sumCards, this.playersArray[0].stopCard);

  // }

  public startGame(): void {
    this.isInitStaite = false;
    this._dataBase.changeStateRoom(this.roomId, this.isInitStaite);
    this.playersArray[0].roomMaster = true;
    this.playersArray[0].myTurn = true;
    // this.roomMaster = this.playersArray[0].roomMaster;
    // console.log(this.roomMaster);

    this.playersArray.forEach((player) => {
      player.cards = [];
      player.cards = Object.values(player.cards);
      // player.cards = this.room.deck.splice(-2, 2);
      player.cards.push(this.room.deck.pop());
      player.sumCards = this.gameService.getHandSum(player.cards);
      this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
      this._dataBase.upDateDeck(this.roomId, this.room.deck);
    });
  }

  public takeCard(): void {
    this.playersArray.forEach((player, index: number) => {
      if (this.idFromLocalStorage === player.id && player.stopCard === false) {
        this._count = index;
        player.cards.push(this.room.deck.pop());
        player.sumCards = this.gameService.getHandSum(player.cards);
        this._dataBase.upDateDeck(this.roomId, this.room.deck);
        player.myTurn = false;
        this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
        // if (player.sumCards >= this._WIN_STATE) {
        //   this.stopTakeCard();
        // }
      }
    });
    this.passTurn();
    if (this.playersArray[this._count].stopCard === true && this.playersArray[this._count].myTurn === false) {
      this.passTurn();
    }
  }

  public passTurn(): void {
    this._count++;
    if (this.playersArray.length <= this._count) {
      this._count = 0;
    }
    this.playersArray[this._count].myTurn = true;
    if (this.playersArray[this._count].stopCard === true) {
      this.playersArray[this._count].myTurn = false;
    }
    if(this.playersArray[this._count].stopCard === true && this.playersArray[this._count].myTurn === false){
      this.passTurn();
    }
    this._dataBase.upDateTurnPlayer(this.roomId, this.playersArray[this._count].id, this.playersArray[this._count].myTurn);
  }

  public stopTakeCard(): void {
    this.playersArray.forEach((player, index: number) => {
      if (this.idFromLocalStorage === player.id) {
        this._count = index;
        player.stopCard = true;
        if (player.stopCard === true) {
          player.myTurn = false;
        }
        player.stopCard = true;
        this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
      }
    });
    this.passTurn();
    if (this.playersArray[this._count].stopCard === true && this.playersArray[this._count].myTurn === false) {
      this.passTurn();
    }
    // this.chekHowWin = this.playersArray.every((player) => player.stopCard === true);
    // if (this.chekHowWin === true) {
    //   this.stopGame();
    // }
  }

  // public stopGame(): void {
  //   let winner: number = 0;
  //   this.playersArray.forEach((player) => {
  //     if (player.sumCards > winner && player.sumCards <= this._WIN_STATE) {
  //       winner = player.sumCards;
  //     } else {
  //       this.result = `no body`;
  //       this._dataBase.upDateResult(this.roomId, this.result);
  //     }
  //   });
  //   this.playersArray.forEach((player) => {
  //     if (player.sumCards === winner) {
  //       this.result = `${player.name} winner!!!`;
  //       this._dataBase.upDateResult(this.roomId, this.result);
  //     }
  //   });
  // }

  // public prematureStopGame(): void {
  //   this.playersArray.forEach((player) => {
  //     player.myTurn = false;
  //     player.stopCard = true;
  //     // if (player.stopCard === false) {
  //     //   player.stopCard = true;
  //       this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
  //     // }
  //   });
  // }

  // public reset(): void {
  //   this.playersArray.forEach((player) => {
  //     if(player.sumCards === 21){
  //       player.sumCards = 0;
  //       player.cards = [];
  //     }
  //     player.sumCards = 0;
  //     player.cards = [];
  //     player.stopCard = false;
  //     player.myTurn = false;
  //     this._dataBase.upDatePlayer(this.roomId, player.id, player.cards, player.roomMaster, player.myTurn, player.sumCards, player.stopCard);
  //   });
  //   this.room.deck = this.gameService.generateDeck();
  //   this._dataBase.upDateDeck(this.room.id, this.room.deck);
  //   this.isInitStaite = true;
  //   this.result = ``;
  //   this._dataBase.upDateResult(this.roomId, this.result);
  //   this._dataBase.changeStateRoom(this.roomId, this.isInitStaite);
  // }

  public ngOnDestroy(): void {
    this._subscription$$.unsubscribe();
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public handPlayer: number[] = [];
  public handDealer: number[] = [];
  public result: string = `Let's play, a piece of meat?`;
  public hideElem: boolean = false; // false --> hide // true --> show
  public showElem: boolean = true;
  public sumDealerCards: number = 0;
  public sumPlayerCards: number = 0;


  private readonly CHECK_THE_VALUE_WIN: number = 21;
  private readonly CHECKING_DEALER_ACTIONS: number = 15;

  private _myDeck: number[] = [];
  private _deck: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11];


  public startGame(): void {
    this._newDeck();
    this._resetResult();
    this.takeCard();
    this.showElem = false;
    this.hideElem = true;

  }
  public getHandSum(hand: number[]): number { // amount of nominal in hand
    let sum: number = 0;
    hand.forEach(( item: number ) => sum += item);

    return sum;
  }
  public takeCard(): void { // take more & bust (player & dealer)
    this.handPlayer.push(this._myDeck.pop());
    this.sumPlayerCards = this.getHandSum(this.handPlayer);
    if (this.sumPlayerCards === this.CHECK_THE_VALUE_WIN) {
      this._showResult('You Win!!!');

      return;
    }

    if (this.sumPlayerCards > this.CHECK_THE_VALUE_WIN) {
      this._showResult('You Bust!!!');

      return;
    }

    if (this.sumDealerCards <= this.CHECKING_DEALER_ACTIONS) {
      this._takeDealer();

      return;
    }
  }

  public compareCard(): void {
    if (this.sumPlayerCards === this.sumDealerCards) {
      this._showResult('Nobody');

      return;
    }

    if (this.sumPlayerCards > this.sumDealerCards) {
      this._showResult('You Win!!!');

      return;
    }

    if (this.sumDealerCards > this.sumPlayerCards) {
      this._showResult('You lose, maybe another time :)');

      return;
    }
  }


  private _newDeck(): void {
    if (this._myDeck.length !== 0) {
      this._myDeck = [...this._myDeck, ...this.handDealer, ...this.handPlayer];
      this._myDeck.sort(() => .5 - Math.random());
    }
    this._myDeck = this._deck.sort(() => .5 - Math.random());
  }

  private _resetResult(): void {
    this.handPlayer = [];
    this.handDealer = [];
    this.result = `Let's play, a piece of meat?`;
  }

  private _takeDealer(): void {
    this.handDealer.push(this._myDeck.pop());
    this.sumDealerCards = this.getHandSum(this.handDealer);
    if (this.sumDealerCards > this.CHECK_THE_VALUE_WIN) {
      this._showResult(' Bust dealer!!! Dammit! ');
      return;
    }
  }

  private _showResult(message: string): void {
    this.result = message;
    this.showElem = true;
    this.hideElem = false;
  }
}

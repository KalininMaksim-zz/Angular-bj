import { Component } from '@angular/core';

@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.component.html',
  styleUrls: ['./black-jack.component.css']
})
export class BlackJackComponent {

  public handPlayer: number[] = [];
  public handDealer: number[] = [];
  public result: string = `Let's play, a piece of meat?`;
  public itsInitState: boolean = false; // false --> hide // true --> show
  public sumDealerCards: number = 0;
  public sumPlayerCards: number = 0;


  private readonly _CHECK_THE_VALUE_WIN: number = 21;
  private readonly _MAX_DEALER_SCORE: number = 15;

  private _myDeck: number[] = [];
  private _deck: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11];


  public startGame(): void {
    this._newDeck();
    this._resetResult();
    this.takeCard();
    this.itsInitState = true;
  }

  public getHandSum(hand: number[]): number { // amount of nominal in hand
    let sum: number = 0;
    hand.forEach((item: number) => sum += item);

    return sum;
  }
  public takeCard(): void { // take more & bust (player & dealer)
    this.handPlayer.push(this._myDeck.pop());
    this.sumPlayerCards = this.getHandSum(this.handPlayer);
    if (this.sumPlayerCards === this._CHECK_THE_VALUE_WIN) {
      this._showResult('You Win!!!');

     return;
    }

    if (this.sumPlayerCards > this._CHECK_THE_VALUE_WIN) {
      this._showResult('You Bust!!!');

      return;
    }
    this._getCardDealer();
  }

  public compareCard(): void {
    this._takeDealer();

    if (this.sumDealerCards > this._CHECK_THE_VALUE_WIN) {
      this._showResult(' Bust dealer!!! Dammit! ');

      return;
    }

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

      return;
    }
    this._myDeck = this._deck.sort(() => .5 - Math.random());
  }

  private _resetResult(): void {
    this.sumDealerCards = 0;
    this.sumPlayerCards = 0;
    this.handPlayer = [];
    this.handDealer = [];
    this.result = `Let's play, a piece of meat?`;
  }

  private _getCardDealer(): void {
    this.handDealer.push(this._myDeck.pop());
    this.sumDealerCards = this.getHandSum(this.handDealer);
  }

  private _takeDealer(): void {
    while (this.sumDealerCards < this._MAX_DEALER_SCORE) {
      this._getCardDealer();

      if (this.sumDealerCards > this._CHECK_THE_VALUE_WIN) {
        this.compareCard();
      }
    }
  }

  private _showResult(message: string): void {
    this.result = message;
    this.itsInitState = false;

  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public playerCarts: string = `player carts: `;
  public allPointPlayer: string = `player points: `;
  public dealerCarts: string = `dealer cards: `;
  public allPointDealer: string = `dealer points: `;
  public result: string = `Let's play, a piece of meat?`;
  public toggle: boolean = false; // false --> none // true --> inline

  private _handPlayer: number[] = [];
  private _handDealer: number[] = [];
  private _myDeck: number[] = [];
  private _deck: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11];
  private readonly CHECK_THE_VALUE_WIN: number = 21;
  private readonly CHECKING_DEALER_ACTIONS: number = 15;


  public startGame(): void {
    this._newDeck();
    this._resetResult();
    this.takeCard();
  }

  public takeCard(): void { // взять еще и перебор (игрок и дилер)
    this._handPlayer.push(this._myDeck.pop());
    this.playerCarts = 'player cards: ' + this._handPlayer;
    this.allPointPlayer = 'player points: ' + this._getHandSum(this._handPlayer);

    if (this._getHandSum(this._handPlayer) === this.CHECK_THE_VALUE_WIN) {
      this._showResult('You Win!!!');

      return;
    }

    if (this._getHandSum(this._handPlayer) > this.CHECK_THE_VALUE_WIN) {
      this._showResult('You Bust!!!');

      return;
    }

    if (this._getHandSum(this._handDealer) <= this.CHECKING_DEALER_ACTIONS) {
      this._takeDealer();

      return;
    }
  }

  public compareCard(): void {

    if (this._getHandSum(this._handPlayer) === this._getHandSum(this._handDealer)) {
      this._showResult('Nobody');

      return;
    }

    if (this._getHandSum(this._handPlayer) > this._getHandSum(this._handDealer)) {
      this._showResult('You Win!!!');

      return;
    }

    if (this._getHandSum(this._handDealer) > this._getHandSum(this._handPlayer)) {
      this._showResult('You lose, maybe another time :)');

      return;
    }
  }


  private _newDeck(): void {

    if (this._myDeck.length !== 0) {
      this._myDeck = [...this._myDeck, ...this._handDealer, ...this._handPlayer];
      this._myDeck.sort(() => .5 - Math.random());
    } else {
      this._myDeck = this._deck.sort(() => .5 - Math.random());
    }
  }

  private _resetResult(): void {
    this._handPlayer = [];
    this._handDealer = [];
    this.result = `Let's play, a piece of meat?`;
    this.allPointDealer = 'dealer points: ';
    this.allPointPlayer = 'player points: ';
    this.toggle = true;
  }

  private _getHandSum(hand: number[]): number { // сумма номинала в руке
    let sum: number = 0;
    for (let i: number = 0; hand.length > i; i++) {
      sum += hand[i];
    }

    return sum;
  }

  private _takeDealer(): void {
    this._handDealer.push(this._myDeck.pop());
    this.dealerCarts = 'dealer cards: ' + this._handDealer[0];
    if (this._getHandSum(this._handDealer) > this.CHECK_THE_VALUE_WIN) {
      this._showResult(' Bust dealer!!! Dammit! ');
      return;
    }
  }

  private _showResult(message: string): void {
    this.result = message;
    this.allPointDealer = 'dealer points: ' + this._getHandSum(this._handDealer);
    this.dealerCarts = 'dealer cards: ' + this._handDealer;
    this.toggle = false;

  }
}

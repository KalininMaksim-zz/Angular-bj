import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public playerCarts: string;
  public allPointPlayer: string;
  public dealerCarts: string;
  public allPointDealer: string;
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
    this.playerCarts = this._handPlayer.toString();
    this.allPointPlayer = this._getHandSum(this._handPlayer).toString();

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
    }
    this._myDeck = this._deck.sort(() => .5 - Math.random());
  }

  private _resetResult(): void {
    this._handPlayer = [];
    this._handDealer = [];
    this.result = `Let's play, a piece of meat?`;
    this.allPointDealer = '';
    this.allPointPlayer = '';
    this.toggle = true;
  }

  private _getHandSum(hand: number[]): number { // сумма номинала в руке
    let sum: number = 0;
    hand.forEach(( item: number ) => sum += item);

    return sum;
  }

  private _takeDealer(): void {
    this._handDealer.push(this._myDeck.pop());
    this.dealerCarts = this._handDealer[0].toString();
    if (this._getHandSum(this._handDealer) > this.CHECK_THE_VALUE_WIN) {
      this._showResult(' Bust dealer!!! Dammit! ');
      return;
    }
  }

  private _showResult(message: string): void {
    this.result = message;
    this.allPointDealer = this._getHandSum(this._handDealer).toString();
    this.dealerCarts = this._handDealer.toString();
    this.toggle = false;
  }
}

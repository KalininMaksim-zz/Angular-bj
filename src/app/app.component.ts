import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = 'angular-bj';
  public handPlayer: number[] = [];
  public handDealer: number[] = [];
  public myDeck: number[] = [];
  public playerCarts: string = `player carts: `;
  public allPointPlayer: string = `player points: `;
  public dealerCarts: string = `dealer cards: `;
  public allPointDealer: string = `dealer points: `;
  public result: string = `Let's play, a piece of meat?`;
  public togle: boolean = false; // false --> none // true --> inlaine


  private _deck: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11,
  6, 7, 8, 9, 10, 2, 3, 4, 11,
  6, 7, 8, 9, 10, 2, 3, 4, 11,
  6, 7, 8, 9, 10, 2, 3, 4, 11];
  private constWin: number = 21;
  private constCheck: number = 15;

  public startGame(): void {
    this._newDeck();
    this._resetResult();
    this.takeCard();
  }

  private _newDeck(): void {

    if (this.myDeck.length !== 0) {
      this.myDeck = [...this.myDeck, ...this.handDealer, ...this.handPlayer];
      this.myDeck.sort(() => .5 - Math.random());
    } else {
      this.myDeck = this._deck.sort(() => .5 - Math.random());
    }
  }

  private _resetResult(): void {
    this.handPlayer = [];
    this.handDealer = [];
    this.result = `Let's play, a piece of meat?`;
    this.allPointDealer = 'dealer points: ';
    this.allPointPlayer = 'player points: ';
    this.togle = true;
  }

  private _getHandSum(hand: number[]): number { // сумма номинала в руке
    let sum: number = 0;
    for (let i: number = 0; hand.length > i; i++) {
      sum += hand[i];
    }
    return sum;
  }

  public takeCard(): void { // взять еще и перебор (игрок и дилер)
    this.handPlayer.push(this.myDeck.pop());
    this.playerCarts = 'player cards: ' + this.handPlayer;
    this.allPointPlayer = 'player points: ' + this._getHandSum(this.handPlayer);

    if (this._getHandSum(this.handPlayer) === this.constWin ) {
      this.result = ' You Win!!! ';
      this._showResult();
      return;
    }

    if (this._getHandSum(this.handPlayer) > this.constWin) {
      this.result = ' You Bust!!! ';
      this._showResult();
      return;
    }

    if (this._getHandSum(this.handDealer) <= this.constCheck) {
      this._takeDealer();
      return;
    }
  }

  private _takeDealer(): void {
    this.handDealer.push(this.myDeck.pop());
    this.dealerCarts = 'dealer cards: ' + this.handDealer[0];
    if (this._getHandSum(this.handDealer) > this.constWin) {
      this.result = ' Bust dealer!!! Dammit! ';
      this._showResult();
      return;
    }
  }

  private _showResult(): void {
    this.allPointDealer = 'dealer points: ' + this._getHandSum(this.handDealer);
    this.dealerCarts = 'dealer cards: ' + this.handDealer;
    this.togle = false;
  }

  public compareCard(): void {
    this._showResult();

    if (this._getHandSum(this.handPlayer) === this._getHandSum(this.handDealer)) {
      this.result = ' Nobody ';
      return;
    }

    if (this._getHandSum(this.handPlayer) === this.constWin || this._getHandSum(this.handPlayer) > this._getHandSum(this.handDealer)) {
      this.result = ' You Win!!! ';
      return;
    }

    if (this._getHandSum(this.handPlayer) < this.constWin || this._getHandSum(this.handDealer) > this._getHandSum(this.handPlayer)) {

      this.result = `You lose, maybe another time :)`;
      return;
    }
  }
}

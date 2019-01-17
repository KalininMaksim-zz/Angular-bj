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
  public result: string = `Let's play, a piece of meat?`
  public togle: boolean = false;


  private _deck: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11,
  6, 7, 8, 9, 10, 2, 3, 4, 11,
  6, 7, 8, 9, 10, 2, 3, 4, 11,
  6, 7, 8, 9, 10, 2, 3, 4, 11];


  public constructor(){
    
  }
  public startGame(): void {
    this.newDeck();
    this.resetResult();
    this.takeCard();
  }

  public newDeck(): void {

    if(this.myDeck.length !== 0) {
      this.myDeck = [...this.myDeck, ...this.handDealer, ...this.handPlayer];
      this.myDeck.sort(() => .5 - Math.random());
    } else {
      this.myDeck = this._deck.sort(() => .5 - Math.random());
    }
  }

  public resetResult(): void {
    this.handPlayer = [];
    this.handDealer = [];
  
    // document.querySelector('.result').innerHTML = 'Let&#39;s play, a piece of meat?';
    // document.querySelector('.all-point-dealer').innerHTML = 'dealer points: ';
    // document.querySelector('.all-point-player').innerHTML = 'player points: ';
  
    // document.querySelector('.control-btn').style.display = 'inline';
  }

  public getHandSum(hand): number { //сумма номинала в руке
    let sum = 0;
  
    for (let i = 0; hand.length > i; i++) {
      sum += hand[i];
    };
  
    return sum;
  }

  public takeCard() { // взять еще и перебор (игрок и дилер)
    this.handPlayer.push(this.myDeck.pop());
  
    // document.querySelector('.player-carts').innerHTML = 'player cards: ' + handPlayer;
    // document.querySelector('.all-point-player').innerHTML = 'player points: ' + getHandSum(handPlayer);
  
    if(this.getHandSum(this.handDealer) <= 15) {
      this.takeDealer();
  
      return;       
    }
  
    if(this.getHandSum(this.handPlayer) == 21) {
      // document.querySelector('.result').innerHTML = ' You Win!!! ';
      this.showResult();
  
      return;
    }
  
    if(this.getHandSum(this.handPlayer) > 21) {
      // document.querySelector('.result').innerHTML = ' You Bust!!! ';
      this.showResult();
  
      return;
    }
  }

  public takeDealer(): void {
    this.handDealer.push(this.myDeck.pop());
    // document.querySelector('.dealer-carts').innerHTML = 'dealer cards: ' + handDealer[0];
  
    if(this.getHandSum(this.handDealer) > 21) {
      // document.querySelector('.result').innerHTML = ' Bust dealer!!! Dammit! ';
      this.showResult();
  
      return;
    }
  }

  public showResult(): void {
    // document.querySelector('.all-point-dealer').innerHTML = 'dealer points: ' + getHandSum(handDealer);
    this.allPointDealer = 'dealer points: ' + this.getHandSum(this.handDealer);
    // document.querySelector('.dealer-carts').innerHTML = 'dealer cards: ' + handDealer;
    this.dealerCarts = 'dealer cards: ' + this.handDealer;
    // document.querySelector('.control-btn').style.display = 'none';
    this.togle = false;
  }

  public compareCard(): void {
    this.showResult();
  
    if(this.getHandSum(this.handPlayer) == this.getHandSum(this.handDealer)) {
      // document.querySelector('.result').innerHTML = ' Nobody ';
      this.result = ' Nobody ';
  
      return;
    }
  
    if(this.getHandSum(this.handPlayer) == 21 || this.getHandSum(this.handPlayer) > this.getHandSum(this.handDealer)) {
      // document.querySelector('.result').innerHTML = ' You Win!!! ';
      this.result = ' You Win!!! ';
  
      return;
    }
  
    if(this.getHandSum(this.handPlayer) < 21 || this.getHandSum(this.handDealer) > this.getHandSum(this.handPlayer)) {
      // document.querySelector('.result').innerHTML = ' You lose, maybe<br>another time, darling :)) ';
      this.result = 'You lose, maybe<br>another time, darling :))';
  
      return;
    }
  }
}

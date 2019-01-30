import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public deck: number[] = [6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11,
    6, 7, 8, 9, 10, 2, 3, 4, 11];


  public generateDeck(): number[] {
    return this.deck.sort(() => .5 - Math.random());
  }

  public getHandSum(hand: number[]): number { // amount of nominal in hand
    let sum: number = 0;
    hand.forEach((item: number) => sum += item);

    return sum;
  }
}

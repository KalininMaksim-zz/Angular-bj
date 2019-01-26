import { Component,Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})


export class ScoreComponent {

  @Output() emitStartGame: EventEmitter<void> = new EventEmitter();
  @Output() emitTakeCard: EventEmitter<void> = new EventEmitter();
  @Output() emitCompareCard: EventEmitter<void> = new EventEmitter();

  @Input() public isShowButtons: boolean;
  @Input() public handPlayerInScore: number[];
  @Input() public sumDealerCardsInScore: number;
  @Input() public sumPlayerCardsInScore: number;
  @Input() public handDealerInScore: number[]

 
 public startGameButtonClicked(): void {
  this.emitStartGame.emit();
 }

 public takeCardButtonCliked(): void {
  this.emitTakeCard.emit();
 }

 public compareCardCliked(): void {
  this.emitCompareCard.emit();
 }
}

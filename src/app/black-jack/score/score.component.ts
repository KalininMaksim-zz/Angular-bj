import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})


export class ScoreComponent {

  @Output() public emitStartGame: EventEmitter<void> = new EventEmitter();
  @Output() public emitTakeCard: EventEmitter<void> = new EventEmitter();
  @Output() public emitCompareCard: EventEmitter<void> = new EventEmitter();

  @Input() public isShowButtons: boolean;
  @Input() public handPlayerInScore: number[];
  @Input() public sumDealerCardsInScore: number;
  @Input() public sumPlayerCardsInScore: number;
  @Input() public handDealerInScore: number[];


 public startGameButtonClicked(): void {
  this.emitStartGame.emit();
 }

 public takeCardButtonClicked(): void {
  this.emitTakeCard.emit();
 }

 public compareCardClicked(): void {
  this.emitCompareCard.emit();
 }
}

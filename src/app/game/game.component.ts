import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';


  constructor(public dialog: MatDialog) {
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
  }


  ngOnInit(): void {
    this.newGame();
  }


  takeNewCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
  
      setTimeout(() => {
        this.game.cardsOutOfGame.push(this.currentCard);
        this.pickCardAnimation = false;
        if(this.game.currentPlayer + 1 < this.game.players.length) {
          this.game.currentPlayer++;
        } else {
          this.game.currentPlayer = 0;
        }

      }, 1000);
    }
  }


  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      this.game.players.push(name);
      console.log(this.game.players);
    });
  }






}

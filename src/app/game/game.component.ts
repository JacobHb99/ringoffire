import { Component, inject, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, doc, addDoc, updateDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;
  firestore: Firestore = inject(Firestore);
  games$!: Observable<any[]>;
  currentCard: string = '';
  currentGameId: string = '';
  unsubGames;


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    //this.getGameId();
    const coll = this.getGameRef();
    console.log("coll", coll);
    this.subGame();

  }


  newGame() {
    this.game = new Game();
    console.log("game", this.game);
    console.log("firestore", this.firestore);
    console.log("getGameRef", this.getGameRef());
    console.log("route", this.route)
  }


  ngOnInit(): void {
    this.newGame();
  }


  subGame() {
    if(this.firestore){
      this.unsubGames = onSnapshot(this.getSingleRef("games", "IjMEYN4ki8ls22xZzknS"), (doc:any) => {
      this.game.currentPlayer = doc.data().currentPlayer; 
      this.game.cardsOutOfGame = doc.data().playedCards; 
      this.game.players = doc.data().players; 
      this.game.stack = doc.data().stack; 
      this.game.pickCardAnimation = doc.data().pickCardAnimation;
      this.game.currentCard = doc.data().currentCard;
    });
  }
  }


  getGameId() {
    this.route.params.subscribe((param) => {
      this.currentGameId = this.route.snapshot.params['id'];
    }); 
  }


  async addGame(game: {}) {
    await addDoc(this.getGameRef(), game).catch(((err) => {
      console.error(err);
    })).then((docRef) => {
      console.log('document written with ID:');
    })
  }


  async updateGame(game: Game) {
    if (this.game.gameId) {
      await updateDoc(this.getSingleRef('games', this.currentGameId), this.updatedJSON(game));
    }
  }


  getGameRef() {
    return collection(this.firestore, 'games');
  }


  getSingleRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


  updatedJSON(game: Game) {
    return {
        players:  game.players,
        stack: game.stack,
        cardsOutOfGame: game.cardsOutOfGame,
        currentPlayer: game.currentPlayer,
        currentCard: game.currentCard,
        pickCardAnimation: game.pickCardAnimation,
        gameId: game.gameId
    };
}


  takeNewCard() {
    if (!this.game.pickCardAnimation && this.game.stack.length > 0 && this.game.players.length > 0) {
      this.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
  
      setTimeout(() => {
        this.game.cardsOutOfGame.push(this.currentCard);
        this.game.pickCardAnimation = false;

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}

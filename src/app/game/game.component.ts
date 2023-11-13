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
  game!: Game;
  firestore: Firestore = inject(Firestore);
  games$!: Observable<any[]>;
  currentCard: string = '';
  currentGameId: string = 'IjMEYN4ki8ls22xZzknS';
  unsubGames;


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    
    const coll = this.getGameRef();
    console.log("coll", coll);
    this.subGame();

  }


  newGame() {
    this.game = new Game();
  
    console.log(this.game);
    console.log("firestore", this.firestore);
    console.log("getGameRef", this.getGameRef());
    console.log("route", this.route);
  }


  ngOnInit(): void {
    this.newGame();
    this.getGameId();

    console.log("id", this.currentGameId);
  }


  subGame() {
    if(this.firestore){
      this.unsubGames = onSnapshot(this.getSingleRef("games", this.currentGameId), (doc:any) => {
      this.game.currentPlayer = doc.data().currentPlayer; 
      this.game.cardsOutOfGame = doc.data().playedCards; 
      this.game.players = doc.data().players; 
      this.game.stack = doc.data().stack; 
      this.game.pickCardAnimation = doc.data().pickCardAnimation;
      this.game.currentCard = doc.data().currentCard;
      console.log(doc.data());
    });
  }
  }


  getGameId() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.currentGameId = params['id'];
    }); 
  }


  async addGame() {
    let gameInfo = await addDoc(this.getGameRef(), this.game.toJSON()).catch(((err) => {
      console.error(err);
    })).then((docRef) => {
      console.log('document written with ID:');
    })
    console.log(gameInfo);
  }


  async updateGame() {
    if (this.game.gameId) {
      await updateDoc(this.getSingleRef('games', this.currentGameId), this.game.toJSON());
    }
  }


  getGameRef() {
    return collection(this.firestore, 'games');
  }


  getSingleRef(colId: string, docId: string) {
    let singleRef = collection(this.firestore, colId);
    return doc(singleRef, docId);
  }


  takeNewCard() {
    if (!this.game.pickCardAnimation) {
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
        this.updateGame();
      }
    });
  }
}

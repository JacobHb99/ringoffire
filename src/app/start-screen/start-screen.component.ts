import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, addDoc, updateDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Game } from "./../../models/game";


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);




  constructor(private router: Router) {

  }


  ngOnInit(): void {

  }

  newGame() {
    //Start Game
    let game = new Game();
    const colRef = collection(this.firestore, 'games');
    addDoc(colRef, game.toJSON()).then((gameData: any) => {
      this.router.navigateByUrl('/game/' + gameData['id']);
  })
  }
}

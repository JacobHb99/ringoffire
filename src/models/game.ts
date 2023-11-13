export class Game {
    [x: string]: any;
    public players: string[] = [];
    public stack: string[] = [];
    public cardsOutOfGame: string[] = [];
    public currentPlayer: number = 0;
    public currentCard: string;
    public gameId: string;
    public pickCardAnimation: boolean = false;;


    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);


    }
    public toJSON() {
        return {
            players:  this.players,
            stack: this.stack,
            cardsOutOfGame: this.cardsOutOfGame,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            pickCardAnimation: this.pickCardAnimation,
            gameId: this.gameId
        };
    }
}





function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
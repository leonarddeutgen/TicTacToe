import { Player } from "./Player";

export interface TicTacState {
  playerList: Player[];
  gameBoardList: string[];
  playerxTurn: boolean;

  gameIsRunning: boolean;
  someoneWon: boolean;
  isDraw: boolean;
}

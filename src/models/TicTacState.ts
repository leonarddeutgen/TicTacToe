import { Player } from "./Player";

export interface TicTacState {
  playerList: Player[];
  gameBoardList: string[];
  playerxTurn: boolean;
  playerSymbol: string;
  gameIsRunning: boolean;
  someoneWon: boolean;
  isDraw: boolean;
}

import { Player } from "./Player";

export interface TicTacState {
  playerList: Player[];
  playerxTurn: boolean;
  turnOffGame: boolean;
}

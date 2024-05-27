import { Player } from "../../types/types";
import "./Board.scss";
import Cell from "./Cell";

type BoardProps = {
  playerState: Player[];
};

export default function Board(props: Readonly<BoardProps>) {
  return (
    <div className="board">
      {[...Array.from({ length: 10 }).keys()].map((row) => (
        <div className="board__row" key={row}>
          {[...Array.from({ length: 10 }).keys()].map((col) => (
            <Cell
              key={col}
              value={row * 10 + col + 1}
              players={props.playerState}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

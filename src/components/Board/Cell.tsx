import { useMemo } from "react";
import { Player } from "../../types/types";
import PlayerChip from "./PlayerChip";

type CellProps = {
  value: number;
  players: Player[];
};

export default function Cell(props: Readonly<CellProps>) {
  const playersHere = useMemo(
    () => props.players.filter((player) => player.position === props.value),
    [props.players, props.value]
  );

  if (playersHere.length > 0) console.log(playersHere);

  return (
    <div className="board__cell" id={`cell-${props.value}`}>
      <div className="player-chips">
        {playersHere.map((p) => (
          <PlayerChip color={p.color} key={p.name} />
        ))}
      </div>
      <span className="cell-number">{props.value}</span>
    </div>
  );
}

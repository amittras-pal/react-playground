import { useState } from "react";
import "./App.scss";
import Board from "./components/Board/Board";
import DiceRoller from "./components/Dice/DiceRoller";
import { Player } from "./types/types";

function App() {
  const [playerState, setPlayerState] = useState<Player[]>([
    {
      name: "Player 1",
      position: 1,
      color: "red",
      active: true,
    },
    {
      name: "Player 2",
      position: 1,
      color: "blue",
      active: false,
    },
    {
      name: "Player 3",
      position: 1,
      color: "yellow",
      active: false,
    },
    {
      name: "Player 4",
      position: 1,
      color: "green",
      active: false,
    },
  ]);

  const handleRoll = (value: number, player: Player) => {
    setPlayerState((c) => {
      const currentPlayer = playerState.findIndex(
        (p) => p.name === player.name
      );

      const nextPlayer =
        currentPlayer === playerState.length - 1 ? 0 : currentPlayer + 1;

      const update = [...c];
      update[currentPlayer].position += value;

      if (value !== 6) {
        update[currentPlayer].active = false;
        update[nextPlayer].active = true;
      }
      return update;
    });
  };

  return (
    <div className="layout">
      <div className="player-col">
        <DiceRoller
          active={playerState[0].active}
          onRoll={handleRoll}
          player={playerState[0]}
        />
        <DiceRoller
          active={playerState[1].active}
          onRoll={handleRoll}
          player={playerState[1]}
        />
      </div>
      <Board playerState={playerState} />
      <div className="player-col">
        <DiceRoller
          active={playerState[2].active}
          onRoll={handleRoll}
          player={playerState[2]}
        />
        <DiceRoller
          active={playerState[3].active}
          onRoll={handleRoll}
          player={playerState[3]}
        />
      </div>
    </div>
  );
}

export default App;

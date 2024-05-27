import { MouseEventHandler, useRef, useState } from "react";
import { Player } from "../../types/types";
import { getRandomNumber } from "../../utils/utils";
import PlayerChip from "../Board/PlayerChip";
import Dice from "./Dice";
import "./Dice.scss";

type DiceRollerProps = {
  onRoll: (value: number, player: Player) => void;
  active: boolean;
  player: Player;
};

export default function DiceRoller(props: Readonly<DiceRollerProps>) {
  const [value, setValue] = useState<number>(0);
  const [rolling, setRolling] = useState(false);
  const final = useRef<HTMLInputElement>(null);

  const rollDice: MouseEventHandler<HTMLButtonElement> = () => {
    setRolling(true);
    const interval = setInterval(() => setValue(getRandomNumber()), 150);
    setTimeout(() => {
      clearInterval(interval);
      props.onRoll(parseInt(final.current?.value ?? "0"), props.player);
      setRolling(false);
      setTimeout(() => setValue(0), 2000);
    }, 2050);
  };

  return (
    <div className={`dice-roller ${props.active ? "active" : "inactive"}`}>
      <input type="hidden" value={value} ref={final} disabled />
      <p className="mb-0 small fst-italic text-center">{props.player.name}</p>
      <PlayerChip color={props.player.color} />
      <Dice value={value} />
      <button
        className="btn btn-sm btn-dark w-100"
        onClick={rollDice}
        disabled={!props.active || rolling}
      >
        {rolling ? "Rolling" : "Roll"}
      </button>
    </div>
  );
}

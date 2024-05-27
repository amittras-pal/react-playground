import dice0 from "../../assets/dice-0.svg";
import dice1 from "../../assets/dice-1.svg";
import dice2 from "../../assets/dice-2.svg";
import dice3 from "../../assets/dice-3.svg";
import dice4 from "../../assets/dice-4.svg";
import dice5 from "../../assets/dice-5.svg";
import dice6 from "../../assets/dice-6.svg";

const DICES: Record<number, string> = {
  0: dice0,
  1: dice1,
  2: dice2,
  3: dice3,
  4: dice4,
  5: dice5,
  6: dice6,
};
type DiceProps = { value: number };

export default function Dice(props: Readonly<DiceProps>) {
  return (
    <img
      className="dice shadow-sm"
      src={DICES[props.value]}
      alt={`dice-value-${props.value}`}
      height={64}
      width={64}
    />
  );
}

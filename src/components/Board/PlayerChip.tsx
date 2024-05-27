type PlayerChipProps = {
  color: "red" | "blue" | "yellow" | "green";
};

export default function PlayerChip(props: Readonly<PlayerChipProps>) {
  return <div className={`player-chip ${props.color}`}></div>;
}

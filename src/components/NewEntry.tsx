import { KeyboardEventHandler, useContext } from "react";
import { DirectoryCTX } from "../context/DirHandlers";

type NewEntryProps = {
  label: "file" | "folder";
  onBlur: (e?: null) => void;
  id?: string;
};

export default function NewEntry(props: Readonly<NewEntryProps>) {
  const { addItem } = useContext(DirectoryCTX);

  const handleInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") props.onBlur(null);
    if (
      e.key === "Enter" &&
      (e.target as HTMLInputElement).value.length > 0 &&
      props.label !== null
    ) {
      const entry = {
        name: (e.target as HTMLInputElement).value,
        type: props.label,
      };
      addItem(entry, props.id);
      props.onBlur();
    }
  };
  return (
    <div className="input-wrapper">
      <input
        type="text"
        autoFocus
        onKeyDown={handleInput}
        onBlur={() => props.onBlur(null)}
        placeholder={`Enter ${props.label} name...`}
      />
    </div>
  );
}

import { createContext } from "react";
import { Entry } from "../types/types";

export const DirectoryCTX = createContext<{
  addItem: (e: Entry, subOf?: string) => void;
  removeItem: (e: string) => void;
}>({
  addItem: () => null,
  removeItem: () => null,
});

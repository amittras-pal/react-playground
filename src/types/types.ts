export type DirElement = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: DirElement[];
};

export type Entry = {
  type: "file" | "folder";
  name: string;
};

export type Form = "file" | "folder" | null;

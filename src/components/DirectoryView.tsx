import { IconFilePlus, IconFolderPlus } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";
import { DirectoryCTX } from "../context/DirHandlers";
import { DirElement, Entry, Form } from "../types/types";
import { addElement, removeElement } from "../utils/utils";
import DirectoryNode from "./DirectoryNode";
import NewEntry from "./NewEntry";

export default function Directory() {
  const [dir, setDir] = useState<DirElement[]>([]);
  const [showForm, setShowForm] = useState<Form>(null);

  const handleAdd = useCallback((e: Entry, childof?: string) => {
    const element: DirElement = {
      id: v4().split("-")[0],
      name: e.name,
      type: e.type,
    };
    if (e.type === "folder") element.children = [];
    setDir((current) => addElement(current, element, childof));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setDir((current) => removeElement(current, id));
  }, []);

  const handlers = useMemo(
    () => ({ addItem: handleAdd, removeItem: handleRemove }),
    [handleAdd, handleRemove]
  );

  return (
    <DirectoryCTX.Provider value={handlers}>
      <div className="directory root">
        <div className="root-actions">
          <span>Root</span>
          <button className="action" onClick={() => setShowForm("folder")}>
            <IconFolderPlus size={14} />
          </button>
          <button className="action" onClick={() => setShowForm("file")}>
            <IconFilePlus size={14} />
          </button>
        </div>
        {showForm && (
          <NewEntry label={showForm} onBlur={() => setShowForm(null)} />
        )}
        {dir.map((root) => (
          <DirectoryNode data={root} key={root.id} />
        ))}
      </div>
    </DirectoryCTX.Provider>
  );
}

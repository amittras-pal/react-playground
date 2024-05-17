import {
  IconFile,
  IconFilePlus,
  IconFolder,
  IconFolderOpen,
  IconFolderPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { DirectoryCTX } from "../context/DirHandlers";
import { DirElement, Form } from "../types/types";
import NewEntry from "./NewEntry";

export default function DirectoryNode({
  data,
}: Readonly<{ data: DirElement }>) {
  const [showSubDir, setShowSubDir] = useState(false);
  const [showForm, setShowForm] = useState<Form>(null);
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(false), 750);
    return () => clearTimeout(timer);
  });

  const actionsBlock = useRef<HTMLDivElement>(null);

  const { removeItem } = useContext(DirectoryCTX);

  const openForm = (e: "file" | "folder") => {
    setShowSubDir(true);
    setShowForm(e);
  };

  return (
    <div className={`directory-node ${data.type} ${mounted ? "flash" : ""}`}>
      {/* Body */}
      <div
        className="directory-node__body"
        onMouseLeave={() => {
          if (actionsBlock.current) actionsBlock.current.style.display = "none";
        }}
        onMouseEnter={() => {
          if (actionsBlock.current) actionsBlock.current.style.display = "flex";
        }}
      >
        <button
          className="dir-toggle"
          disabled={data.type === "file"}
          onClick={() => setShowSubDir((v) => !v)}
        >
          {data.type === "folder" ? (
            <>
              {showSubDir ? (
                <IconFolderOpen size={14} />
              ) : (
                <IconFolder size={14} />
              )}
            </>
          ) : (
            <IconFile size={14} />
          )}
        </button>
        <span>{data.name}</span>
        <div className="actions" ref={actionsBlock}>
          {data.type === "folder" && (
            <button className="action" onClick={() => openForm("folder")}>
              <IconFolderPlus size={14} />
            </button>
          )}
          {data.type === "folder" && (
            <button className="action" onClick={() => openForm("file")}>
              <IconFilePlus size={14} />
            </button>
          )}
          <button className="action danger" onClick={() => removeItem(data.id)}>
            <IconTrash size={14} />
          </button>
        </div>
      </div>

      {/* New Entry Input */}
      {showForm && (
        <NewEntry
          label={showForm}
          onBlur={() => setShowForm(null)}
          id={data.id}
        />
      )}

      {/* Children */}
      {data.type === "folder" && (data.children?.length ?? 0) > 0 && (
        <div
          className="directory-node__children"
          style={{ display: showSubDir ? "block" : "none" }}
        >
          {data.children?.map((subDir) => (
            <DirectoryNode data={subDir} key={subDir.id} />
          ))}
        </div>
      )}
    </div>
  );
}

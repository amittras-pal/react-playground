import { useRef } from "react";
import "./App.css";

function App() {
  const overlay = useRef<HTMLDivElement>(null);
  const app1 = useRef<HTMLDivElement>(null);
  const app2 = useRef<HTMLDivElement>(null);
  const dragger = useRef<HTMLDivElement>(null);

  const handleMove: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (dragger.current) dragger.current.style.left = `${e.clientX}px`;
    if (app1.current) app1.current.style.width = `${e.clientX}px`;
    if (app2.current)
      app2.current.style.width = `${
        (document.scrollingElement?.clientWidth ?? 0) - e.clientX
      }px`;
  };

  return (
    <>
      <div className="block" style={{ width: "50%" }} ref={app1}>
        <iframe src="https://thepilfereddiaries.in" title="App 1" />
      </div>
      <div
        draggable="true"
        className="resizer"
        style={{ left: "50%" }}
        ref={dragger}
        onDrag={handleMove}
        onDragStart={() => {
          if (overlay.current) overlay.current.style.display = "block";
        }}
        onDragEnd={(e) => {
          handleMove(e);
          if (overlay.current) overlay.current.style.display = "none";
        }}
      />
      <div className="block" style={{ width: "50%" }} ref={app2}>
        <iframe src="https://expensary.web.app" title="App 2" />
      </div>
      <div className="drag-layer" style={{ display: "none" }} ref={overlay} />
    </>
  );
}

export default App;

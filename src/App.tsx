import React, { useRef } from "react";
import { useAppVisible } from "./utils";

const colorMapping = {
  "knowledge-garden": "blue",
  ":else": "#555",
};

function App() {
  const innerRef = useRef<HTMLDivElement>(null);
  const visible = useAppVisible();

  React.useEffect(() => {
    logseq.App.getCurrentGraph().then((graph) => {
      const colorKey =
        Object.keys(colorMapping).find((key) => {
          return graph?.path.endsWith(key);
        }) ?? ":else";

      const color = Reflect.get(colorMapping, colorKey);

      console.log(graph?.name);

      logseq.provideUI({
        path: "#head.cp__header > .l.flex",
        key: "peacock",
        template: `<span style="font-size: 14px; color: ${color}; vertical-align: middle; top: -2px; position: relative;">
        ${graph?.name}
        <span>`,
      });
    });
  });

  if (visible) {
    return (
      <main
        className="backdrop-filter backdrop-blur-md fixed inset-0 flex items-center justify-center"
        onClick={(e) => {
          if (!innerRef.current?.contains(e.target as any)) {
            window.logseq.hideMainUI();
          }
        }}
      >
        <div ref={innerRef} className="text-size-2em">
          Welcome to [[Logseq]] Plugins!
        </div>
      </main>
    );
  }
  return null;
}

export default App;

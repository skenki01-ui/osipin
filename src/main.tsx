import React from "react";
import ReactDOM from "react-dom/client";

function Test() {
  return <div>表示テストOK</div>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);
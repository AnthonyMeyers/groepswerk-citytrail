import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Provider from "./Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <App />
  </Provider>
);

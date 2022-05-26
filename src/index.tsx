import ReactDOM from "react-dom/client";

import App from "./App";
import AppProviders from "./contexts/AppProviders";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AppProviders>
    <App />
  </AppProviders>
);

reportWebVitals((args) => {
  if (process.env.NODE_ENV === "development") {
    return console.log(args);
  }
});

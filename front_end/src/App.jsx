import "./style/App.scss";
import AppHeader from "./modules/standard_modules/App-header";
import AppFooter from "./modules/standard_modules/App-footer";
import Routing from "./modules/router";

export default function App() {
  return (
    <>
      <AppHeader></AppHeader>
      <main className="container">
        <Routing></Routing>
      </main>

      <AppFooter></AppFooter>
    </>
  );
}

import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ComicsStore from "../pages/ComicsPage";
import Page404 from "../pages/404";
import SingleComics from "../pages/Single-Comic";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>

            <Route exact path="/comics">
              <ComicsStore />
            </Route>
            
            <Route exact path="/comics/:comicId">
              <SingleComics/>
            </Route>
            <Route path="*">
              <Page404/>
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

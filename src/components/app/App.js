import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import MainPage from "../pages/MainPage";
import ComicsStore from "../pages/ComicsPage";
// import Page404 from "../pages/404";
import { lazy } from "react";
import { Suspense } from "react";
import Spinner from "../spinner/Spinner";
import SinglePage from './../pages/Single-Page';
import SingleComicPage from "../pages/SingleComicsPage/SingleComicPage";
import SingleCharPage from "../pages/SingleCharPage/SingleCharPage";


const MainPage = lazy(() => import("../pages/MainPage"));
const Page404 = lazy(() => import("../pages/404"))


const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner/>}>
            <Switch>
              <Route path="/" exact>
                <MainPage />
              </Route>

              <Route exact path="/comics">
                <ComicsStore />
              </Route>

              <Route exact path="/comics/:id">
                <SinglePage Component = {SingleComicPage} type="comic"/>
              </Route>
              <Route exact path="/characters/:id">
                <SinglePage Component = {SingleCharPage} type="character"/>
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Import scss
import './assets/scss/style.scss';

// Import Reducers
import reducers from './redux/reducers';

// Import views
import Landing from './views/LandingPage';
import ProfilePage from './views/ProfilePage';
import BookmarkPage from './views/BookmarkPage';
import ReadingStatsPage from './views/ReadingStatsPage';
import HistoryPage from './views/HistoryPage';
import SettingsPage from './views/SettingsPage';
import PageNotFound from './views/PageNotFound';
import CreateArticle from './views/CreateArticle';
import ResetPassword from './views/ResetPasswordPage';
import ArticleDetailsPage from './views/ArticleDetailPage';
import EditArticle from './views/EditArticlePage';

// Create Store
const store = createStore(reducers, applyMiddleware(ReduxPromise));

/**
 * @description App function
 * @returns {JSX} react router
 */
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/profile/:username?" component={ProfilePage} />
        <Route exact path="/" component={({ history }) => <Landing history={history} />} />
        <Route exact path="/create-article" component={CreateArticle} />
        <Route exact path="/edit-article" component={EditArticle} />
        <Route exact path="/bookmarks" component={BookmarkPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route exact path="/reading-stats" component={ReadingStatsPage} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/article/:articleSlug" component={ArticleDetailsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
    <ToastContainer
      pauseOnFocusLoss={false}
      transition={Bounce}
      className="toast-container"
      toastClassName="default-toast"
      autoClose={4000}
      position="top-right"
    />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

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
        <Route exact path="/bookmarks" component={BookmarkPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route exact path="/reading-stats" component={ReadingStatsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;

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
import LandingPage from './views/LandingPage';
import ProfilePage from './views/ProfilePage';
import defaultComponent from './components/Welcome';

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
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route component={defaultComponent} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;

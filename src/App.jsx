import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

// import Reducers
import reducers from './redux/reducers';

// Import views
import LandingPage from './views/LandingPage.jsx';
import ProfilePage from './views/ProfilePage.jsx';

// Create Store
const store = createStore(reducers, applyMiddleware(ReduxPromise));

const App = () => {
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path ="/" component={LandingPage}/>
          <Route exact path ="/profile" component={ProfilePage}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));

export default App; 

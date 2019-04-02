import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

//Views
import LandingPage from './views/LandingPage.jsx';
import ProfilePage from './views/ProfilePage.jsx';

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path ="/" component={LandingPage}/>
        <Route exact path ="/profile" component={ProfilePage}/>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));

export default App; 

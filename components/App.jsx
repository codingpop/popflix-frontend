import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from '../store';

const Home = () => (<h1>Welcome to my boilerplate</h1>);

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </Router>
  </Provider>
);

export default App;

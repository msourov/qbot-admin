
import React from 'react';
import { Router,Switch ,Route, Redirect} from 'react-router-dom';

import './App.css';

import history from './history';
import login from './root/login';
import NetworkError from './root/NetworkError';
import notFound from './root/notFound';
import PageLayout from './root/PageLayout';
import UserDashboard from './root/userdashboard';
import WrongPage from './root/wrongPage';



function App() {
  
  return (
    <Router history={history} >
       <Switch>
        {/* <Route path="/login" component={login} />
        <Route path="/counter" component={Counter} />
        
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/counter-details" component={CounterDetails} />
        <Route path="/token-print" component={Tokenprint} /> */}
        <Route path="/login" component={login} />
        <Route path="/" component={PageLayout} />
        
        
        {/* <Route path="/opps" component={notFound} /> */}

        {/* <Redirect to="/opps" /> */}
       </Switch>
      </Router>
  );
}

export default App;

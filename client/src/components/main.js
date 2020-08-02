import React from 'react';
import { Switch, Route } from 'react-router-dom'
import SignUpPage from './sign-up-page';
import StatisticsPage from './statistics-page';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={SignUpPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/statistics' component={StatisticsPage}/>
      </Switch>
    </main>
  );
}

export default Main;

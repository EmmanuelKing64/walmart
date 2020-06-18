import React from 'react';
import RecipeReviewCard from './component/CardView'
import Defined from './component/defined'
import Parent from './component/parent'
import {BrowserRouter as Router,Switch,Route}from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={RecipeReviewCard}/>
      <Route path="/detailedView" component={Defined}/>
      <Route path="/parent"  component={Parent} />
      {/* <Parent /> */}
      </Switch>
    </div>
    </Router>
  );
}


export default App;

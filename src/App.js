import React, { useReducer } from "react";
import RecipeReviewCard from "./component/CardView";
import Defined from "./component/defined";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContext, reducer } from "./store";

function App() {
  console.log('app')
  const [value, dispatch] = useReducer(reducer);
  return (
    <AppContext.Provider value={{ value, dispatch }}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={RecipeReviewCard} />
            <Route path="/detailedView/:id" component={Defined} />
            {/* <Parent /> */}
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;

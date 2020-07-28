import React, { useReducer } from "react";
import RecipeReviewCard from "./component/CardView";
import Defined from "./component/defined";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContext, initialState } from "./store";
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ACTION":
      console.log("action is called");
      return { ...state, keyProducts: payload };
    case "SET_PRODUCTS":
      return { ...state, entities: payload};
    default:
      console.log("Unknown action");
  }
};
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

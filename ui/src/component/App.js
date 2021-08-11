import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"

import UIStudent from "./student/UIStudent"
import './App.css';

const App = () => (
  <div>
    <Router>
      <div id="header">
        <nav>
          <ul>
            <Link to="/">
              <p><span className="nav-btn">Home</span></p>
            </Link>
          </ul>
        </nav>
      </div>
      <div>
        <Switch>
          <Route path="/">
            <UIStudent />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
)

export default App;

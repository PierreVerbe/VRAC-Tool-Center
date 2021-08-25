import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"

import UIStudent from "./student/UIStudent"
import Home from "./home/Home"
import './App.css'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
  <div>


    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Photos
        </Typography>
      </Toolbar>
    </AppBar>



    <Router>
      <div id="header">
        <nav>
          <ul>
            <Link to="/">
              <p><span className="nav-btn">Home</span></p>
            </Link>
            <Link to="/strategy">
              <p><span className="nav-btn">Strategy</span></p>
            </Link>
            <Link to="/monitoring">
              <p><span className="nav-btn">Monitoring</span></p>
            </Link>
          </ul>
        </nav>
      </div>
      <div>
        <Switch>
          <Route path="/strategy">
            <p>Strategy part</p>
            <UIStudent/>
          </Route>
          <Route path="/monitoring">
            <p>Monitoring part</p>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
  )
}

export default App

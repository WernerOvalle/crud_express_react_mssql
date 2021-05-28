import logo from "./logo192.png";
import "./App.css";
import Main from "./fiscalias";
import { AppBar,Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  bar: {
    
    backgroundColor: '#03a9f4',
  },
 
  menuButton: {
    
    margin: 'auto'
  }
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar className={classes.menuButton}>
         
            <img width="90" height="55" src={logo}></img>
         
        </Toolbar>
      </AppBar>
      <Main />
    </div>
  );
}

export default App;

import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

const MetaActionCreator = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const handleClickOpen = () => {
      console.log("hello")
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
           <Grid container spacing={3}>
          <Grid item xs={6}>
          
            <List className={classes.root} subheader={<li />}>
                
                <li key={`section`} className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader>{`Create Meta action`}</ListSubheader>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <ListItem button key={`item-${item}`} onClick={handleClickOpen}>
                        <ListItemText primary={`action ${item}`} />
                    </ListItem>
                    
                    ))}
                    <ListItem button key={`item`} onClick={() => console.log("Create new action")}>
                      <ListItemIcon>
                        <AddCircleIcon style={{ color: green[500] }}/>
                      </ListItemIcon>
                      <ListItemText primary={`Add new action`} />
                    </ListItem>
                </ul>
            </li>
        
    

            </List>
        </Grid>


        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dialog create action</DialogTitle>
        <DialogContent>
        <DialogContentText>
           Please select an action type and fill out the form.
          </DialogContentText>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Action Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Homing</MenuItem>
          <MenuItem value={20}>Line</MenuItem>
          <MenuItem value={30}>Top arm get storage</MenuItem>
          <MenuItem value={40}>XYT</MenuItem>
          <MenuItem value={50}>End</MenuItem>
        </Select>
      </FormControl>
         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>









        <Grid item xs={6}>
        <List className={classes.root} subheader={<li />}>
                
                <li key={`section`} className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader>{`Create Meta action`}</ListSubheader>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <ListItem button key={`item-${item}`}>
                        <ListItemText primary={`action ${item}`} />
                    </ListItem>
                    
                    ))}
                    <ListItem button key={`item`} onClick={() => console.log("hello")}>
                      <ListItemIcon>
                        <AddCircleIcon style={{ color: green[500] }}/>
                      </ListItemIcon>
                      <ListItemText primary={`Add new meta action`} />
                    </ListItem>
                </ul>
            </li>
        
    

            </List>

        

        </Grid>
        </Grid>


        </div>
    )
}

export default MetaActionCreator

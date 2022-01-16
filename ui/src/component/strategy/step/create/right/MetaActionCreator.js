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
import {FactoryAction} from './../../../../general/action/FactoryAction'


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
    const [metaAction, setMetaAction] = React.useState([]);

    const addNewMetaAction = (metaActionToAdd) => {
      const newMetaAction = {
        name : metaActionToAdd,
        actions : [],
        isSelected : false,
      }
      const metaActionUpdated = metaAction.concat([newMetaAction])
      setMetaAction(metaActionUpdated)
    }

    const selectMetaAction = (metaActionName) => {
      setOpen(true)

      
      const selectedMetaAction = metaAction.filter((item) => item.isSelected === true)

      
      if (selectedMetaAction.length === 0 || selectedMetaAction[0].name === metaActionName) {
        const updatedData = metaAction.map(x => (x.name === metaActionName ? { ...x, isSelected: ! x.isSelected } : x));
        setMetaAction(updatedData)
      }
      
    }

    const addNewActionToMetaAction = () => {
      const selectedMetaAction = metaAction.filter((item) => item.isSelected === true)

      if (selectedMetaAction.length !== 0) {
        const updatedData = metaAction.map(x => (x.name === selectedMetaAction[0].name ? { ...x, actions: x.actions.concat(["t"]) } : x));
        setMetaAction(updatedData)
      }

      console.log("Create new action")
    }

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const handleClickOpen = () => {
      console.log("hello")
      setOpen(true);
    };
  
    const handleClose = () => {
      const updatedMetaAction = metaAction.map(metaAction =>  ({...metaAction, isSelected: false}))

      setMetaAction(updatedMetaAction)
      setOpen(false);
    };

    const selectedMetaAction = metaAction.filter((item) => item.isSelected === true)

    return (
        <div>
          {/*
          <Grid container spacing={3}>
            <Grid item xs={6}>

              {isSelectedMetaAction.length === 0 ? (
                <span>Please create or select meta action</span>
              ) : (
                <List className={classes.root} subheader={<li />}>
                
              <li key={`section`} className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader>{`Meta action : ` + isSelectedMetaAction[0].name}</ListSubheader>
                    {isSelectedMetaAction[0].actions.map((item) => (
                    <ListItem button key={`item-${item}`} onClick={handleClickOpen}>
                        <ListItemText primary={`action ${item}`} />
                    </ListItem>
                    
                    ))}
                    <ListItem button key={`item`} onClick={() => addNewActionToMetaAction()}>
                      <ListItemIcon>
                        <AddCircleIcon style={{ color: green[500] }}/>
                      </ListItemIcon>
                      <ListItemText primary={`Add new action`} />
                    </ListItem>
                </ul>
              </li>
            </List>
                
              )}
          
            
            

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
                    */}
        <List className={classes.root} subheader={<li />}>
                
                <li key={`section`} className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader>{`Create Meta action`}</ListSubheader>
                    {metaAction.map((item) => (
                    <ListItem button key={`item-${item.name}`} onClick={() => selectMetaAction(item.name)}>
                        <ListItemText primary={`action ${item.name}`} />
                    </ListItem>
                    
                    ))}
                    <ListItem button key={`item`} onClick={() => addNewMetaAction("New meta Action " + metaAction.length)}>
                      <ListItemIcon>
                        <AddCircleIcon style={{ color: green[500] }}/>
                      </ListItemIcon>
                      <ListItemText primary={`Add new meta action`} />
                    </ListItem>
                </ul>
            </li>
        
    

            </List>



        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dialog edit meta action</DialogTitle>
        <DialogContent>
        <DialogContentText>
          Please fill in the form and the graph.
        </DialogContentText>

        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            defaultValue={selectedMetaAction.length === 0 ? "Undefined" : selectedMetaAction[0].name}
            fullWidth
          />
        
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Action Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={"Homing"}>Homing</MenuItem>
          <MenuItem value={"Line"}>Line</MenuItem>
          <MenuItem value={"Top arm get storage"}>Top arm get storage</MenuItem>
          <MenuItem value={"XYT"}>XYT</MenuItem>
          <MenuItem value={"End"}>End</MenuItem>
        </Select>

        {console.log(age)}

        <FactoryAction component={age} />

      </FormControl>
         
       
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

        

        {/*

        </Grid>
        </Grid>

        */}


        </div>
    )
}

export default MetaActionCreator

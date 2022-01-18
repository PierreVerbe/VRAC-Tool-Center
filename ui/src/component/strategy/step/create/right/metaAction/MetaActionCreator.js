import React from "react"
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green } from '@material-ui/core/colors';

import MetaActionDialog from "./MetaActionDialog";

import { setMetaActionArrayActionCreator, setOpenDialogMetaActionActionCreator } from "../../../../../../action/strategyAction"

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
  },
  actionFactoryPaper: {
    display: 'flex',
    '& > *': {

      padding: theme.spacing(3),


    },
  }
}));

const MetaActionCreator = ({ metaActionArray, openDialogMetaAction, setMetaActionArray, setOpenDialogMetaAction }) => {
  const classes = useStyles();



  const addNewMetaAction = (metaActionToAdd) => {
    const newMetaAction = {
      name: metaActionToAdd,
      actions: [],
      isSelected: false,
    }
    const metaActionUpdated = metaActionArray.concat([newMetaAction])
    setMetaActionArray(metaActionUpdated)
  }

  const selectMetaAction = (metaActionName) => {
    setOpenDialogMetaAction(true)

    console.log(openDialogMetaAction)


    const selectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)


    if (selectedMetaAction.length === 0 || selectedMetaAction[0].name === metaActionName) {
      const updatedData = metaActionArray.map(x => (x.name === metaActionName ? { ...x, isSelected: !x.isSelected } : x));
      setMetaActionArray(updatedData)
    }

  }

  const addNewActionToMetaAction = () => {
    const selectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)

    if (selectedMetaAction.length !== 0) {
      const updatedData = metaActionArray.map(x => (x.name === selectedMetaAction[0].name ? { ...x, actions: x.actions.concat(["t"]) } : x));
      setMetaActionArray(updatedData)
    }

    console.log("Create new action")
  }



  const handleClickOpen = () => {
    console.log("hello")
    setOpenDialogMetaAction(true);
  };



  return (
    <div>

      <List className={classes.root} subheader={<li />}>

        <li key={`section`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`Meta Action List`}</ListSubheader>
            {metaActionArray.map((metaAction) => (
              <ListItem button key={`item-${metaAction.name}`} onClick={() => selectMetaAction(metaAction.name)}>
                <ListItemText primary={metaAction.name} />
              </ListItem>
            ))}
            <ListItem button key={`item-button`} onClick={() => addNewMetaAction("New meta Action " + metaActionArray.length)}>
              <ListItemIcon>
                <AddCircleIcon style={{ color: green[500] }} />
              </ListItemIcon>
              <ListItemText primary={`Add new meta action`} />
            </ListItem>
          </ul>
        </li>

      </List>

      <MetaActionDialog open={openDialogMetaAction} />
    </div>
  )
}

const mapStateToProps = state => ({
  metaActionArray: state.metaActionArray,
  openDialogMetaAction: state.openDialogMetaAction
})

const mapDispatchToProps = dispatch => ({
  setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray)),
  setOpenDialogMetaAction: openDialogMetaAction => dispatch(setOpenDialogMetaActionActionCreator(openDialogMetaAction))
})

export default connect(mapStateToProps, mapDispatchToProps)(MetaActionCreator)

import React, { useEffect } from "react"
import { connect } from "react-redux"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import ListItemIcon from "@material-ui/core/ListItemIcon"

import AddCircleIcon from "@material-ui/icons/AddCircle"
import { green } from "@material-ui/core/colors"

import MetaActionDialog from "./MetaActionDialog"

import { setMetaActionArrayActionCreator, setOpenDialogMetaActionActionCreator } from "../../../../../../action/strategyAction"
import { useStyles } from "./../../../../../Style"

let idMetaAction = 0
const getIdMetaAction = () => `MetaAction_${idMetaAction++}`

const MetaActionCreator = ({ metaActionArray, openDialogMetaAction, setMetaActionArray, setOpenDialogMetaAction }) => {
  const classes = useStyles()

  useEffect(() => {
    const startMetaAction = metaActionArray[metaActionArray.length - 1] // Get last metaAction

    idMetaAction = startMetaAction === undefined ? 0 : parseInt(startMetaAction.id.split("_")[1]) + 1
    // eslint-disable-next-line
  }, [])

  const addNewMetaAction = (event) => {
    const metaActionId = getIdMetaAction()
    const newMetaAction = {
      id: metaActionId,
      name: "New meta Action " + metaActionId,
      flow: [],
      reactFlowInstance: null,
      isSelected: false,
    }
    const updatedMetaActionArray = metaActionArray.concat([newMetaAction])
    setMetaActionArray(updatedMetaActionArray)

    //event.preventDefault()
  }

  const selectMetaAction = (event, metaActionName) => {
    setOpenDialogMetaAction(true)
    const selectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)

    if (selectedMetaAction.length === 0 || selectedMetaAction[0].name === metaActionName) {
      const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === metaActionName ? { ...metaAction, isSelected: !metaAction.isSelected } : metaAction))
      setMetaActionArray(updatedMetaActionArray)
    }

    //event.preventDefault()
  }

  return (
    <div>
      <List className={classes.metaActionCreatorList} subheader={<li />}>
        <li key={`section`} className={classes.metaActionCreatorLi}>
          <ul className={classes.metaActionCreatorUl}>
            <ListSubheader>{`Meta Action List`}</ListSubheader>
            {metaActionArray.map((metaAction) => (
              <ListItem button key={`item-${metaAction.name}`} onClick={(event) => selectMetaAction(event, metaAction.name)}>
                <ListItemText primary={metaAction.name} />
              </ListItem>
            ))}
            <ListItem button key={`item-button`} onClick={(event) => addNewMetaAction(event)}>
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

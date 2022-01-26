import React, {useEffect} from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import List from "@material-ui/core/List"

import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import LinearScaleIcon from '@material-ui/icons/LinearScale'
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const HomingAction = ({action, metaActionArray, setMetaActionArray}) => {
    const ACTION = "Homing"
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = {type: action.actionData.type, Forward: false, Axis: false, New_value: 0}

    useEffect(() => {
        if (action.actionData.type !== ACTION) {
            const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
                { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: defaultActionData } : nodeOrEdge) } :
                 metaAction))
            setMetaActionArray(updatedMetaActionArray)
        }
        // eslint-disable-next-line
    }, [])

    const handleChangeSwitch = (event) => {
        const updatedActionData = {...action.actionData, [event.target.name]: event.target.checked}
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
             metaAction))
        setMetaActionArray(updatedMetaActionArray)
      }

    const handleChangeNumber = (event) => {
        const updatedActionData = {...action.actionData, New_value: event.target.valueAsNumber}
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
             metaAction))

        setMetaActionArray(updatedMetaActionArray)
    }

    const truc = (event, id) => {
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === id ? { ...nodeOrEdge, label: event.target.value } : nodeOrEdge) } :
             metaAction))

        setMetaActionArray(updatedMetaActionArray)        
    }

    const listEdgesToDelete = () => {
        const metaActionActionSelected = getSelectedMetaAction.flow.filter(element => element.isSelected === true).at(-1)

        const edges = getSelectedMetaAction.flow.filter(element => element.id.startsWith("Edge") && element.source === action.id )
        const filteredEdges = edges.filter(element => metaActionActionSelected.id === element.source || metaActionActionSelected.id === element.target)

        return (filteredEdges.length === 0 ? 
            <Typography>There are no edges</Typography> :
            filteredEdges.map((value) => (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LinearScaleIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={value.id}
                    secondary={`ActionName: ${getSelectedMetaAction.flow.filter(element => element.id === value.target)[0].data.label}`}
                />
                <TextField id="standard-basic" label="Type transition" defaultValue={value.label} onChange={(event) => truc(event, value.id)}/>
            </ListItem>)
        )
        )
    }

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                control={<Switch checked={action.actionData.Forward} onChange={handleChangeSwitch} color="primary" name="Forward" />}
                label="Enable forward"
                />
                <FormControlLabel
                control={<Switch checked={action.actionData.Axis} onChange={handleChangeSwitch} color="primary" name="Axis" />}
                label="Enable axis"
                />

                <TextField id="standard-basic" label="New value" type="number" defaultValue={action.actionData.New_value} onChange={handleChangeNumber}/>

                <List dense={true}>
                    {listEdgesToDelete()}
                </List>
            </FormGroup>
        </div>
    )
}

HomingAction.propTypes = {
    action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomingAction)

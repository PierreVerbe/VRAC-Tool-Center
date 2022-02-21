import React, {useEffect} from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const XYTAction = ({action, metaActionArray, setMetaActionArray}) => {
    const ACTION = "XYT"
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = {type: action.actionData.type, Forward: false, X: 0, Y: 0, T: 0}

    useEffect(() => {
        if (action.actionData.type !== ACTION) {
            const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
                { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: defaultActionData } : nodeOrEdge) } :
                 metaAction))
            setMetaActionArray(updatedMetaActionArray)
        }
        console.log("hiiii")
        // eslint-disable-next-line
    }, [])

    const handleChangeSwitch = (event) => {
        const updatedActionData = {...action.actionData, [event.target.name]: event.target.checked}
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
             metaAction))

             console.log(updatedActionData)

        setMetaActionArray(updatedMetaActionArray)
      }

      const handleChangeNumber = (event) => {
        const updatedActionData = {...action.actionData, [event.target.name]: event.target.valueAsNumber}
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
             metaAction))

        

        setMetaActionArray(updatedMetaActionArray)
    }

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                control={<Switch checked={action.actionData.Forward} onChange={handleChangeSwitch} color="primary" name="Forward" />}
                label="Enable forward"
                />

                <TextField id="standard-basic" label="X" type="number" defaultValue={action.actionData.X} onChange={handleChangeNumber} name="X"/>
                <TextField id="standard-basic" label="Y" type="number" defaultValue={action.actionData.Y} onChange={handleChangeNumber} name="Y"/>
                <TextField id="standard-basic" label="T" type="number" defaultValue={action.actionData.T} onChange={handleChangeNumber} name="T"/>
            </FormGroup> 
        </div>
    )
}

XYTAction.propTypes = {
    action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(XYTAction)

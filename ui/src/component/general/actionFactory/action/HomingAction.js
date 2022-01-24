import React, {useEffect} from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const HomingAction = ({action, metaActionArray, setMetaActionArray}) => {
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = {type: action.actionData.type, Forward: false, Axis: false, New_value: 0}

    useEffect(() => {
        if (action.actionData.type !== "Homing") {
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
            </FormGroup>

            <TextField id="standard-basic" label="New value" type="number" defaultValue={action.actionData.New_value} onChange={handleChangeNumber}/>

            <Typography >TODO transition</Typography >
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

import React, {useEffect} from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const LineAction = ({action, metaActionArray, setMetaActionArray}) => {
    const ACTION = "Line"
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = {type: action.actionData.type, Forward: false, Distance: 0, Speed: 0, Acceleration: 0}

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

                <TextField id="standard-basic" label="Distance" type="number" defaultValue={action.actionData.Distance} onChange={handleChangeNumber} name="Distance"/>
                <TextField id="standard-basic" label="Speed" type="number" defaultValue={action.actionData.Speed} onChange={handleChangeNumber} name="Speed"/>
                <TextField id="standard-basic" label="Acceleration" type="number" defaultValue={action.actionData.Acceleration} onChange={handleChangeNumber} name="Acceleration"/>
            </FormGroup> 
        </div>
    )
}

LineAction.propTypes = {
    action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(LineAction)

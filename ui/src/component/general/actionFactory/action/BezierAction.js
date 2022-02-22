import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const speedValues = ["FUCKING_SLOW", "VERY_SLOW", "SLOW", "NORMAL", "FAST",
    "VERY_FAST", "FASTER_THAN_RCVA", "I_AM_SPEED"]

const BezierAction = ({ action, metaActionArray, setMetaActionArray }) => {
    const ACTION = "Bezier"
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = { type: action.actionData.type, Chained: false, Radius: 0, X: 0, Y: 0, Speed: "" }

    useEffect(() => {
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: defaultActionData } : nodeOrEdge) } :
            metaAction))
        setMetaActionArray(updatedMetaActionArray)

        // eslint-disable-next-line
    }, [])

    const handleChangeSwitch = (event) => {
        const updatedActionData = { ...action.actionData, [event.target.name]: event.target.checked }
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
            metaAction))

        console.log(updatedActionData)

        setMetaActionArray(updatedMetaActionArray)
    }

    const handleChangeNumber = (event) => {
        const updatedActionData = { ...action.actionData, [event.target.name]: event.target.valueAsNumber }
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
            metaAction))

        console.log(updatedActionData)

        setMetaActionArray(updatedMetaActionArray)
    }

    const handleChangeList = (event) => {

        console.log(event.target.value)
        const updatedActionData = { ...action.actionData, Speed: event.target.value }
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
            metaAction))

        setMetaActionArray(updatedMetaActionArray)
    }

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={action.actionData.Chained} onChange={handleChangeSwitch} color="primary" name="Chained" />}
                    label="Enable Chained"
                />

                <TextField id="standard-basic" label="Radius" type="number" inputProps={{ min: -1000, max: 1000 }} defaultValue={action.actionData.Radius} onChange={handleChangeNumber} name="Radius" />
                <TextField id="standard-basic" label="X" type="number" inputProps={{ min: 0, max: 2000 }} defaultValue={action.actionData.X} onChange={handleChangeNumber} name="X" />
                <TextField id="standard-basic" label="Y" type="number" inputProps={{ min: 0, max: 3000 }} defaultValue={action.actionData.Y} onChange={handleChangeNumber} name="Y" />

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={action.actionData.Speed}
                    onChange={handleChangeList}
                >
                    {speedValues.map(actionType =>
                        <MenuItem value={actionType}>{actionType}</MenuItem>
                    )}
                </Select>
            </FormGroup>
        </div>
    )
}

BezierAction.propTypes = {
    action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(BezierAction)

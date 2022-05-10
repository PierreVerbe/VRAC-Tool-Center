import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Switch from "@material-ui/core/Switch"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"
import configData from "./../../../../resources/config.json"

const XYTAction = ({ action, metaActionArray, setMetaActionArray }) => {
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const getSelectedNode = getSelectedMetaAction.flow.filter(nodeOrEdge => nodeOrEdge.id === action.id)[0]
    const defaultActionData = { type: action.actionData.type, forward: false, x: 0, y: 0, theta: 0, speed: "" }

    useEffect(() => {
        const hasAllFields = Object.keys(defaultActionData).map(key => key in (getSelectedNode.actionData)).reduce((acc, next) => acc && next)

        if (! hasAllFields) {
            const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
                { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: defaultActionData } : nodeOrEdge) } :
                metaAction))
                
            setMetaActionArray(updatedMetaActionArray)
        }
        // eslint-disable-next-line
    }, [])

    const handleChangeSwitch = (event) => {
        const updatedActionData = { ...action.actionData, [event.target.name]: event.target.checked }
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
            metaAction))

        setMetaActionArray(updatedMetaActionArray)
    }

    const handleChangeNumber = (event) => {
        const updatedActionData = { ...action.actionData, [event.target.name]: event.target.valueAsNumber }
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
            metaAction))

        setMetaActionArray(updatedMetaActionArray)
    }

    const handleChangeList = (event) => {
        const updatedActionData = { ...action.actionData, speed: event.target.value }
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
            metaAction))

        setMetaActionArray(updatedMetaActionArray)
    }

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={action.actionData.forward} onChange={handleChangeSwitch} color="primary" name="forward" />}
                    label="Enable forward"
                />

                <TextField id="standard-basic" label="x" type="number" inputProps={{ min: 0, max: 2000 }} value={action.actionData.x} onChange={handleChangeNumber} name="x" />
                <TextField id="standard-basic" label="y" type="number" inputProps={{ min: 0, max: 3000 }} value={action.actionData.y} onChange={handleChangeNumber} name="y" />
                <TextField id="standard-basic" label="theta" type="number" inputProps={{ min: -3600, max: 3600 }}  value={action.actionData.theta} onChange={handleChangeNumber} name="theta" />

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={action.actionData.speed}
                    onChange={handleChangeList}
                >
                    {configData.metaAction.speed.values.map(actionType =>
                        <MenuItem value={actionType}>{actionType}</MenuItem>
                    )}
                </Select>
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

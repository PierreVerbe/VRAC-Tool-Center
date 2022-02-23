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

const LineAction = ({ action, metaActionArray, setMetaActionArray }) => {
    const ACTION = "Line"
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = { type: action.actionData.type, Distance: 0, Forward: false, Chained: false, Speed: "" }

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
                    control={<Switch checked={action.actionData.Forward} onChange={handleChangeSwitch} color="primary" name="Forward" />}
                    label="Enable forward"
                />
                <FormControlLabel
                    control={<Switch checked={action.actionData.Chained} onChange={handleChangeSwitch} color="primary" name="Chained" />}
                    label="Enable chained"
                />

                <TextField id="standard-basic" label="Distance" type="number" inputProps={{ min: -3000, max: 3000 }} defaultValue={action.actionData.Distance} onChange={handleChangeNumber} name="Distance" />
                
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={action.actionData.Speed}
                    onChange={handleChangeList}
                >
                    {configData.metaAction.Speed.Values.map(actionType =>
                        <MenuItem value={actionType}>{actionType}</MenuItem>
                    )}
                </Select>

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

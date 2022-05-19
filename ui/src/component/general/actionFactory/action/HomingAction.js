import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import TextField from "@material-ui/core/TextField"
import Switch from "@material-ui/core/Switch"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const HomingAction = ({ action, metaActionArray, setMetaActionArray }) => {
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const getSelectedNode = getSelectedMetaAction.flow.filter(nodeOrEdge => nodeOrEdge.id === action.id)[0]
    const defaultActionData = { type: action.actionData.type, forward: false, axis: false, offset: 0 }

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

        event.preventDefault()
    }

    
    const handleChangeNumber = (event) => {
        const updatedActionData = { ...action.actionData, [event.target.name]: event.target.valueAsNumber }
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
            metaAction))

        setMetaActionArray(updatedMetaActionArray)

        event.preventDefault()
    }

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={getSelectedNode.actionData.forward} onChange={handleChangeSwitch} color="primary" name="forward" />}
                    label="Enable forward"
                />
                <FormControlLabel
                    control={<Switch checked={getSelectedNode.actionData.axis} onChange={handleChangeSwitch} color="primary" name="axis" />}
                    label="Enable axis"
                />
                <TextField id="standard-basic" label="offset" type="number" inputProps={{ min: 0, max: 3000 }} value={getSelectedNode.actionData.offset} onChange={handleChangeNumber} name="offset" />
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

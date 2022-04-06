import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import FormGroup from "@material-ui/core/FormGroup"
import TextField from "@material-ui/core/TextField"

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const SetDetectionRangeAction = ({ action, metaActionArray, setMetaActionArray }) => {
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const getSelectedNode = getSelectedMetaAction.flow.filter(nodeOrEdge => nodeOrEdge.id === action.id)[0]
    const defaultActionData = { type: action.actionData.type, distance: 0 }

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

    const handleChangeNumber = (event) => {
        const updatedActionData = { ...action.actionData, [event.target.name]: event.target.valueAsNumber }
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: updatedActionData } : nodeOrEdge) } :
            metaAction))

        setMetaActionArray(updatedMetaActionArray)
    }

    return (
        <div>
            <FormGroup>
                <TextField id="standard-basic" label="distance" type="number" inputProps={{ min: 0, max: 3000 }} value={action.actionData.distance} onChange={handleChangeNumber} name="distance" />
            </FormGroup>
        </div>
    )
}

SetDetectionRangeAction.propTypes = {
    action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetDetectionRangeAction)

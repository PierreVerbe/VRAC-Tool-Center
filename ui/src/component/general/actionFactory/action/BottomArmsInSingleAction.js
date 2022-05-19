import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const BottomArmsInSingleAction = ({ action, metaActionArray, setMetaActionArray }) => {
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const getSelectedNode = getSelectedMetaAction.flow.filter(nodeOrEdge => nodeOrEdge.id === action.id)[0]
    const defaultActionData = { type: action.actionData.type, side: false }

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

    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={action.actionData.side} onChange={handleChangeSwitch} color="primary" name="side" />}
                label="Enable Chained"
            />
        </FormGroup>
    )
}

BottomArmsInSingleAction.propTypes = {
    action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomArmsInSingleAction)

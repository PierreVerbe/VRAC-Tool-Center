import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const BackGrippersGrabLeftAction = ({ action, metaActionArray, setMetaActionArray }) => {
    const ACTION = "BackGrippersGrabLeft"
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = { type: action.actionData.type }

    useEffect(() => {
        if (action.actionData.type !== ACTION) {
            const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ?
                { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: defaultActionData } : nodeOrEdge) } :
                metaAction))
            setMetaActionArray(updatedMetaActionArray)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Typography>No parameters</Typography>
    )

}

BackGrippersGrabLeftAction.propTypes = {
    action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(BackGrippersGrabLeftAction)

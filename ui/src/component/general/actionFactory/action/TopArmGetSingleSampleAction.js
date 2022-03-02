import React, {useEffect} from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import FormGroup from "@material-ui/core/FormGroup"
import TextField from "@material-ui/core/TextField"

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"

const TopArmGetSingleSampleAction = ({action, metaActionArray, setMetaActionArray}) => {
    const ACTION = "TopArmGetSingleSample"
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = {type: action.actionData.type, side: 0}

    useEffect(() => {
        if (action.actionData.type !== ACTION) {
            const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
                { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === action.id ? { ...nodeOrEdge, actionData: defaultActionData } : nodeOrEdge) } :
                 metaAction))
                 
            setMetaActionArray(updatedMetaActionArray)
        }
        // eslint-disable-next-line
    }, [])

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
                 <TextField id="standard-basic" label="side" type="number" defaultValue={action.actionData.side} onChange={handleChangeNumber} name="side"/>
            </FormGroup> 
        </div>
    )
}

TopArmGetSingleSampleAction.propTypes = {
    action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopArmGetSingleSampleAction)

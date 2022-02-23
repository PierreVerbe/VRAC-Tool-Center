import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import LinearScaleIcon from '@material-ui/icons/LinearScale'
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from '@material-ui/core/FormLabel'
import Select from "@material-ui/core/Select"

import { setMetaActionArrayActionCreator } from "../../../../action/strategyAction"
import configData from "./../../../../resources/config.json"

const configMetaActionTransition = configData.metaAction.transition

const HomingAction = ({ action, metaActionArray, setMetaActionArray }) => {
    const ACTION = "Homing"
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    const defaultActionData = { type: action.actionData.type, Forward: false, Axis: false, Side: false }

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
        console.log(updatedActionData)
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
                <FormControlLabel
                    control={<Switch checked={action.actionData.Side} onChange={handleChangeSwitch} color="primary" name="Side" />}
                    label="Enable side"
                />
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

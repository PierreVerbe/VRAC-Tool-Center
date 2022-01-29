import React, { useEffect } from "react"
import { connect } from "react-redux"
import { setStrategyCreatorActionCreator, setOpenDialogNodeStrategyActionCreator } from "../../../../../../action/strategyAction"
import PropTypes from 'prop-types'

import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'



import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"

import DeleteIcon from "@material-ui/icons/Delete"
import LinearScaleIcon from '@material-ui/icons/LinearScale'


const DialogUpdateNode = ({ isOpen, strategyCreator, openDialogNodeStrategy, setStrategyCreator, setOpenDialogNodeStrategy }) => {

    useEffect(() => {
        console.log("hello2")
    }, [openDialogNodeStrategy])

    const deleteEdge = (event, id) => {
        event.preventDefault()

        const filteredEdge = strategyCreator.flow.filter(edge => edge.id !== id)
        setStrategyCreator({...strategyCreator, flow: filteredEdge})
    }

    const listEdgesToDelete = () => {
        const edges = strategyCreator.flow.filter(element => element.id.startsWith("Edge"))
        const filteredEdges = edges.filter(element => element.source === openDialogNodeStrategy.node.id || element.target === openDialogNodeStrategy.node.id)

        return filteredEdges.map((value) => (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LinearScaleIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={value.id}
                    secondary={`Source : ${value.source} Target : ${value.target}`}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={(event) => deleteEdge(event, value.id)}>
                        <DeleteIcon style={{ color: "red" }}/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>)

        )
    }

    const handleCancel = (event) => {
        event.preventDefault()

        setOpenDialogNodeStrategy({ open: false, node: { data: { label: {} } } })
    }

    const handleDelete = (event) => {
        event.preventDefault()

        const filteredNode = strategyCreator.flow.filter(flow => flow.id !== openDialogNodeStrategy.node.id)
        const filteredEdge = filteredNode.filter(flow => flow.source !== openDialogNodeStrategy.node.id && flow.target !== openDialogNodeStrategy.node.id)
        setStrategyCreator({...strategyCreator, flow: filteredEdge})
        setOpenDialogNodeStrategy({ open: false, node: { data: { label: {} } } })
    }

    const handleSubmit = (event) => {
        const index = strategyCreator.flow.map(item => item.id).indexOf(openDialogNodeStrategy.node.id)

        if (index === -1) {
            console.log("Item not in flowStrategy")
        }
        else {
            var flowStrategyUpdated = strategyCreator.flow
            flowStrategyUpdated[index] = openDialogNodeStrategy.node
            setStrategyCreator({...strategyCreator, flow: flowStrategyUpdated})
            console.log(flowStrategyUpdated)
            setOpenDialogNodeStrategy({ open: false, node: { data: { label: {} } } })
        }

        event.preventDefault()
    }

    // Text field in dialog
    const onTextLabelChange = (label) => {
        const nodeStrategyUpdated = { ...openDialogNodeStrategy.node, data: { label: label.target.value } }
        const openDialogNodeStrategyUpdated = { open: true, node: nodeStrategyUpdated }
        setOpenDialogNodeStrategy(openDialogNodeStrategyUpdated)
    }

    const onTextVersionChange = (version) => {
        //const monitoringUpdated = { ...monitoring, version: version.target.value }
        //setMonitoring(monitoringUpdated)
    }


    return (
        <Dialog open={isOpen} onClose={handleCancel}>
            <DialogTitle>Update Node id</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To save node, please enter the fields below.
                </DialogContentText>

                <TextField
                    disabled
                    autoFocus
                    margin="dense"
                    id="id"
                    label="Id"
                    defaultValue={openDialogNodeStrategy.node.id}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextLabelChange}
                    id="dataLabel"
                    label="Data label"
                    defaultValue={openDialogNodeStrategy.node.data.label}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextVersionChange}
                    id="version"
                    label="Version"
                    defaultValue={openDialogNodeStrategy.node.id}
                    fullWidth
                    variant="standard"
                />


                <Typography variant="h6" >
                    List of edge to delete
                </Typography>
                <div >
                    <List dense={true}>
                        {listEdgesToDelete()}
                    </List>
                </div>


            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => handleCancel(event)}
                    startIcon={<ClearIcon />}
                    //className={classes.button}
                    style={{ backgroundColor: "orange" }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => handleDelete(event)}
                    startIcon={<ClearIcon />}
                    //className={classes.button}
                    style={{ backgroundColor: "red" }}
                >
                    Delete
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => handleSubmit(event)}
                    // className={classes.button}
                    startIcon={<PublishIcon />}
                    style={{ backgroundColor: "green" }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DialogUpdateNode.propTypes = {
    isOpen: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    strategyCreator: state.strategyCreator,
    openDialogNodeStrategy: state.openDialogNodeStrategy
})

const mapDispatchToProps = dispatch => ({
    setStrategyCreator: strategyCreator => dispatch(setStrategyCreatorActionCreator(strategyCreator)),
    setOpenDialogNodeStrategy: openDialogNodeStrategy => dispatch(setOpenDialogNodeStrategyActionCreator(openDialogNodeStrategy)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogUpdateNode)

import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { setFlowStrategyActionCreator, setOpenDialogNodeStrategyActionCreator } from "../../../../../action/strategyAction"
import PropTypes from 'prop-types'



/*
Remove node and edge
const onElementsRemove = (elementsToRemove) =>
setFlowStrategy((els) => removeElements(elementsToRemove, els))
*/

const DialogUpdateNode = ({ isOpen, openDialogNodeStrategy, flowStrategy, setOpenDialogNodeStrategy, setFlowStrategy }) => {

    useEffect(() => {
        console.log("hello2")
      }, [openDialogNodeStrategy, flowStrategy])

    const handleCancel = () => {
        setOpenDialogNodeStrategy({ open: false, node: { data: { label: {} } } })
    }

    const handleDelete = () => {
        const filteredNode = flowStrategy.filter(flow => flow.id !== openDialogNodeStrategy.node.id)
        const filteredEdge = filteredNode.filter(flow => flow.source !== openDialogNodeStrategy.node.id && flow.target !== openDialogNodeStrategy.node.id)
        setFlowStrategy(filteredEdge)
        setOpenDialogNodeStrategy({ open: false, node: { data: { label: {} } } })
    }

    const handleSubmit = () => {
            const index = flowStrategy.map(item => item.id).indexOf(openDialogNodeStrategy.node.id)

            if (index === -1) {
                console.log("Item not in flowStrategy")
            }
            else {
                var flowStrategyUpdated = flowStrategy
                flowStrategyUpdated[index] = openDialogNodeStrategy.node
                setFlowStrategy(flowStrategyUpdated)
                //console.log(flowStrategyUpdated)
                setOpenDialogNodeStrategy({ open: false, node: { data: { label: {} } } })
            }
        
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
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                    startIcon={<ClearIcon />}
                    //className={classes.button}
                    style={{ backgroundColor: "orange" }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                    startIcon={<ClearIcon />}
                    //className={classes.button}
                    style={{ backgroundColor: "red" }}
                >
                    Delete
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
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
    openDialogNodeStrategy: state.openDialogNodeStrategy,
    flowStrategy: state.flowStrategy
})

const mapDispatchToProps = dispatch => ({
    setOpenDialogNodeStrategy: openDialogNodeStrategy => dispatch(setOpenDialogNodeStrategyActionCreator(openDialogNodeStrategy)),
    setFlowStrategy: flowStrategy => dispatch(setFlowStrategyActionCreator(flowStrategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogUpdateNode)

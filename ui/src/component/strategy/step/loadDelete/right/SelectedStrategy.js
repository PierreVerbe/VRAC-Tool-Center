import React from "react"
import { connect } from "react-redux"

import Button from "@material-ui/core/Button"

//import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import ClearIcon from '@material-ui/icons/Clear'

import DropzoneOrReactJson from "./DropzoneOrReactJson"
import DialogSaveStrategy from "./DialogSaveStrategy"
import { insertStrategyActionCreator, deleteStrategyActionCreator, setIdRowStrategyTableActionCreator, setStrategyActionCreator, setOpenDialogStrategyActionCreator } from "../../../../../action/strategyAction"

/*
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 500,
    },
  })
*/

const SelectedStrategy = ({ deleteStrategy, idRowStrategyTable, strategy, setIdRowStrategyTable, setStrategy, setOpenDialogStrategy }) => {
    //const classes = useStyles()

    // Is button disabled
    const isSaveButtonDisabled = () => {
        return (idRowStrategyTable !== null && idRowStrategyTable !== -1) || Object.entries(strategy).length === 0
    }

    const isDeleteButtonDisabled = () => {
        return (idRowStrategyTable === null || idRowStrategyTable === -1) || Object.entries(strategy).length === 0
    }

    const isExportButtonDisabled = () => {
        return Object.entries(strategy).length === 0
    }

    const isClearButtonDisabled = () => {
        return Object.entries(strategy).length === 0
    }

    // OnClick function for button
    const handleSave = () => {
        setOpenDialogStrategy(true)
    }

    const handleDelete = () => {
        if (idRowStrategyTable !== -1) {
            const body = { id: idRowStrategyTable }
            deleteStrategy(body)
            setIdRowStrategyTable(null)
            setStrategy({})
        }
    }

    const handleExport = async () => {
        const fileName = strategy.name ? strategy.name : "exported_file"
        const json = JSON.stringify(strategy)
        const blob = new Blob([json], { type: 'application/json' })
        const href = await URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = href
        link.download = fileName + ".json"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleClear = () => {
        setIdRowStrategyTable(null)
        setStrategy({})
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                //className={classes.button}
                startIcon={<SaveIcon />}
                style={{ backgroundColor: "green" }}
                disabled={isSaveButtonDisabled()}
            >
                Save
            </Button>

            <DialogSaveStrategy />

            <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}
                //className={classes.button}
                startIcon={<DeleteIcon />}
                style={{ backgroundColor: "red" }}
                disabled={isDeleteButtonDisabled()}
            >
                Delete
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleExport}

                startIcon={<GetAppIcon />}
                //className={classes.button}
                style={{ backgroundColor: "blue" }}
                disabled={isExportButtonDisabled()}
            >
                Export
            </Button>

            <DropzoneOrReactJson isSelected={idRowStrategyTable !== null} strategy={strategy} setIdRowStrategyTable={setIdRowStrategyTable} setStrategy={setStrategy} />

            <Button
                variant="contained"
                color="primary"
                onClick={handleClear}
                startIcon={<ClearIcon />}
                //className={classes.button}
                disabled={isClearButtonDisabled()}
                style={{ backgroundColor: "orange" }}
            >
                Clear
            </Button>
        </div>
    )
}

const mapStateToProps = state => ({
    idRowStrategyTable: state.idRowStrategyTable,
    strategy: state.strategy
})

const mapDispatchToProps = dispatch => ({
    setIdRowStrategyTable: idRowStrategyTable => dispatch(setIdRowStrategyTableActionCreator(idRowStrategyTable)),
    insertStrategy: strategyToInsert => dispatch(insertStrategyActionCreator(strategyToInsert)),
    deleteStrategy: strategyToDelete => dispatch(deleteStrategyActionCreator(strategyToDelete)),
    setStrategy: strategy => dispatch(setStrategyActionCreator(strategy)),
    setOpenDialogStrategy: openDialogStrategy => dispatch(setOpenDialogStrategyActionCreator(openDialogStrategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedStrategy)

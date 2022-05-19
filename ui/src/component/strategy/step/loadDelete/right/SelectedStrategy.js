import React from "react"
import { connect } from "react-redux"

import Button from "@material-ui/core/Button"

//import { makeStyles } from "@material-ui/core/styles"
import SaveIcon from "@material-ui/icons/Save"
import DeleteIcon from "@material-ui/icons/Delete"
import GetAppIcon from "@material-ui/icons/GetApp"
import ClearIcon from "@material-ui/icons/Clear"
import ReactJson from "react-json-view"

import DialogLoadStrategyFromFile from "./DialogLoadStrategyFromFile"
import { setMetaActionArrayActionCreator, setStrategyCreatorActionCreator, setFileUploadedActionCreator, setStrategyLoaderActionCreator, insertStrategyActionCreator, deleteStrategyActionCreator, setIdRowStrategyTableActionCreator, setStrategyActionCreator, setOpenDialogStrategyActionCreator } from "../../../../../action/strategyAction"


import parserGraph from "../../../../../utils/parserGraph"
import parserStrategy from "../../../../../utils/parserStrategy"

/*
const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 500,
    },
  })
*/

const SelectedStrategy = ({setMetaActionArray, setStrategyCreator, setFileUploaded, insertStrategy, setStrategyLoader, strategyCreator, metaActionArray, deleteStrategy, idRowStrategyTable, strategyLoader, setIdRowStrategyTable, setStrategy, setOpenDialogStrategy }) => {
    //const classes = useStyles()
  

    // Is button disabled
    const isSaveButtonDisabled = () => {
        return (idRowStrategyTable !== null && idRowStrategyTable !== -1) || Object.entries(strategyLoader).length === 0
    }

    const isDeleteButtonDisabled = () => {
        return (idRowStrategyTable === null || idRowStrategyTable === -1) || Object.entries(strategyLoader).length === 0
    }

    const isExportButtonDisabled = () => {
        return Object.entries(strategyLoader).length === 0
    }

    const isClearButtonDisabled = () => {
        return Object.entries(strategyLoader).length === 0
    }

    // OnClick function for button
    const handleLoadFromCreator = (event) => {
        const contentParser = parserGraph.parse(strategyCreator, metaActionArray)
        setIdRowStrategyTable(-1)
        setStrategyLoader(contentParser)

        //event.preventDefault()
    }

    const handleLoadToCreator = (event) => {
        if (strategyLoader.strategy !== undefined) {
            const strategyCreatorParsed = parserStrategy.parseStrategyCreator(strategyLoader.strategy)
            setStrategyCreator(strategyCreatorParsed)
        }

        if (strategyLoader.metaActions !== undefined) {
            const metaActionArrayParsed = parserStrategy.parseMetaActionArray(strategyLoader.metaActions)
            
            setMetaActionArray(metaActionArrayParsed)
        }
        

        

        //const contentParser = parserGraph.parse(strategyCreator, metaActionArray)
        //setIdRowStrategyTable(-1)
        //setStrategyLoader(contentParser)
        //event.preventDefault
    }

    const handleLoadStrategyFromFile = (event) => {
        setOpenDialogStrategy(true)

        //event.preventDefault()
    }

    const handleSave = (event) => {
        insertStrategy(strategyLoader)
        //setOpenDialogStrategy(true)

        //event.preventDefault
    }

    const handleDelete = (event) => {
        if (idRowStrategyTable !== -1) {
            const body = { id: idRowStrategyTable }
            deleteStrategy(body)
            setIdRowStrategyTable(null)
            setStrategy({})
        }

        //event.preventDefault()
    }

    const handleExport = async (event) => {
        const fileName = strategyLoader.name ? strategyLoader.name : "exported_file"
        const json = JSON.stringify(strategyLoader)
        const blob = new Blob([json], { type: "application/json" })
        const href = await URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = href
        link.download = fileName + ".json"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        //event.preventDefault()
    }

    const handleClear = (event) => {
        setIdRowStrategyTable(null)
        setStrategyLoader({})
        setFileUploaded([])

        //event.preventDefault()
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => handleLoadFromCreator(event)}
                //disabled={isSaveButtonDisabled()}
            >
                Load from creator
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={(event) => handleLoadToCreator(event)}
                //disabled={isSaveButtonDisabled()}
            >
                Load to creator
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={(event) => handleLoadStrategyFromFile(event)}
                //disabled={isSaveButtonDisabled()}
            >
                Load from file
            </Button>
    
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => handleSave(event)}
                //className={classes.button}
                startIcon={<SaveIcon />}
                style={{ backgroundColor: "green" }}
                disabled={isSaveButtonDisabled()}
            >
                Save
            </Button>
            <DialogLoadStrategyFromFile />

{/* 
            <DialogSaveStrategy />
 */}
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => handleDelete(event)}
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
                onClick={(event) => handleExport(event)}

                startIcon={<GetAppIcon />}
                //className={classes.button}
                style={{ backgroundColor: "blue" }}
                disabled={isExportButtonDisabled()}
            >
                Export
            </Button>

            <ReactJson src={strategyLoader} collapsed={1} />

            {/* 
            <DropzoneOrReactJson isSelected={idRowStrategyTable !== null} strategy={strategyLoader} setIdRowStrategyTable={setIdRowStrategyTable} setStrategy={setStrategyLoader} />
            */}
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => handleClear(event)}
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
    strategyCreator: state.strategyCreator,
    metaActionArray: state.metaActionArray,
    idRowStrategyTable: state.idRowStrategyTable,
    strategyLoader: state.strategyLoader
})

const mapDispatchToProps = dispatch => ({
    insertStrategy: strategyToInsert => dispatch(insertStrategyActionCreator(strategyToInsert)),
    setStrategyLoader: strategyLoader => dispatch(setStrategyLoaderActionCreator(strategyLoader)),
    setIdRowStrategyTable: idRowStrategyTable => dispatch(setIdRowStrategyTableActionCreator(idRowStrategyTable)),
    deleteStrategy: strategyToDelete => dispatch(deleteStrategyActionCreator(strategyToDelete)),
    setStrategy: strategyCreator => dispatch(setStrategyActionCreator(strategyCreator)),
    setOpenDialogStrategy: openDialogStrategy => dispatch(setOpenDialogStrategyActionCreator(openDialogStrategy)),
    setFileUploaded: fileUploaded => dispatch(setFileUploadedActionCreator(fileUploaded)),
    setStrategyCreator: strategyCreator => dispatch(setStrategyCreatorActionCreator(strategyCreator)),
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedStrategy)

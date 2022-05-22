import StepConnector from "@material-ui/core/StepConnector"
import { makeStyles, withStyles } from "@material-ui/core/styles"

export const ELEVATION_PAGE_CONTENT = 3
export const GRID_CONTAINER_SPACING = 3
export const MONITORING_GRID_SIZING = 6

// Strategy & Monitoring Stepper
export const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22
    },
    active: {
        "& $line": {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
        }
    },
    completed: {
        "& $line": {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
        }
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1
    }
})(StepConnector)

export const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 50,
        height: 50,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    active: {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    },
    completed: {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
    }
})

export const useStyles = makeStyles((theme) => ({
    commonButton: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    loadTable: {
        maxHeight: "calc(100vh - 390px)",
    },
    loadTableSearchBar: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    loadTableSearchBarButton: {
        padding: 10,
    },

    // Strategy
    metaActionCreatorList: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        height: "calc(100vh - 370px)",
    },
    metaActionCreatorLi: {
        backgroundColor: "inherit",
    },
    metaActionCreatorUl: {
        backgroundColor: "inherit",
        padding: 0,
    },
    metaActionCreatorForm: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    metaActionCreatorFormPaper: {
        display: "flex",
        "& > *": {
            padding: theme.spacing(3)
        },
    }



    // MetaActionDialog.js
}))

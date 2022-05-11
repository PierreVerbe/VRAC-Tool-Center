import { SET_DARK_MODE, SET_SNACK_BAR } from "../action/generalAction"
import { strategyReducer } from "./strategyReducer"
import { monitoringReducer } from "./monitoringReducer"

const defaultState = {
    // General
    darkMode: false,
    snackBar: { isOpen: false, severity: undefined, message: undefined },

    // Strategy
    strategyStepper: 0,
    // Create
    strategyCreator: { name: "Strategy name", flow: [], reactFlowInstance: null },  // reactFlowInstance Serves for drag & drop
    openDialogNodeStrategy: false,
    metaActionArray: [], // to modify to metaActionArrayCreator
    openDialogMetaAction: false,

    // Load/Delete
    allStrategies: [],
    strategyLoader: {},
    idRowStrategyTable: null,
    //strategy: {},
    openDialogStrategy: false,
    fileUploaded: [],

    // Statistic


    // Monitoring
    monitoringStepper: 0,
    allMonitorings: [],
    monitoring: {},
    // Load/Delete
    idRowMonitoringTable: null,
    openDialogMonitoring: false,
    // Simulation
    activeStepMonitoring: 0
    // Statistic  
}

export const reducer = (state = defaultState, action) => {
    const stateGeneral = commonReducer(state, action)
    const stateStrategy = strategyReducer(stateGeneral, action)
    return monitoringReducer(stateStrategy, action)
}

const commonReducer = (state, action) => {
    switch (action.type) {
        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
            }

        case SET_SNACK_BAR:
            return {
                ...state,
                snackBar: action.payload
            }

        default:
            return state
    }
}

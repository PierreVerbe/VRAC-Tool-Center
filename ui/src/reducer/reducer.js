import { SET_DARK_MODE, SET_SNACK_BAR, SET_POINTER_SIMULATOR, SET_SIMULATED_ROBOT } from "../action/generalAction"
import { strategyReducer } from "./strategyReducer"
import { monitoringReducer } from "./monitoringReducer"

import { DEFAULT_ROBOT_X, DEFAULT_ROBOT_Y, DEFAULT_ROBOT_T } from "./../component/general/robotSimulator/RobotActionFactory"

const defaultState = {
    // General
    darkMode: false,
    snackBar: { isOpen: false, severity: undefined, message: undefined },
    pointerSimulator : { x: undefined, y: undefined },
    simulatedRobot : { angle: DEFAULT_ROBOT_T, x: DEFAULT_ROBOT_X, y: DEFAULT_ROBOT_Y, actual: { strategyNode: { id: undefined, name: undefined }, metaActionNode: { id: undefined, name: undefined } }, previous: [], render: undefined },

    // Strategy 
    strategyStepper: 0,
        // Create
        strategyAppBar: 0,
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

        case SET_POINTER_SIMULATOR:
            return {
                ...state,
                pointerSimulator: action.payload
            }

        case SET_SIMULATED_ROBOT:
            return {
                ...state,
                simulatedRobot: action.payload
            }

        default:
            return state
    }
}

import { SET_DARK_MODE } from "../action/generalAction"
import { INSERT_MONITORING, GET_ALL_MONITORINGS, GET_MONITORING, UPDATE_MONITORING, DELETE_MONITORING, SET_MONITORING_STEPPER, SET_ID_ROW_MONITORING_TABLE, SET_MONITORING, SET_OPEN_DIALOG_MONITORING, SET_ACTIVE_STEP_MONITORING, INSERT_MONITORING, GET_ALL_MONITORINGS, GET_MONITORING, UPDATE_MONITORING, DELETE_MONITORING, SET_MONITORING_STEPPER, SET_ID_ROW_MONITORING_TABLE, SET_MONITORING, SET_OPEN_DIALOG_MONITORING } from "../action/monitoringAction"
import { SET_STRATEGY_STEPPER, INSERT_STRATEGY, GET_ALL_STRATEGIES, GET_STRATEGY, UPDATE_STRATEGY, DELETE_STRATEGY, SET_STRATEGY_STEPPER, SET_ID_ROW_STRATEGY_TABLE, SET_STRATEGY, SET_OPEN_DIALOG_STRATEGY, SET_OPEN_DIALOG_NODE_STRATEGY, SET_META_ACTION_ARRAY, SET_OPEN_DIALOG_META_ACTION, SET_STRATEGY_CREATOR } from "../action/strategyAction"
import { reducerStrategy } from "./strategyReducer"
import { reducerMonitoring } from "./monitoringReducer"

const defaultState = {
    // General
    darkMode: false,

    // Strategy
    strategyStepper: 0,
    // Create
    strategyCreator : {name: "Strategy name", flow: [], reactFlowInstance: null},  // reactFlowInstance Serves for drag & drop
    openDialogNodeStrategy: false,
    metaActionArray: [], // to modify to metaActionArrayCreator
    openDialogMetaAction: false,

    // Load/Delete
    allStrategies: [],
    idRowStrategyTable: null,
    //strategy: {},
    openDialogStrategy: false,
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
    const stateStrategy = reducerStrategy(stateGeneral, action)
    return reducerMonitoring(stateStrategy, action) 
}

const commonReducer = (state, action) => {
    switch (action.type) {
        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
            }

        default:
            return state
    }
}

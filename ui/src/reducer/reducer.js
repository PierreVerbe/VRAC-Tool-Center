import { SET_DARK_MODE } from "../action/generalAction"
import { INSERT_MONITORING, GET_ALL_MONITORINGS, GET_MONITORING, UPDATE_MONITORING, DELETE_MONITORING, SET_MONITORING_STEPPER, SET_ID_ROW_MONITORING_TABLE, SET_MONITORING, SET_OPEN_DIALOG_MONITORING } from "../action/monitoringAction"
import { INSERT_STRATEGY, GET_ALL_STRATEGIES, GET_STRATEGY, UPDATE_STRATEGY, DELETE_STRATEGY, SET_STRATEGY_STEPPER, SET_ID_ROW_STRATEGY_TABLE, SET_STRATEGY, SET_OPEN_DIALOG_STRATEGY, SET_FLOW_STRATEGY, SET_OPEN_DIALOG_NODE_STRATEGY, SET_REACT_FLOW_INSTANCE, SET_META_ACTION_ARRAY, SET_OPEN_DIALOG_META_ACTION } from "../action/strategyAction"

const defaultState = {
    // General
    darkMode: false,

    // Strategy
    strategyStepper: 0,
    // Create
    flowStrategy: [],
    reactFlowInstance: null, // Serves for drag & drop
    openDialogNodeStrategy: { open: false, node: { data: { label: {} } } },
    metaActionArray: [],
    openDialogMetaAction: false,

    // Load/Delete
    allStrategies: [],
    idRowStrategyTable: null,
    strategy: {},
    openDialogStrategy: false,
    // Statistic


    // Monitoring
    monitoringStepper: 0,
    allMonitorings: [],
    idRowMonitoringTable: null,
    monitoring: {},
    openDialogMonitoring: false
}

export const reducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
            }

        case INSERT_STRATEGY:
            return {
                ...state,
                allStrategies: action.payload
            }

        case GET_ALL_STRATEGIES:
            return {
                ...state,
                allStrategies: action.payload
            }

        case GET_STRATEGY:
            return {
                ...state,
                strategy: action.payload
            }

        case UPDATE_STRATEGY:
            return {
                ...state,
                allStrategies: action.payload.allStrategies,
                strategy: action.payload.strategy
            }

        case DELETE_STRATEGY:
            return {
                ...state,
                allStrategies: action.payload
            }

        case SET_STRATEGY_STEPPER:
            return {
                ...state,
                strategyStepper: action.payload
            }

        case SET_ID_ROW_STRATEGY_TABLE:
            return {
                ...state,
                idRowStrategyTable: action.payload
            }

        case SET_STRATEGY:
            return {
                ...state,
                strategy: action.payload
            }

        case SET_OPEN_DIALOG_STRATEGY:
            return {
                ...state,
                openDialogStrategy: action.payload
            }

        case INSERT_MONITORING:
            return {
                ...state,
                allMonitorings: action.payload
            }

        case GET_ALL_MONITORINGS:
            return {
                ...state,
                allMonitorings: action.payload
            }

        case GET_MONITORING:
            return {
                ...state,
                monitoring: action.payload
            }

        case UPDATE_MONITORING:
            return {
                ...state,
                allMonitorings: action.payload.allMonitorings,
                monitoring: action.payload.monitoring
            }

        case DELETE_MONITORING:
            return {
                ...state,
                allMonitorings: action.payload
            }

        case SET_MONITORING_STEPPER:
            return {
                ...state,
                monitoringStepper: action.payload
            }

        case SET_ID_ROW_MONITORING_TABLE:
            return {
                ...state,
                idRowMonitoringTable: action.payload
            }

        case SET_MONITORING:
            return {
                ...state,
                monitoring: action.payload
            }

        case SET_OPEN_DIALOG_MONITORING:
            return {
                ...state,
                openDialogMonitoring: action.payload
            }

        case SET_FLOW_STRATEGY:
            return {
                ...state,
                flowStrategy: action.payload
            }

        case SET_REACT_FLOW_INSTANCE:
            return {
                ...state,
                reactFlowInstance: action.payload
            }

        case SET_OPEN_DIALOG_NODE_STRATEGY:
            return {
                ...state,
                openDialogNodeStrategy: action.payload
            }

        case SET_META_ACTION_ARRAY:
            return {
                ...state,
                metaActionArray: action.payload
            }

        case SET_OPEN_DIALOG_META_ACTION:
            return {
                ...state,
                openDialogMetaAction: action.payload
            }

        default:
            return state
    }
}

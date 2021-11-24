import { INSERT_MONITORING, GET_ALL_MONITORINGS, GET_MONITORING, UPDATE_MONITORING, DELETE_MONITORING, SET_MONITORING_STEPPER, SET_ID_ROW_MONITORING_TABLE, SET_MONITORING, SET_OPEN_DIALOG_MONITORING, SET_ACTIVE_STEP_MONITORING } from "../action/monitoringAction"

export const monitoringReducer = (state, action) => {
    switch (action.type) {
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

        case SET_ACTIVE_STEP_MONITORING:
            return {
                ...state,
                activeStepMonitoring: action.payload
            }

        default:
            return state
    }
}

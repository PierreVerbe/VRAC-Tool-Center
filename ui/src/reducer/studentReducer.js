import { SET_DARK_MODE } from "../action/generalAction"
import { GET_ALL_STUDENTS, INSERT_STUDENT } from "../action/studentAction"
import { INSERT_MONITORING, GET_ALL_MONITORINGS, SET_MONITORING_STEPPER, SET_ID_ROW_MONITORING_TABLE, SET_MONITORING } from "../action/monitoringAction"

const defaultState = {
    // General
    darkMode: false,

    // Strategy
    students: [],

    // Monitoring
    allMonitorings: [],
    monitoringStepper: 0,
    idRowMonitoringTable: null,
    monitoring: {}
}

export const studentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ALL_STUDENTS:
            return {
                ...state,
                students: action.payload
            }

        case INSERT_STUDENT:
            return {
                ...state,
                students: action.payload
            }

        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
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

        default:
            return state
    }
}

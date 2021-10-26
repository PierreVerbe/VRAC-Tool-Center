import { SET_DARK_MODE } from "../action/generalAction"
import { GET_ALL_STUDENTS, INSERT_STUDENT } from "../action/studentAction"
import { SET_MONITORING_STEPPER, SET_ROW_MONITORING_TABLE } from "../action/monitoringAction"

const defaultState = {
    // General
    darkMode: false,

    // Strategy
    students: [],

    // Monitoring
    monitoringStepper: 0,
    rowMonitoringTable: null
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

        case SET_MONITORING_STEPPER:
            return {
                ...state,
                monitoringStepper: action.payload
            }

        case SET_ROW_MONITORING_TABLE:
            return {
                ...state,
                rowMonitoringTable: action.payload
            }

        default:
            return state
    }
}

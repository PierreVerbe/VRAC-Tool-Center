import { insertMonitoring, getAllMonitorings, getMonitoring, updateMonitoring, deleteMonitoring } from "./../request/apiMonitoring"

export const INSERT_MONITORING = "INSERT_MONITORING"
export const GET_ALL_MONITORINGS = "GET_ALL_MONITORINGS"

export const SET_MONITORING_STEPPER = "SET_MONITORING_STEPPER"
export const SET_ID_ROW_MONITORING_TABLE = "SET_ID_ROW_MONITORING_TABLE"
export const SET_MONITORING = "SET_MONITORING"

// REST call 
export const insertMonitoringActionCreator = monitoringToInsert => {
    return async function (dispatch) {
        await insertMonitoring(monitoringToInsert)
        const result = await getAllMonitorings()
        dispatch({
            type: INSERT_MONITORING,
            payload: result
        })
    }
}

export const getAllMonitoringsActionCreator = () => {
    return async function (dispatch) {
        const result = await getAllMonitorings()
        dispatch({
            type: GET_ALL_MONITORINGS,
            payload: result
        })
    }
}

// Set states
export const setMonitoringStepperActionCreator = stepperMonitoring => {
    return function (dispatch) {
        dispatch({
            type: SET_MONITORING_STEPPER,
            payload: stepperMonitoring
        })
    }
}

export const setIdRowMonitoringTableActionCreator = idRowMonitoringTable => {
    return function (dispatch) {
        dispatch({
            type: SET_ID_ROW_MONITORING_TABLE,
            payload: idRowMonitoringTable
        })
    }
}

export const setMonitoringActionCreator = monitoring => {
    return function (dispatch) {
        dispatch({
            type: SET_MONITORING,
            payload: monitoring
        })
    }
}

export const SET_MONITORING_STEPPER = "SET_MONITORING_STEPPER"
export const SET_ID_ROW_MONITORING_TABLE = "SET_ID_ROW_MONITORING_TABLE"
export const SET_MONITORING = "SET_MONITORING"

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

export const SET_MONITORING_STEPPER = "SET_MONITORING_STEPPER"
export const SET_ROW_MONITORING_TABLE = "SET_ROW_MONITORING_TABLE"

export const setMonitoringStepperActionCreator = stepperMonitoring => {
    return function (dispatch) {
        dispatch({
            type: SET_MONITORING_STEPPER,
            payload: stepperMonitoring
        })
    }
}

export const setRowMonitoringTableActionCreator = rowMonitoringTable => {
    return function (dispatch) {
        dispatch({
            type: SET_ROW_MONITORING_TABLE,
            payload: rowMonitoringTable
        })
    }
}

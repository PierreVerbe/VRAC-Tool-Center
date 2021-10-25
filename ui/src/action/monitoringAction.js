export const SET_MONITORING_STEPPER = "SET_MONITORING_STEPPER"

export const setMonitoringStepperActionCreator = stepperMonitoring => {
    return function (dispatch) {
        dispatch({
            type: SET_MONITORING_STEPPER,
            payload: stepperMonitoring
        })
    }
}
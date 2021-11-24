export const SET_STRATEGY_STEPPER = "SET_STRATEGY_STEPPER"

// Set states
export const setStrategyStepperActionCreator = stepperStrategy => {
    return function (dispatch) {
        dispatch({
            type: SET_STRATEGY_STEPPER,
            payload: stepperStrategy
        })
    }
}

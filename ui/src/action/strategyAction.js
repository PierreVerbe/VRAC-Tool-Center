import { getAllStrategies } from "./../request/apiStrategy"

export const SET_STRATEGY_STEPPER = "SET_STRATEGY_STEPPER"

export const GET_ALL_STRATEGIES = "GET_ALL_STRATEGIES"
export const SET_ID_ROW_STRATEGY_TABLE = "SET_ID_ROW_STRATEGY_TABLE"
export const SET_STRATEGY = "SET_STRATEGY"

// Set states
export const setStrategyStepperActionCreator = stepperStrategy => {
    return function (dispatch) {
        dispatch({
            type: SET_STRATEGY_STEPPER,
            payload: stepperStrategy
        })
    }
}

export const getAllStrategiesActionCreator = () => {
    return async function (dispatch) {
        const result = await getAllStrategies()
        dispatch({
            type: GET_ALL_STRATEGIES,
            payload: result
        })
    }
}


export const setIdRowStrategyTableActionCreator = idRowStrategyTable => {
    return function (dispatch) {
        dispatch({
            type: SET_ID_ROW_STRATEGY_TABLE,
            payload: idRowStrategyTable
        })
    }
}


export const setStrategyActionCreator = strategy => {
    return function (dispatch) {
        dispatch({
            type: SET_STRATEGY,
            payload: strategy
        })
    }
}

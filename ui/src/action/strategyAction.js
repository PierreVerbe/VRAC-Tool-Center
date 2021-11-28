import { insertStrategy, getAllStrategies, getStrategy, updateStrategy, deleteStrategy } from "./../request/apiStrategy"

export const INSERT_STRATEGY = "INSERT_STRATEGY"
export const GET_ALL_STRATEGIES = "GET_ALL_STRATEGIES"
export const GET_STRATEGY = "GET_STRATEGY"
export const UPDATE_STRATEGY = "UPDATE_STRATEGY"
export const DELETE_STRATEGY = "DELETE_STRATEGY"

export const SET_STRATEGY_STEPPER = "SET_STRATEGY_STEPPER"
export const SET_ID_ROW_STRATEGY_TABLE = "SET_ID_ROW_STRATEGY_TABLE"
export const SET_STRATEGY = "SET_STRATEGY"
export const SET_OPEN_DIALOG_STRATEGY = "SET_OPEN_DIALOG_MONITORING"

// REST call 
export const insertStrategyActionCreator = strategyToInsert => {
    return async function (dispatch) {
        await insertStrategy(strategyToInsert)
        const result = await getAllStrategies()
        dispatch({
            type: INSERT_STRATEGY,
            payload: result
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

export const getStrategyActionCreator = (strategy) => {
    return async function (dispatch) {
        const result = await getStrategy(strategy)
        dispatch({
            type: GET_STRATEGY,
            payload: result
        })
    }
}

export const updateStrategyActionCreator = (strategy) => {
    return async function (dispatch) {
        await updateStrategy(strategy)
        const resultAllStrategies = await getAllStrategies()
        const resultStrategy = await getStrategy(strategy)
        dispatch({
            type: UPDATE_STRATEGY,
            payload: {allStrategies: resultAllStrategies, strategy: resultStrategy}
        })
    }
}

export const deleteStrategyActionCreator = (strategy) => {
    return async function (dispatch) {
        await deleteStrategy(strategy)
        const result = await getAllStrategies()
        dispatch({
            type: DELETE_STRATEGY,
            payload: result
        })
    }
}

// Set states
export const setStrategyStepperActionCreator = stepperStrategy => {
    return function (dispatch) {
        dispatch({
            type: SET_STRATEGY_STEPPER,
            payload: stepperStrategy
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

export const setOpenDialogStrategyActionCreator = openDialogStrategy => {
    return function (dispatch) {
        dispatch({
            type: SET_OPEN_DIALOG_STRATEGY,
            payload: openDialogStrategy
        })
    }
}

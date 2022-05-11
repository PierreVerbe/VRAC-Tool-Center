import { SET_STRATEGY_LOADER, SET_FILE_UPLOADED, INSERT_STRATEGY, GET_ALL_STRATEGIES, GET_STRATEGY, UPDATE_STRATEGY, DELETE_STRATEGY, SET_STRATEGY_STEPPER, SET_ID_ROW_STRATEGY_TABLE, SET_STRATEGY, SET_OPEN_DIALOG_STRATEGY, SET_OPEN_DIALOG_NODE_STRATEGY, SET_META_ACTION_ARRAY, SET_OPEN_DIALOG_META_ACTION, SET_STRATEGY_CREATOR } from "../action/strategyAction"

export const strategyReducer = (state, action) => {
    switch (action.type) {

        case GET_ALL_STRATEGIES:
            return {
                ...state,
                allStrategies: action.payload
            }

        case GET_STRATEGY:
            return {
                ...state,
                strategy: action.payload
            }

        case DELETE_STRATEGY:
            return {
                ...state,
                allStrategies: action.payload
            }

        case SET_STRATEGY_STEPPER:
            return {
                ...state,
                strategyStepper: action.payload
            }

        case SET_ID_ROW_STRATEGY_TABLE:
            return {
                ...state,
                idRowStrategyTable: action.payload
            }

        case SET_STRATEGY:
            return {
                ...state,
                strategy: action.payload
            }

        case SET_OPEN_DIALOG_STRATEGY:
            return {
                ...state,
                openDialogStrategy: action.payload
            }

        case UPDATE_STRATEGY:
            return {
                ...state,
                allStrategies: action.payload.allStrategies,
                strategy: action.payload.strategy
            }

        case INSERT_STRATEGY:
            return {
                ...state,
                allStrategies: action.payload
            }

        case SET_OPEN_DIALOG_NODE_STRATEGY:
            return {
                ...state,
                openDialogNodeStrategy: action.payload
            }

        case SET_META_ACTION_ARRAY:
            return {
                ...state,
                metaActionArray: action.payload
            }

        case SET_OPEN_DIALOG_META_ACTION:
            return {
                ...state,
                openDialogMetaAction: action.payload
            }

        case SET_STRATEGY_CREATOR:
            return {
                ...state,
                strategyCreator: action.payload
            }

        case SET_STRATEGY_LOADER:
            return {
                ...state,
                strategyLoader: action.payload
            }

        case SET_FILE_UPLOADED:
            return {
                ...state,
                fileUploaded: action.payload
            }

        default:
            return state
    }
}

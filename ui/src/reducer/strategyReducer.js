import { SET_STRATEGY_STEPPER } from "../action/strategyAction"

export const strategyReducer = (state, action) => {
    switch (action.type) {

        case SET_STRATEGY_STEPPER:
            return {
                ...state,
                strategyStepper: action.payload
            }

        default:
            return state
    }
}

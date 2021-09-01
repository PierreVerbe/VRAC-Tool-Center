import { GET_ALL_STUDENTS, INSERT_STUDENT } from "../action/studentAction"
import { SET_DARK_MODE } from "../action/generalAction"

const defaultState = {
    darkMode: true,
    students: []
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

        default:
            return state
    }
}
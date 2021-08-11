import {GET_ALL_STUDENTS, INSERT_STUDENT} from "../action/studentAction"

const defaultState = {
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

        default:
            return state
    }
}
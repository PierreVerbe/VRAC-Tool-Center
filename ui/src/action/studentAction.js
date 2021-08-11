import { getAllStudents, insertStudent } from "./../request/apiStudent"

export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS"
export const INSERT_STUDENT = "INSERT_STUDENT"

export const getAllStudentsActionCreator = () => {
    return async function (dispatch) {
        const result = await getAllStudents()
        dispatch({
            type: GET_ALL_STUDENTS,
            payload: result
        })
    }
}

export const insertStudentActionCreator = studentToInsert => {
    return async function (dispatch) {
        await insertStudent(studentToInsert)
        const result = await getAllStudents()
        dispatch({
            type: INSERT_STUDENT,
            payload: result
        })
    }
}

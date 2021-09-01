export const SET_DARK_MODE = "SET_DARK_MODE"

export const setDarkModeActionCreator = darkMode => {
    return function (dispatch) {
        dispatch({
            type: SET_DARK_MODE,
            payload: darkMode
        })
    }
}
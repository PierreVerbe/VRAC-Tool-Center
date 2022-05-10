export const SET_DARK_MODE = "SET_DARK_MODE"
export const SET_SNACK_BAR = "SET_SNACK_BAR"

export const setDarkModeActionCreator = darkMode => {
    return function (dispatch) {
        dispatch({
            type: SET_DARK_MODE,
            payload: darkMode
        })
    }
}

export const setSnackBarCreator = snackBar => {
    return function (dispatch) {
        dispatch({
            type: SET_SNACK_BAR,
            payload: snackBar
        })
    }
}

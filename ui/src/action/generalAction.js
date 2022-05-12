export const SET_DARK_MODE = "SET_DARK_MODE"
export const SET_SNACK_BAR = "SET_SNACK_BAR"
export const SET_POINTER_SIMULATOR = "SET_POINTER_SIMULATOR"

export const setDarkModeActionCreator = darkMode => {
    return function (dispatch) {
        dispatch({
            type: SET_DARK_MODE,
            payload: darkMode
        })
    }
}

export const setSnackBarActionCreator = snackBar => {
    return function (dispatch) {
        dispatch({
            type: SET_SNACK_BAR,
            payload: snackBar
        })
    }
}

export const setPointerSimulatorActionCreator = pointerSimulator => {
    return function (dispatch) {
        dispatch({
            type: SET_POINTER_SIMULATOR,
            payload: pointerSimulator
        })
    }
}
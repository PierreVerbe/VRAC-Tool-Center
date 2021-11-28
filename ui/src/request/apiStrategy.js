import Axios from "axios"

const baseURL = "http://localhost:5000"

// READ
export const getAllStrategies = async () => {
    try {
        const result = await Axios.get(baseURL + "/find/allStrategies")
        return result.data
    } catch (error) {
        alert("The API is potentially down: " + error)
        return []
    }
}
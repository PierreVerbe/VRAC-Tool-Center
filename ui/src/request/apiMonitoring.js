import Axios from "axios"

const baseURL = "http://localhost:5000"

// CREATE
export const insertMonitoring = async (monitoring) => {
    try {
        const result = await Axios.post(baseURL + "/insert/monitoring",
        {   
           name: monitoring.name,
           description: monitoring.description,
           monitoring: monitoring.monitoring,
           version: monitoring.version
        })
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
    }
}

// READ
export const getAllMonitorings = async () => {
    try {
        const result = await Axios.get(baseURL + "/find/allMonitorings")
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
        return []
    }
}

export const getMonitoring = async (monitoring) => {
    try {
        const result = await Axios.get(baseURL + "/find/monitoring",
        {
            id: monitoring.id,
            name: monitoring.name,
            date: monitoring.date,
            description: monitoring.description,
            monitoring: monitoring.monitoring,
            version: monitoring.version
        })
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
        return []
    }
}

// UPDATE
export const updateMonitoring = async (monitoring) => {
    try {
        const result = await Axios.put(baseURL + "/update/monitoring",
        {
            id: monitoring.id,
            name: monitoring.name,
            description: monitoring.description,
            monitoring: monitoring.monitoring,
            version: monitoring.version
        })
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
        return []
    }
}

// DELETE
export const deleteMonitoring = async (monitoring) => {
    try {
        const result = await Axios.delete(baseURL + "/delete/monitoring", {
            data : {
                id: monitoring.id,
                name: monitoring.name,
                description: monitoring.description,
                monitoring: monitoring.monitoring,
                version: monitoring.version
            }
        })
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
        return []
    }
}

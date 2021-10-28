import Axios from "axios"

const baseURL = `http://localhost:5000`

// CREATE
export const insertMonitoring = async (monitoring) => {
    try {
        await Axios.post(baseURL + "/insert/monitoring",
        {   
           name: monitoring.name,
           description: monitoring.description,
           monitoring: monitoring.monitoring,
           version: monitoring.version
        }
        )
    } catch (error) {
        alert("The API is potentially down: " + error)
    }
}

// READ
export const getAllMonitorings = async () => {
    try {
        const res = await Axios.get(baseURL + "/find/allMonitorings")
        return res.data
    } catch (error) {
        alert("The API is potentially down: " + error)
        return []
    }
}

export const getMonitoring = async () => {
    try {
        const res = await Axios.get(baseURL + "/find/monitoring")
        return res.data
    } catch (error) {
        alert("The API is potentially down: " + error)
        return []
    }
}

// UPDATE
export const updateMonitoring = async (monitoring) => {
    try {
        await Axios.put(baseURL + "/update/monitoring",
        {
            id: monitoring.id,
            name: monitoring.name,
            description: monitoring.description,
            monitoring: monitoring.monitoring,
            version: monitoring.version
        }
        )
        
    } catch (error) {
        alert("The API is potentially down: " + error)
        return []
    }
}

// DELETE
export const deleteMonitoring = async (monitoring) => {
    try {
        await Axios.delete(baseURL + "/delete/monitoring",
        {
            id: monitoring.id,
            name: monitoring.name,
            description: monitoring.description,
            monitoring: monitoring.monitoring,
            version: monitoring.version
        }
        )
    } catch (error) {
        alert("The API is potentially down: " + error)
        return []
    }
}

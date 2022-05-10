import Axios from "axios"

const baseURL = "http://localhost:5000"

// CREATE
export const insertStrategy = async (strategy) => {
    try {
        const result = await Axios.post(baseURL + "/insert/strategy",
        {   
           strategy: strategy.strategy,
           metaActions: strategy.metaActions
        })
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
    }
}

// READ
export const getAllStrategies = async () => {
    try {
        const result = await Axios.get(baseURL + "/find/allStrategies")
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
        return []
    }
}

export const getStrategy = async (strategy) => {
    try {
        const result = await Axios.get(baseURL + "/find/strategy",
        {
            id: strategy.id,
            name: strategy.name,
            date: strategy.date,
            description: strategy.description,
            sender: strategy.sender,
            strategy: strategy.monitoring,
            version: strategy.version
        })
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
        return []
    }
}

// UPDATE
export const updateStrategy = async (strategy) => {
    try {
        const result = await Axios.put(baseURL + "/update/strategy",
        {
            id: strategy.id,
            name: strategy.name,
            description: strategy.description,
            sender: strategy.sender,
            strategy: strategy.monitoring,
            version: strategy.version
        })
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
        return []
    }
}

// DELETE
export const deleteStrategy = async (strategy) => {
    try {
        const result = await Axios.delete(baseURL + "/delete/strategy", {
            data : {
                id: strategy.id,
                name: strategy.name,
                description: strategy.description,
                sender: strategy.sender,
                strategy: strategy.monitoring,
                version: strategy.version
            }
        })
        return result.data
    } catch (error) {
        console.log("The API is potentially down: " + error)
        //alert("The API is potentially down: " + error)
        return []
    }
}

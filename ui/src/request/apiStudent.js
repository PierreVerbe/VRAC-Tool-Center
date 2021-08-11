import Axios from "axios"

const baseURL = `http://localhost:5000`

export const getAllStudents = async () => {
    try {
        const res = await Axios.get(`http://localhost:5000/all`)
        return res.data
    } catch (error) {
        alert("The API is potentially down: " + error)
        return []
    }
}

export const insertStudent = async (student) => {
    try {
        await Axios.post(baseURL + `/create`,
        {   
           id: student.id,
           name: student.name,
           age: student.age,
           grade: student.grade 
        }
        )
    } catch (error) {
        alert("The API is potentially down: " + error)
    }
}


export const findTutor = {
    getAllTutor: async function (queryString = "") {
        const result = await fetch(`http://localhost:5000/api/tutor${queryString ? `?${queryString}` : ""}`)

        const data = await result.json()
        return data;
    }
}
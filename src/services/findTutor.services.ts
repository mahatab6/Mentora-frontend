

export const findTutor = {
    getAllTutor: async function (queryString = "") {
        const result = await fetch(`http://localhost:5000/api/tutor${queryString ? `?${queryString}` : ""}`)
        const data = await result.json()
        return data;
    },

    getUniqueTutor: async function (id: string) {
       
        const result = await fetch(`http://localhost:5000/api/tutor/${id}`, {
            cache: 'no-store'
        });
        
        if (!result.ok) return null;
        return await result.json();
    }
}
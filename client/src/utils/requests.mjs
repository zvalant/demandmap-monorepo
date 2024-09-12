const API_URL = "http://localhost:8000/v1/";


export async function httpGetAllPartStructures(){
    const response = await fetch(`${API_URL}/structures/all`);
    return response.json();
}

export async function httpGetPartStructure(structureID){
    try{
        const response = await fetch(`${API_URL}/structures/${structureID}`);
        return response.json();
          
    }catch(err){
        console.log("invalid strucuture in Requests file")
        return {
            err: "cant get an ID"
        }

    }

}
export async function httpAddPartStructure(structure){
    try{
        return await fetch(`${API_URL}/structures/add`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({structureID: `${structure}`})
        })
    }catch(err){
        return {
            err: "cant generate Master Structure"
        }
    }
}

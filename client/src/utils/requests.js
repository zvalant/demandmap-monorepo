const API_URL = "http://localhost:8000/v1";


async function httpGetPartStructures(){
    const response = await fetch(`${API_URL}/structures`);
    return response.json();
}

async function httpGetPartStructure(structureID){
    try{
        return await fetch(`${API_URL}/strucutes/${structureID}`,{
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
    }catch(err){
        return {
            err: "cant get an ID"
        }

    }

}
async function httpAddPartStructure(structureID){
    try{
        return await fetch(`${API_URL}/strucutes/${structureID}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(structureID)
        })
    }catch(err){
        return {
            err: "cant generate Master Structure"
        }
    }
}

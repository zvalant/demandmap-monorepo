/*Purpose:
This file contains all REST API functions that will be called client side to fetch data about part structures.  
Currently functionality is limited to the inital request of fetching all part names and descriptions, fetching
specific selected structure from the client and adding a structure to the database.

*/

const STRUCTURES_API_URL = "http://demandtstapi.lincofood.local/v1/structures/";
//const STRUCTURES_API_URL = "http://localhost:8000/v1/structures/";

//Inital fetch to get all available structures for user to select
export async function httpGetAllPartStructures(){
    const response = await fetch(`${STRUCTURES_API_URL}all`);
    return response.json();
}

//Fetch the master structure from DB and send to part-strucutre-context to generate requested structure
export async function httpGetPartStructure(structureID){
    try{
        const response = await fetch(`${STRUCTURES_API_URL}${structureID}`);
        return response.json();
          
    }catch(err){
        console.log("invalid strucuture in Requests file")
        return {
            err: "cant get an ID"
        }

    }

}
//Add structure to DB so can be selected during setup
export async function httpAddPartStructure(structure){
    try{
        return await fetch(`${STRUCTURES_API_URL}add`, {
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

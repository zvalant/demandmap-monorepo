
/*Purpose:
POInfoGeneration will find the item info based on 
location in the tree and find the earliest date the demand 
can be satified or maximum ammount that is currently on order.

*/


export const POInfoGeneration = ({POData, currentStructure})=>{
    console.log("POData: ", POData);
    console.log("CurrentStruct: ", currentStructure);
    let currentQty = 0;
    //set current date, should modify to be max qty on map.
    let location = POData.location[0];
    let maxDemand = TotalDemand({POData:POData, currentStructure:currentStructure});

    for (let i = 0;i< currentStructure.attributes.location.length;i++){
        location = location.slice(1,location.length);

    }

    let modifiedLocation = location;
    let POList = POData.itemPO
    let currentDate = "";
 
    for (let i = 0; i< modifiedLocation.length;i++){
        let currentLocation = modifiedLocation[i];
        currentStructure = currentStructure.children[currentLocation];
    }
    let description = currentStructure.attributes.description.slice(0,15);
    while (description[description.length-1] == " "){
        description = description.slice(0,description.length-1);
    }
    if (description.length< currentStructure.attributes.description.length){
        description = description+"...";

    }
    let currentPart = currentStructure.name;
    let demandMet = false;
    for (let i = 0 ; i<POList.length;i++){
        currentQty+= POList[i].POQty;
        currentDate = POList[i].PODueDate;
        console.log(currentDate);
        console.log(currentQty);
        if (currentQty+currentStructure.attributes.qty>= maxDemand){
            demandMet = true;
            break;
        }
    
    }
    console.log(demandMet, currentPart)
    currentQty = parseFloat(currentQty).toFixed(1);
    return [currentDate, currentQty, currentPart, description, demandMet];



}
/*
TotalDemand will find all locations of specific part and find total demand \
of assembly and return total demand.
*/

export const TotalDemand = ({POData, currentStructure})=>{
    let locations = POData.location;
    let demand = 0;
    for (let setIdx = 0; setIdx<locations.length;setIdx++){
        let currentSet = locations[setIdx];
        let startLocation = currentStructure.attributes.location.length;
        let modifiedSet = currentSet.slice(startLocation);
        let activeStructure = currentStructure;
        console.log("Location Remaining: ", modifiedSet);
        console.log("Active Struct: ", activeStructure)
        for (let value = 0; value< modifiedSet.length;value++){
            let idx = modifiedSet[value];
            activeStructure = activeStructure.children[idx];


        }
        console.log("ActiveStructure: ", activeStructure);
        demand +=activeStructure.attributes.demand;

    }
    console.log(demand);
    return demand;


}
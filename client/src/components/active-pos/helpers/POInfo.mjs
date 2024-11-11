export const POInfoGeneration = ({POData, currentStructure})=>{

    let currentQty = 0;
    let location = POData.location[0];

    for (let i = 0;i< currentStructure.attributes.location.length;i++){
        location = location.slice(1,location.length);
        console.log("Current Loc Array: ",location);

    }

    let modifiedLocation = location;
    console.log("PO location: ", modifiedLocation);
    console.log("Current Struct: ", currentStructure);
    let POList = POData.itemPO
    let currentDate = "";
    for (let i = 0; i< modifiedLocation.length;i++){
        let currentLocation = modifiedLocation[i];
        currentStructure = currentStructure.children[currentLocation];
    }
    console.log("After Trav: ", currentStructure);

    let demand = currentStructure.attributes.demand;
    let currentPart = currentStructure.name;
    for (let i = 0 ; i<POList.length;i++){
        currentQty+= POList[i].POQty;
        currentDate = POList[i].PODueDate;
        if (currentQty>= demand){
            break;
        }
    }
    return [currentDate, currentQty, currentPart];



}

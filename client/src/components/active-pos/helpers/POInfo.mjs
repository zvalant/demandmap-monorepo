export const POInfoGeneration = ({POData, currentStructure})=>{
    console.log("POData: ", POData);
    console.log("CurrentStruct: ", currentStructure);
    let currentQty = 0;
    let location = POData.location[0];

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

    let demand = currentStructure.attributes.demand;
    let currentPart = currentStructure.name;
    for (let i = 0 ; i<POList.length;i++){
        currentQty+= POList[i].POQty;
        currentDate = POList[i].PODueDate;
        console.log(currentDate);
        console.log(currentQty);
        if (currentQty+currentStructure.attributes.qty>= demand){
            break;
        }
    }
    console.log(currentPart);
    return [currentDate, currentQty, currentPart];



}

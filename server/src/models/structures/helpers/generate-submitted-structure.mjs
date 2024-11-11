import { OnHandStructure } from "./onhand-structure.mjs";
import { AvailableStructure } from "./available-structure.mjs";
export const GenerateSubmittedStructure = (masterStructure, qty, structureType)=>{
    let selectedStructure = {};
    // this will be replaced with DB fetch 
    for (let i = 0;i<testPart.length;i++){
        if (testPart[i].name == masterStructure){
            masterStructure = testPart[i];
        }
    }
    console.log("current master structure", masterStructure);
    let availableStructure = new AvailableStructure(masterStructure,qty);
    let onHandStructure = new OnHandStructure(masterStructure,qty);
    onHandStructure.generateOnHandStructure();
    availableStructure.generateAvailableStructure();
    switch(structureType){
        case 'Available':
            selectedStructure = availableStructure.availableStructure;
            break;
        case 'OnHand':
            selectedStructure = onHandStructure.onHandStructure;
            break;
        default:
            console.log("OPTION NOT FOUND!");
            selectedStructure = null;

    }



    return selectedStructure;
}





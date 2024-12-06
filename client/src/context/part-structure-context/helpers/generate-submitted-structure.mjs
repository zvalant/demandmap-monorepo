import { OnHandStructure } from "./onhand-structure.mjs";
import { AvailableStructure } from "./available-structure.mjs";

/*
Purpose:
GenerateSubmittedStructure will take the master structure and generate
the selected structres using the parameters selected during setup.  
current options:
AvailableStructure
OnHandStructure

*/
export const GenerateSubmittedStructure = (masterStructure, qty, structureType)=>{
    let selectedStructure = {};
    let availableStructure = new AvailableStructure(masterStructure,qty);
    let onHandStructure = new OnHandStructure(masterStructure,qty);
    console.log(masterStructure);
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





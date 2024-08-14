import { MasterStructure } from "./master-structure.mjs";
/*
class Purpose:
this class will pull attributes from master structure and create the structure for 
the available demand map.  
*/

export class AvailableStructure extends MasterStructure{
    constructor(master,demand){
        super(master);
        this.demand = demand;
        this.master = master;
        this.availableStructure = {};
    }
    generateAvailableStructure(){
        this.traverseAvailableStructure(this.master.masterStructure, this.availableStructure, this.demand);

    }

    traverseAvailableStructure(masterStructure, currentStructure, demand){
        //traverse each level in the structure and pull attributes from master.
        currentStructure.attributes = {};
        currentStructure.attributes.demand = masterStructure.attributes.qtyPer*demand;
        currentStructure.attributes.qty = masterStructure.attributes.onHand-masterStructure.attributes.qtyAllocated;
        currentStructure.attributes.cost = masterStructure.attributes.cost;
        currentStructure.attributes.qtyAllocated = masterStructure.attributes.qtyAllocated;
        currentStructure.attributes.costTotal = currentStructure.attributes.demand*currentStructure.attributes.cost;
        currentStructure.attributes.description = masterStructure.attributes.description;
        currentStructure.attributes.isDemandMet = Boolean(currentStructure.attributes.qty>=currentStructure.attributes.demand);
        currentStructure.attributes.location = masterStructure.attributes.location;
        currentStructure.name = masterStructure.name;
        //if conditions mean there is no value in traversing deeper and can backtrace.
        if (currentStructure.attributes.isDemandMet || !masterStructure.children){
            return;
        }
           //add children attribute and required child counter
        currentStructure.children = [];
        let progressCount = 0;
        //traverse through children in current level and recursively call next level in structure.
        for (let i = 0; i<masterStructure.children.length;i++){
            currentStructure.children.push({});
            this.traverseAvailableStructure(masterStructure.children[i], currentStructure.children[i],currentStructure.attributes.demand-currentStructure.attributes.qty);
            if (currentStructure.children[i].attributes.isDemandMet===true){
                progressCount++;
            }
            
        }
        currentStructure.attributes.childProgress = Math.floor((progressCount/masterStructure.children.length)*100)
        if (progressCount===masterStructure.children.length){
            currentStructure.attributes.isComponentDemandMet = true;

        }else{
            currentStructure.attributes.isComponentDemandMet = false;
        }

        


    }

};
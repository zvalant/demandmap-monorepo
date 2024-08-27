import { MasterStructure } from "./master-structure.mjs";
/*
class Purpose:
this class will pull attributes from the master structure and create the structure for 
the onHand demand map.
*/


export class OnHandStructure extends MasterStructure{
    constructor(master, demand){
        super(master)
        this.master = master
        this.onHandStructure = {};
        this.demand = demand;

    }
    generateOnHandStructure(){
        this.traverseOnHandStructure(this.master.masterStructure, this.onHandStructure,this.demand);
    }
    traverseOnHandStructure(masterStructure, currentStructure,demand){
        //traverse each level of the structure and pull attributes from master.
        currentStructure.attributes = {};
        currentStructure.attributes.demand = demand*masterStructure.attributes.qtyPer
        currentStructure.attributes.qty = masterStructure.attributes.onHand;
        currentStructure.attributes.cost = masterStructure.attributes.cost;
        currentStructure.attributes.costTotal = currentStructure.attributes.cost * currentStructure.attributes.demand;
        currentStructure.attributes.qtyAllocated = masterStructure.attributes.qtyAllocated;
        currentStructure.attributes.description = masterStructure.attributes.description;
        currentStructure.attributes.isDemandMet = Boolean(currentStructure.attributes.qty>=currentStructure.attributes.demand);
        currentStructure.attributes.location = masterStructure.attributes.location;
        currentStructure.name = masterStructure.name;

        //if conditions mean there is no value in traversing deeper and can backtrace.
        if (currentStructure.attributes.isDemandMet || !masterStructure.children){

            return;
        }
        //add children attribute since demand isnt met and part has subcomponents
        currentStructure.children = [];
        //traverse through children in current level and recursively call next level in structure.
        let progressCount = 0;
        for (let i = 0; i<masterStructure.children.length;i++){
            currentStructure.children.push({});
            this.traverseOnHandStructure(masterStructure.children[i], currentStructure.children[i],currentStructure.attributes.demand-currentStructure.attributes.qty );
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
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
        currentStructure.attributes.purchasePart = masterStructure.attributes.purchasePart;
        if (masterStructure.attributes.activePO){
            currentStructure.attributes.activePO = masterStructure.attributes.activePO;
        }

        //if conditions mean there is no value in traversing deeper and can backtrace.
        if (currentStructure.attributes.isDemandMet || !masterStructure.children || currentStructure.attributes.activePO){
            if (!currentStructure.attributes.isDemandMet && currentStructure.attributes.activePO){
                currentStructure.attributes.accumulatedPO = {};
                currentStructure.attributes.accumulatedPO[currentStructure.name] = {
                    itemPO: [...currentStructure.attributes.activePO],
                    location: [[...currentStructure.attributes.location]]
                }
            }
            let POQty = 0;
            if (currentStructure.attributes.activePO){
                for (let i = 0; i< currentStructure.attributes.activePO.length;i++){
                    POQty+= currentStructure.attributes.activePO[i].POQty;
                }
                currentStructure.attributes.isPODemandMet = 
                currentStructure.attributes.demand <= currentStructure.attributes.qty + POQty;


            }
            

            return;
        }
        //add children attribute since demand isnt met and part has subcomponents
        currentStructure.children = [];
        //traverse through children in current level and recursively call next level in structure.
        let progressCount = 0;
        let accumulatedPO = {};
        for (let i = 0; i<masterStructure.children.length;i++){
            currentStructure.children.push({});
            this.traverseOnHandStructure(masterStructure.children[i], currentStructure.children[i],currentStructure.attributes.demand-currentStructure.attributes.qty );
            if (currentStructure.children[i].attributes.isDemandMet===true){
                progressCount++;
            }
            if (currentStructure.children[i].attributes.accumulatedPO){
                let childAccumulatedPO = currentStructure.children[i].attributes.accumulatedPO;
                for (const item in childAccumulatedPO){
                    if (accumulatedPO[item]){
                        accumulatedPO[item].location.push(...childAccumulatedPO[item].location);


                    }else{
                        accumulatedPO[item] = {
                            itemPO: [...childAccumulatedPO[item].itemPO],
                            location: []
                        }
                        for (let j = 0; j< childAccumulatedPO[item].location.length;j++){
                            accumulatedPO[item].location.push(childAccumulatedPO[item].location[j]);


                        }
                    }
                }
            }
        }
        if (masterStructure.attributes.activePO){
        
            accumulatedPO[currentStructure.name] = {itemPO: [...masterStructure.attributes.activePO], location: [[...currentStructure.attributes.location]]};

        }
        if (Object.keys(accumulatedPO).length> 0){
            currentStructure.attributes.accumulatedPO = accumulatedPO;
        }

        currentStructure.attributes.childProgress = Math.floor((progressCount/masterStructure.children.length)*100)
        
        if (progressCount===masterStructure.children.length){
            currentStructure.attributes.isComponentDemandMet = true;

        }else{
            currentStructure.attributes.isComponentDemandMet = false;
        }
    }
};

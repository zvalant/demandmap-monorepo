import { MasterStructure } from "./master-structure.js";
import { qadCache } from "./qad-structure-cache.js";
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
        currentStructure.attributes.purchasePart = masterStructure.attributes.purchasePart;
        if (masterStructure.attributes.activePO){
            currentStructure.attributes.activePO = masterStructure.attributes.activePO;
        }
        currentStructure.name = masterStructure.name;
        //if conditions mean there is no value in traversing deeper and can backtrace.
        if (currentStructure.attributes.isDemandMet || !masterStructure.children){
            if (!currentStructure.attributes.isDemandMet && currentStructure.attributes.activePO){
                currentStructure.attributes.accumulatedPO = {};
                currentStructure.attributes.accumulatedPO[currentStructure.name] = {
                    itemPO: [...currentStructure.attributes.activePO],
                    location: [[...currentStructure.attributes.location]]
                }
            }

            return;
        }
           //add children attribute and required child counter
        currentStructure.children = [];
        //traverse through children in current level and recursively call next level in structure.
        let progressCount = 0;
        let accumulatedPO = {};

        for (let i = 0; i<masterStructure.children.length;i++){
            currentStructure.children.push({});
            this.traverseAvailableStructure(masterStructure.children[i], currentStructure.children[i],currentStructure.attributes.demand-currentStructure.attributes.qty);
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
        
            accumulatedPO[currentStructure.name] = {itemPO: [...masterStructure.attributes.activePO], location: [[...location]]};

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

let currentCache = await qadCache([1810202100])
let testValue = new MasterStructure(1810202100, currentCache)
await testValue.generateMasterStructure();
let onHandValue = new AvailableStructure(testValue, 5000);
onHandValue.generateAvailableStructure();
console.log(JSON.stringify(onHandValue.availableStructure,  null , 2));
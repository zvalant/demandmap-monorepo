import { qadPartFetch } from "../../../services/qad/qad-api.mjs";

/*
Purpose: 
will take in qty and name and create main json objects that can be used to generate the 
demand map in the main viewport.  Structure is specific to requirements of react-d3-tree library
if different library is desigred please adjust generation methods accordingly.  
*/

export class MasterStructure {
    constructor(name, cache){
        this.name = name;
        this.qty = 1;
        this.custom = false; // flag exists to determine how master structure needs to be assembled
        this.cache = cache
        this.masterStructure = {}; // full part structure without backtracing
        this.subComponents = []; //custom projects will consist of structured parts and qtys in this list
    }
    async generateMasterStructure(){
        if (this.custom===false){
            let complete  = await this.generateStructureLevel(this.masterStructure,this.name, this.masterStructure, this.qty, []);
            if (!complete){// if tree wasnt complete 
                throw Error("Failed Master structure generation");

            }

        }

    
    }

    async generateStructureLevel(masterStructure, part,currentStructure, multiple, location){
        //Take inital Part Number and construct total BOM Tree 
        try {
            //base qty and data pulled from api
            console.log('request from method', part);
            let fetchedData = undefined;
            if (this.cache[part]){
                fetchedData = this.cache[part];
            }else{
                fetchedData = await qadPartFetch(part).ItemInv[0];}
            currentStructure.attributes = {};
            currentStructure.attributes.onHand = fetchedData.Qty;
            currentStructure.attributes.qtyAllocated = fetchedData.QtyAll;
            currentStructure.attributes.qtyPer = multiple;
            currentStructure.attributes.cost = fetchedData.Cost;
            currentStructure.name = fetchedData.Part; 
            currentStructure.attributes.description= fetchedData.Description;
            currentStructure.attributes.location = location;
            if(!fetchedData.ItemBOM ||fetchedData.ItemPO){
                currentStructure.attributes.purchasePart = true;
                

            }else{
                currentStructure.attributes.purchasePart = false;
            }

    
            if (fetchedData.ItemBOM){ //if ItemInv exists then children exist for part 
                let childrenCount = fetchedData.ItemBOM.length;
                currentStructure.children= [];
                
        
                for (let i =0;i< childrenCount;i++) {
                    let childPart = fetchedData.ItemBOM[i];
                    const childBuild = {}; 
                    currentStructure.children.push(childBuild);
                    location.push(i); //add a location value for next call into a child
                    await this.generateStructureLevel(masterStructure, childPart.Comp, currentStructure.children[i],childPart.QtyPer,[...location]);
                    location.pop();//remove location value from previous child
                    if (!currentStructure.children[i].attributes.accumulatedPO){
                        continue;
                    }
                   
                }
                    
                
            }
                 
            if (fetchedData.ItemPO){
                currentStructure.attributes.activePO = fetchedData.ItemPO;
              
            }
            
        return masterStructure
        } catch (error) {
            console.error("Error building data:", error);
            return false;
        }
    
    }

    };


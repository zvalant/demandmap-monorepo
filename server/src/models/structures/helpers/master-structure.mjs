import { qadPartFetch } from "../../../services/qad-api.mjs";

/*
Purpose: 
will take in qty and name and create main json objects that can be used to generate the 
demand map in the main viewport.  Structure is specific to requirements of react-d3-tree library
if different library is desigred please adjust generation methods accordingly.  
*/

export class MasterStructure {
    constructor(name){
        this.name = name;
        this.qty = 1;
        this.custom = false; // flag exists to determine how master structure needs to be assembled
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
            const fetchedData = await qadPartFetch(part);
            currentStructure.attributes = {};
            currentStructure.attributes.onHand = fetchedData.ItemInv[0].Qty;
            currentStructure.attributes.qtyAllocated = fetchedData.ItemInv[0].QtyAll;
            currentStructure.attributes.qtyPer = multiple;
            currentStructure.attributes.cost = fetchedData.ItemInv[0].Cost;
            currentStructure.name = fetchedData.ItemInv[0].Part; 
            currentStructure.attributes.description= fetchedData.ItemInv[0].Description;
            currentStructure.attributes.location = location;
    
            if (fetchedData.ItemInv[0].ItemBOM){ //if ItemInv exists then children exist for part 
                let childrenCount = fetchedData.ItemInv[0].ItemBOM.length;
                currentStructure.children= [];
        
                for (let i =0;i< childrenCount;i++) {
                    let childPart = fetchedData.ItemInv[0].ItemBOM[i];
                    const childBuild = {}; 
                    currentStructure.children.push(childBuild);
                    location.push(i); //add a location value for next call into a child
                    await this.generateStructureLevel(masterStructure, childPart.Comp, currentStructure.children[i],childPart.QtyPer,[...location]);
                    location.pop();//remove location value from previous child
                
                }
        }
        return masterStructure
        } catch (error) {
            console.error("Error building data:", error);
            return false;
        }
    
    }

    };

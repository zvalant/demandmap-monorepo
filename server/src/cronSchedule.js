import { structuresDatabase } from "./models/structures/structure.mongo.js"
import { qadCache } from "./models/structures/helpers/qad-structure-cache.js";
import { MasterStructure } from "./models/structures/helpers/master-structure.js";


/*
Purpose:
This will pull all entries from the DB and based on the delay selected and 
the timestamp of the entry each entry will either be deleted from the DB or 
the updated structure will be generated and will replace the old structure. 

*/

export const updateDatabase = async ()=>{
    const PERDAY_MILISECONDS = 24*3600*1000
    const SELECTEDDELAY = 7;
    const DELAYCONVERSION = PERDAY_MILISECONDS*SELECTEDDELAY;
    const activeDatabase = await structuresDatabase.find();
    let partStructureTimestamps = {};
    let expiredParts = [];
    for (let i = 0 ; i< activeDatabase.length; i++){
        let currentItem = activeDatabase[i];
        partStructureTimestamps[currentItem._id] = currentItem.timestamp;


    }
    for (var key  in partStructureTimestamps){
        let expiredTime = Date.now()-DELAYCONVERSION;
        let expiredTimestamp =  new Date(expiredTime);
        let expiredIsoTimestamp = expiredTimestamp.toISOString();
        let partTimestamp = partStructureTimestamps[key].toISOString();
        if (partTimestamp < expiredIsoTimestamp){
            let ExpiredEntry = await structuresDatabase.deleteOne({_id:key});
            expiredParts.push(key);
        }else{
            let currentPartCache  = await qadCache([key]);
            let currentMasterStructure  = new MasterStructure(key, currentPartCache);
            await currentMasterStructure.generateMasterStructure();
            let partUpdate  = await structuresDatabase.findById(key);
            partUpdate.structure = currentMasterStructure;
            await partUpdate.save();



        }
    }


    return expiredParts;

}

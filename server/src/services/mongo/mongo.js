import { mongoose } from "mongoose";
import { MONGOPASS_ENCODED } from "./mongo-info.js";
/*
Purpose:
Create a Connect and Disconnect for the MongoDB
*/
const MONGO_URL = `mongodb+srv://structuredbconnect:${MONGOPASS_ENCODED}@demandmapstructures.3rltl.mongodb.net/DemandMapStructures?retryWrites=true&w=majority&appName=DemandMapStructures`;

export async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
    mongoose.connection.once('open',()=>{
        console.log('Mongo DB Connection Complete!');
        mongoose.connection.on('error', (err)=>{
            console.error(err);
        })

    })
}
export async function mongoDisconnect(){
    await mongoose.disconnect();

}

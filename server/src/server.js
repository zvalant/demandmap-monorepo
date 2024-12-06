import * as http from 'http';
import {app} from './app.js';
import {mongoConnect} from "./services/mongo/mongo.js"
import cron from 'node-cron'
import { updateDatabase } from './cronSchedule.js';
/*
Purpose: 
create server and connect to MongoDB
and structure all scheduled tasks such 
as DB managment.
*/
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer(){
    // pull required data for application to run
    
    await mongoConnect();
    cron.schedule('0 */2 * * *', ()=>{
        console.log("running update: ", Date.now());
        updateDatabase();

    })
    server.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)

    })

}
startServer();
console.log(PORT);

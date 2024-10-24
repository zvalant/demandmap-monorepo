import * as http from 'http';
import {app} from './app.mjs';
import {mongoConnect} from "./services/mongo/mongo.mjs"
import cron from 'node-cron'
import { updateDatabase } from './cronSchedule.mjs';

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

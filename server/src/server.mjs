import * as http from 'http';
import {app} from './app.mjs';
import {mongoConnect} from "./services/mongo/mongo.mjs"

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer(){
    // pull required data for application to run
    
    await mongoConnect();
    server.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)

    })

}
startServer();
console.log(PORT);

const http = require("http");
const app = require("./app");


const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer(){
    // pull required data for application to run

    server.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)

    })

}
startServer();
console.log(PORT);

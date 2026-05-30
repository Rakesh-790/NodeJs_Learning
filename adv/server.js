// This folder is responsible for starting the server.

const app = require("./src/app");

app.listen(4000, () =>{
    console.log("app running on port 4000");
})
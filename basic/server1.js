const http = require("http");

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/') {
        res.end("this is home page");
    }

    else if(req.method === 'GET' && req.url === '/about'){
        res.end("this is about page");
    }

    else{
        res.statusCode = 404;
        res.end("page error");
    }
});

server.listen(3000, () =>{
    console.log("Server running on port 3000");
})


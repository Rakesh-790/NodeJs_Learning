const http = require("http")

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const parsed = JSON.parse(body);

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                message: `Hello ${parsed.name}`
            }),console.log(`Hello ${parsed.name}`)
            ); // gives json format.
            // res.end(`hello ${parsed.name}`) -> gives plain string
        });

    }
})

server.listen(4000);


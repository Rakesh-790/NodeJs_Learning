const app = require('./src/app')
const connectDb = require('./src/db/mydb')

app.listen(5000, ()=>{
    console.log("server running on port 5000");
})

connectDb();

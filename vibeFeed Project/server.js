const app = require('./src/app');
const connectDB = require('./src/db/myDB');

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

connectDB();
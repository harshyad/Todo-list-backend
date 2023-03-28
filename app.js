const express = require("express")
const app = express();
const task = require('./routes/tasks')
const connectDB = require('./db/connect')
const cors = require("cors");
require('dotenv').config()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors());
app.use(express.json())


app.use('/api/v1/tasks', task)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();


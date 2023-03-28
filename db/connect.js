const mongoose = require('mongoose')

const connect = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    },
    console.log("Connected to db")
    )
}

module.exports = connect
const mongoose = require('mongoose');

const connectionString = "mongodb+srv://admin:admin@cluster0.keosc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

function connect(){
    mongoose.connect(connectionString).then(res=>{
        console.log("connected!!!")
    })
}

module.exports = {
    connect
}
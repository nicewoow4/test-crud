const mongoose = require("mongoose")
const customersSchema = mongoose.Schema({


    ccode: {
        type: String,
        require: true,
        unique: true
    }
    ,
    cname: {
        type: String,
        require: true,

    }
    ,
    cemail: {
        type: String,
        require: true,

    }
    ,
    ctel: {
        type: String,
        require: true,
    }
    ,
    statusdata:{
        type:Boolean,
        require: true,
    }
},

);

module.exports = mongoose.model("customers", customersSchema)
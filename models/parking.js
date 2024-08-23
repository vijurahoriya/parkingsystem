const mongoose = require('mongoose')

const parkingSchema = mongoose.Schema({
    vtype:String,
    vin:Date,
    vno:String,
    vout:Date,
    vamount:Number,
    vStatus:String,
})


module.exports = mongoose.model('parking',parkingSchema)
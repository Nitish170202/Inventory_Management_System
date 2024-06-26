const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateReceived: { type: Date, required: true },
    numberReceived: { type: Number, required: true },
    dateDispatch: { type: Date,default:null},
    numberDispatched: { type: Number,default:0 },
    balanceItems: { type: Number,default:null},
    status:{type:String,default:"pending"},
    qrCodeUrl: { type: String, required: true, unique: true }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new mongoose.Schema({
    match: {
        type: Schema.Types.ObjectId,
        ref: 'match'
    },
    schedule: {
        type: String
    },
    location: {
        type: String
    },
    dateoftransaction: {
        type: Date
    },
    status: {
        type: Boolean
    },
    reason: {
        type: String
    },
    users: [
        {
            owner: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            ownername: {
                type: String
            },
            owneravatar: {
                type: String
            },
            item: {
                type: Schema.Types.ObjectId,
                ref: 'item'
            },
            itemname: {
                type: String
            },
            itemphoto: {
                type: String
            },
            userwant: { 
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            userwantavatar: {
                type: String
            },
            userwantname: {
                type: String
            },
            userwantitem: {
                type: Schema.Types.ObjectId,
                ref: 'item'
            },
            userwantitemname: {
                type: String
            },
            userwantitemphoto: {
                type: String
            }
        }
    ],
    chat: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            name: {
                type: String
            },
            text:{
                type: String
            },
        }
    ],
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    username1: {
        type: String
    },
    useravatar1: {
        type: String
    },
    item1: {
        type: Schema.Types.ObjectId,
        ref: 'item'
    },
    itemname1: {
        type: String
    },
    itemphoto1: {
        type: String
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    username2: {
        type: String
    },
    useravatar2: {
        type: String
    },
    item2: {
        type: Schema.Types.ObjectId,
        ref: 'item'
    },
    itemname2: {
        type: String
    },
    itemphoto2:{
        type: String
    },
    superwant: {
        type: Boolean, default: false
    },
    accepted: {
        type: Boolean, default: false
    }
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema)
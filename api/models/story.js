const mongoose = require('mongoose');
var siteViews=require('../models/visits')
const StorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true} ,//userId from existing users collections
    SImage:{type:String,required:true},
    SText:{type:String,required:true},
    views:{type:Number,default:1},
      expireAt: {type: Date, default: Date.now, index: { expires: '500h' },

    }


})


module.exports = mongoose.model('Story',StorySchema)

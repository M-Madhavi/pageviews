const mongoose=require('mongoose')

const VisitsSchema =mongoose.Schema({
    timestamp:{createdAt: Date,updatedAt:Date},
     views:{type:Number},
   counter:{type:Number,required:true},
    storyId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Story',required:true} ,
});

module.exports = mongoose.model('Visits',VisitsSchema)

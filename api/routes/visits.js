const express = require("express");
const router = express.Router();
const mongoose=require('mongoose')
var siteViews=require('../models/visits')

var SiteViewsUp=require('../controllers/visitsup')


router.get("/:storyId",function (req,res,next){
    SiteViewsUp.siteViewsUp();
    siteViews.findByIdAndUpdate({id: req.params.storyId })
    siteViews.findById('5f1f3e370d6faae9a42a80af').then((data)=>{//'5f1f3e370d6faae9a42a80af'
      // res.render('../routes/index.html',
        res.status(200).json({
            storyId:data.storyId,

        views:data.views
            //message: "views to story page"
        });


    },(err)=>{next(err)})
        .catch((err)=>{next(err)})

})
module.exports=router;
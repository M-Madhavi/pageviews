const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const path =require('path')
const User =require('../models/user')
const Story = require("../models/story");
const siteViewsUp=require('../controllers/visitsup')
var siteViews=require('../models/visits')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname + '-' + Date.now())


    }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png'||file.mimetype=== 'audio/mp4'||file.mimetype==='image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


const upload = multer({ storage: storage,    limits: {
        fileSize: 1024 * 1024 * 5,
        fileFilter: fileFilter
    },

})
router.post("/",upload.single('SImage'),(req ,res,next)=> {
    Story.findById({userId: req.params.userId})
   const SImage = req.file
            const story = new Story({
                _id: new mongoose.Types.ObjectId(),
                SText: req.body.SText,
                userId : req.body.userId,
                SImage: req.file.path
            });
            story
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Created story successfully",
                        createdStory: {
                            SText: result.SText,
                            userId: result.userId,
                            SImage: result.SImage,//file.path,
                            _id: result._id,

                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });


        })
router.get("/:storyId", (req, res, next) => {
    const _id = req.params.userId//mongoose.Types.ObjectId()
    Story.findById(req.params.storyId)
    //  Story.findOne(req.params.userId)
 // siteViews.findOneAndUpdate({id: req.params.storyId })
    siteViews.findByIdAndUpdate('5f1f3e370d6faae9a42a80af',{$inc:{views:1}},{new :true})
        //.exec()
        .then(story => {
            if (!story) {
                return res.status(404).json({
                    message: "story not found"
                });
            }
            res.status(200).json({
                //userId: req.body.userId,
                story: story,
               // views:req.body.views,
                request:{
                    url:"http://localhost:6000/story/"+story._id,

                }

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:storyId", (req, res, next) => {
    Story.remove({ _id: req.params.storyId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "story deleted",
                            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;


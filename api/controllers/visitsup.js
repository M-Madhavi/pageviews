const express=require('express')
const mongoose=require('mongoose')

const siteViews =require('../models/visits')

siteViewsUp = function (){
    siteViews.findByIdAndUpdate('5f1f3e370d6faae9a42a80af',{$inc:{views:1}},{new :true})
        .then((data)=>{console.log(data.views)})
        .catch((err)=>{console.log(err)})
}
module.exports ={siteViewsUp};
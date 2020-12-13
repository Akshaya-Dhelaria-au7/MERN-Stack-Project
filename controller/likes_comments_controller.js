const likeCommentSchema = require('../model/likes_comments_schema');
const titleSchema = require('../model/title_schema')
var mongoose = require('mongoose');

const likesCommentsController = {
    likes:(req,res)=> {
        let newlike = new likeCommentSchema({
            Like:1,
            user_id:req.app.get('data1').user_id,
            title_id:req.params.title_id
        })
        likeCommentSchema.where({title_id:req.params.title_id,user_id:req.app.get('data1').user_id}).find((err,data) => {
            if(err){
                res.json({
                    message:"Error while finding the tutorial",
                    error:err.message
                })
            }
            else{
                console.log("Data is "+JSON.stringify(data))
                console.log("Length is "+data.length)
                if(data.length>0){
                    res.json({
                        message:"Already Liked this post"
                    })
                }else{
                    newlike.save()
                    console.log(newlike)
                    res.json({
                        message:"Liked successfully",
                        data:newlike
                    })
                }
            }
        })
    },
    // dislikes:(req,res)=> {
    //     likeCommentSchema.findById({_id:req.params._id},(err,data)=>{
    //         if(err){
    //             res.json({
    //                 message:"Error while finding the category",
    //                 error:err.message
    //             })
    //         }
    //         const categoryData = data
    //         // console.log(categoryData)
    //         likeCommentSchema.findByIdAndUpdate({_id:categoryData._id},{$inc:{Like:-1}},{new:true},(err,result) => {
    //             if(err){
    //                 console.log("error" , err)
    //             }
    //             console.log("result is ",result)
    //             res.json({
    //                 message:"Disliked",
    //                 data:result
    //             })
    //         })
    //     })
    // },

    // comment:(req,res) => {
    //     likeCommentSchema.findById({_id:req.params._id},(err,data)=>{
    //         if(err){
    //             res.json({
    //                 message:"Error while finding the category",
    //                 error:err.message
    //             })
    //         }
    //         const categoryData = data
    //         // console.log(categoryData)
    //         categorySchema.findByIdAndUpdate({_id:categoryData._id},{Comment:req.body.Comment},{new:true},(err,result) => {
    //             if(err){
    //                 console.log("error" , err)
    //             }
    //             console.log("result is ",result)
    //             res.json({
    //                 message:"Commented",
    //                 data:result
    //             })
    //         })
    //     })
    // }
}
module.exports = likesCommentsController;

//.where({user_id:req.app.get("data1").user_id})
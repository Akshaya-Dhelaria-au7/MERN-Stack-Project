const titleSchema = require('../model/title_schema')
const likeCommentSchema = require('../model/likes_comments_schema.js')
const mongoose = require("mongoose")

const titleController = {
    createTitle: async (req,res) => {
        let eachTitle = new titleSchema({
            ...req.body,
            posted_by:req.app.get("data1").user_id,
            category_id:req.params.category_id
        })
        await eachTitle.save()
        .then((data) => {
            console.log("Data in title is" , data)
            res.status(200).json({
                message:"Title created",
                data:data
            })
        })
        .catch((err) => {
            if(err.name == "MongoError" && err.code == 11000){
                res.json({
                    message:"Link Already Exists!!"
                })
            }
            // console.log("Error while creating category " , JSON.stringify(err) )
            else {
                res.status(401).json({
                message:"Error while creating category",
                error:err
                })
            }
        })
    },

    getTitlesOnTheBasisOfCategory: (req,res) => {
        titleSchema.where({category_id:req.params.category_id}).find((err,result) => {
            if(err){
                console.log("Error in get link" , JSON.stringify(err))
                res.status(500).json({
                    message:"Error while getting title of particular category ",
                    error:err.message
                })
            }else{
                if(result.length == 0){
                    res.status(404).json({
                        message:"No links found"
                    })
                }else{
                    console.log("Result in link" , result)
                    res.status(200).json({
                        message:"List of Links",
                        data:result
                    })
                }
            }
        })
    },

    getCompleteDetails:(req,res) => {
        titleSchema.aggregate([
            {
                $match:{
                    category_id:new mongoose.Types.ObjectId(req.params.category_id)
                }
            },
            {
                $lookup:{
                    from : 'likes_and_comments',
                    localField:'_id',
                    foreignField:'title_id',
                    as:'Likes'
                }
                // $match:{
                //     category_id:req.params.category_id
                // }
            }

            
            
            // {
            //     $unwind:'$Likes'
            // },
            // {$group:{
            //     _id:'$title_id',
            //     total_likes:{
            //         $sum:'$Likes.Like'
            //     }           
            // }
        ],
        (err, result) => {
          if (err) {
            res.json({err:err.message});
          } 
          else {
            if(result.length == 0){
                res.json({
                    message:"No title found",
                    result:result
                });
            }else{
                res.json(result);

            }
            console.log("Result is "+JSON.stringify(result))
          }
        })
    }
}

module.exports = titleController
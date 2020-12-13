const titleSchema = require('../model/title_schema')


const profileController = {
    
    findTitleOfUser : (req,res) => {
        titleSchema.find({posted_by:req.app.get("data1").user_id},(err,result) => {
            if(err){
                console.log("Error while getting user's link" , JSON.stringify(err))
                res.status(500).json({
                    message:"Error while getting user's link ",
                    error:err.message
                })
            }else{
                if(result.length == 0){
                    res.status(404).json({
                        message:"No Titles found"
                    })
                }else{
                    res.status(200).json({
                        message:"List of Titles of the user",
                        data:result
                    })
                }
            }
        })
    },

    updateTitlePostedByUser:(req,res) => {
        titleSchema.where({posted_by:req.app.get("data1").user_id}).findOneAndUpdate(
            {_id:req.params._id},
            {
                Title:req.body.Title,
                Link:req.body.Link
            },
            {new:true}
        )
        .then((data) => {
            if(!data){
                res.status(403).json({
                    message:"No Titles Available.Please add Titles"
                })
            }
            else{
                // console.log("Update" , data.Category,data.Link)
                res.status(200).json({
                    message:"Updated in user's profile",
                    data:data
                })
            }
        })
        .catch((err) => {
            console.log("Error while updating titles in user's profile " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while updating titles in user's profile",
                error:err
            })
        })
    },

    deleteTitlePostedByUser:(req,res) => {
        titleSchema.where({posted_by:req.app.get("data1").user_id}).findOneAndDelete(
            {_id:req.params._id},
            // {
            //     Title:req.body.Title,
            //     Link:req.body.Link
            // },
            // {new:true}
        )
        .then((data) => {
            if(!data){
                res.status(403).json({
                    message:"No Titles."
                })
            }
            else{
                // console.log("Update" , data.Category,data.Link)
                res.status(200).json({
                    message:"Deleted in user's profile"
                })
            }
        })
        .catch((err) => {
            console.log("Error while deletiing title in user's profile " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while deleting title in user's profile",
                error:err
            })
        })
    },
}

module.exports = profileController
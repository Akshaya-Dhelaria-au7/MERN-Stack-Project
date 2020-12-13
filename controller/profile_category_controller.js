const categorySchema = require('../model/category_schema')

const category_controller = {
    findCategoriesOfUser : (req,res) => {
        categorySchema.find({posted_by:req.app.get("data1").user_id},(err,result) => {
            if(err){
                console.log("Error while getting user's category" , JSON.stringify(err))
                res.status(500).json({
                    message:"Error while getting user's category ",
                    error:err.message
                })
            }else{
                if(result.length == 0){
                    res.status(404).json({
                        message:"No Categories found"
                    })
                }else{
                    res.status(200).json({
                        message:"List of Categories of the user",
                        data:result
                    })
                }
            }
        })
    },

    updateCategoriesPostedByUser:(req,res) => {
        categorySchema.where({posted_by:req.app.get("data1").user_id}).findOneAndUpdate(
            {_id:req.params._id},
            {
                Category:req.body.Category
            },
            {new:true}
        )
        .then((data) => {
            if(!data){
                res.status(403).json({
                    message:"No Category Available.Please add Category"
                })
            }
            else{
                // console.log("Update" , data.Category,data.Link)
                res.status(200).json({
                    message:"Updated Category in user's profile",
                    data:data
                })
            }
        })
        .catch((err) => {
            console.log("Error while updating Category in user's profile " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while updating Category in user's profile",
                error:err
            })
        })
    },

    deleteCategoriesPostedByUser:(req,res) => {
        categorySchema.where({posted_by:req.app.get("data1").user_id}).findOneAndDelete(
            {_id:req.params._id},
        )
        .then((data) => {
            if(!data){
                res.status(403).json({
                    message:"No Categories."
                })
            }
            else{
                // console.log("Update" , data.Category,data.Link)
                res.status(200).json({
                    message:"Deleted Category in user's profile"
                })
            }
        })
        .catch((err) => {
            console.log("Error while deletiing Category in user's profile " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while deleting Category in user's profile",
                error:err
            })
        })
    },
}

module.exports = category_controller